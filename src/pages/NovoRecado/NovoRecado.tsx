import React, { useEffect } from "react";
import MeuHeader from "../../componets/MeuHeader/MeuHeader";
import { Button, Container, Grid, TextField , Paper, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/modules/hooks";
import { IRecado } from "../../interfaces/IRecado";
import { v4 as uuid } from "uuid";
import { adicionarRecadoThunk } from "../../store/modules/SliceRecado/SliceRecado";
import { verificaUsuarioLogadoThunk } from "../../store/modules/SliceUsuarios/SliceUsuarios";

function verificaInputs(titulo: string, descricao: string, data: string) {

    if(titulo === '' || data === '' || descricao === '') {
        alert('Todos os campos devem ser preenchidos')
        return false
    }
    return true
}

const NovoRecado: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const keyTemp: string = useAppSelector(state => state.usuarioLogado.data)
    const [ titulo, setTitulo ] = useState<string>('')
    const [ descricao, setDescricao ] = useState<string>('')
    const [ data, setData ] = useState<string>('')

    useEffect(() => {
        verificaLogado()
        if(!keyTemp) navigate("/")
    },[ dispatch, keyTemp ])

    async function verificaLogado() {
        const retorno = await dispatch(verificaUsuarioLogadoThunk(keyTemp))
        return retorno
    }
    
    async function cadastraRecado() {
        if(!verificaInputs(titulo, descricao, data)) return

        const novoRecado: Partial<IRecado> = {
            titulo,
            descricao,
            data,
            usuario: keyTemp,
        }

        await dispatch(adicionarRecadoThunk(novoRecado))
        navigate('/recados')
    }

    return (
        <>
            <MeuHeader sair />
            <Container sx={{marginTop: 3}}>
                <Grid container display={'flex'} justifyContent={'center'}>
                    <Grid item sm={8} md={5} lg={5}>
                        <Paper sx={{padding: 2}} elevation={7}>
                            <div>
                                <Typography 
                                    variant='h6' 
                                    margin='normal' 
                                    textAlign={'center'}
                                >
                                    Cadastrar novo Recado:
                                </Typography>

                                <TextField 
                                    margin='dense' 
                                    variant='outlined' 
                                    label='Titulo' 
                                    type='string' 
                                    value={titulo} 
                                    onChange={event=>setTitulo(event.target.value)} 
                                    fullWidth
                                />

                                <TextField
                                    margin='dense' 
                                    variant='outlined' 
                                    type='date' 
                                    value={data} 
                                    onChange={event=>setData(event.target.value)} 
                                    fullWidth 
                                />

                                <TextField 
                                    margin='dense'
                                    variant='outlined'
                                    label='Descrição'
                                    type='string'
                                    value={descricao}
                                    onChange={event=>setDescricao(event.target.value)}
                                    multiline
                                    rows={5}
                                    fullWidth
                                />

                                <Grid 
                                    item 
                                    margin={2} 
                                    display={'flex'} 
                                    justifyContent={'space-between'}
                                
                                >
                                    <Button 
                                        variant='outlined'
                                        color='secondary'
                                        onClick={()=>navigate('/recados')}
                                    >
                                        Voltar
                                    </Button>

                                    <Button 
                                        variant='contained'
                                        color='secondary'
                                        onClick={()=>cadastraRecado()}
                                    >
                                        Salvar recado
                                    </Button>

                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default NovoRecado;