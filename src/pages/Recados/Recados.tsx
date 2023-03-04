import React, { useState, useEffect, useLayoutEffect } from "react";
import MeuHeader from "../../componets/MeuHeader/MeuHeader";
import { Box, Grid, Paper, Typography, Button, Checkbox } from '@mui/material'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from "react-router-dom";
import CardRecado from "../../componets/CardRecado/CardRecado";
import { useAppDispatch, useAppSelector } from "../../store/modules/hooks";
import { IRecado } from "../../interfaces/IRecado";
import MeuModal from "../../componets/MeuModal/MeuModal";
import { obterRecadosDoUsuarioThunk } from "../../store/modules/SliceRecados/SliceRecados";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { IDadosGetRecados } from "../../interfaces/IDadosGetRecados";
import { store } from "../../store";
import { IResposta } from "../../interfaces";
import { verificaUsuarioLogadoThunk } from "../../store/modules/SliceUsuarios/SliceUsuarios";

const Recados = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [ id, setId ] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false);
    const [arquivado, setArquivado] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const handleClose = () => setOpen(false);
    const recadoAlterado: IRecado = useAppSelector(state => state.recado.data)
    const todosRecadosUsuario: Array<IRecado> = useAppSelector(state => state.recados.data)
    const usuarioLogado: string = useAppSelector(state => state.usuarioLogado.data)
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        color: '#fff',
        padding: '0 8px',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    // useEffect(() => {
    //     verificaLogado()
    //     if(!usuarioLogado) navigate("/")
    // },[ dispatch, usuarioLogado ])

    useLayoutEffect(() => {
        verificaLogado()
        if(!usuarioLogado) navigate("/")
    },[ dispatch, usuarioLogado ])

    useEffect(() => {
        const dataSend: IDadosGetRecados = {
            id: usuarioLogado, 
            arquivado: arquivado, 
            titulo: searchText
        }
        dispatch(obterRecadosDoUsuarioThunk(dataSend))
    }, [dispatch, recadoAlterado, arquivado])

    function handleOpen(id: string) {
        setId(id)
        setOpen(true)
    }

    async function verificaLogado() {
        const retorno = await dispatch(verificaUsuarioLogadoThunk(usuarioLogado))
        return retorno
    }

    function funcaoPesquisar() {
        const dadosPesquisa: IDadosGetRecados = {
            id: usuarioLogado,
            titulo: searchText,
            arquivado: arquivado,
        }

        dispatch(obterRecadosDoUsuarioThunk(dadosPesquisa))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setArquivado(event.target.checked);
    };

    return (
        <>
            <MeuHeader sair />
            <Grid container margin={'auto'} sx={{marginBottom: 11, mt: 1}}>
                <Paper sx={{padding: 2, width: 1}} elevation={7}>
                    <Grid container justifyContent={'center'} margin={'auto'}>
                        <Grid item xs={12} sx={{backgroundColor: '#9c27b0', padding: '20px'}}>
                            <Box display={'flex'} justifyContent={'flex-end'}>
                                <Box display={'flex'} alignItems={'center'}>
                                    <Typography variant='body1' color={'#fff'}>
                                    Arquivados: 
                                    </Typography>
                                    <Checkbox
                                    sx={{
                                        color: '#ebb5f3',
                                        '&.Mui-checked': {
                                          color: '#ebb5f3',
                                        }}}
                                    checked={arquivado}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </Box>
                                <Box padding={'0 20px'} display={'flex'} alignItems={'center'}>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <InputBase 
                                            id='testeDeInput'
                                            sx={{
                                                width: '230px',
                                                background: '#ffffff40',
                                                padding: '2px 5px 2px 40px',
                                                color: '#fff',
                                                borderRadius: '3px' 
                                        }}                                            
                                        // placeholder="Pesquisar por nome..."
                                        value={searchText}
                                        onChange={event=>setSearchText(event.target.value)}
                                        />
                                </Box>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    sx={{
                                    boxShadow: '0 0 8px #fff', 
                                    ':hover': { 
                                        boxShadow: '0 0 14px #fff'
                                    }}}
                                    onClick={funcaoPesquisar}
                                    >
                                    Pesquisar
                                    </Button>
                                </Box>
                            </Grid>
                        <Grid item xs={12} justifyContent={"center"} marginTop={'20px'}>
                            {!arquivado && (!todosRecadosUsuario &&(
                                <Typography variant='h6' sx={{marginBottom: 3}} textAlign={'center'}>
                                    Clique <Link to="/recados/novorecado">aqui</Link> para adicionar.
                                </Typography>
                            ))}
                        </Grid>

                        <Grid container spacing={3} >
                            {todosRecadosUsuario?.length > 0 && todosRecadosUsuario.map((recado: IRecado) => (
                            
                                <Grid item xs={12} sm={6} md={4} lg={3} data-id-recado={recado.id} data-usuario-recado={recado.usuario} key={recado.id}>
                                    <CardRecado 
                                        data={recado.data}
                                        titulo={recado.titulo} 
                                        descricao={recado.descricao}
                                        usuario={recado.usuario}
                                        id={recado.id}
                                        setModal={() => handleOpen(recado.id)}
                                        arquivado={recado.arquivado}
                                    />
                                </Grid>
                        
                            ))}
                        
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>
            {
                open && <MeuModal open={open} handleClose={handleClose} id={id} dispatch={dispatch}/>
            }
            
            <Box position={"fixed"} bottom={20} right={20}>
                <Fab onClick={() => navigate('/recados/novorecado')} color="secondary" aria-label="add">
                        <AddIcon />
                </Fab>
            </Box> 
        </>
    );
}

export default Recados