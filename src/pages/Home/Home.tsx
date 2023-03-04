import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import MeuHeader from "../../componets/MeuHeader/MeuHeader";
import { Button, Container, Grid, TextField , Paper, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/modules/hooks";
import { IUsuario } from "../../interfaces/IUsuario";
import { loginUsuarioThunk, verificaUsuarioLogadoThunk } from "../../store/modules/SliceUsuarios/SliceUsuarios";
import { verificaInputsLogin } from "../../utils/functions";
import { store } from "../../store";

const Home: React.FC = () => {
    const primeiraExecucao = useRef(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const usuarioLogado: string = useAppSelector(state => state.usuarioLogado.data)

    const [ email, setEmail ] = useState<string>('')
    const [ senha, setSenha ] = useState<string>('')

    useEffect(() => {
        if (usuarioLogado) {
            barquinho()
        }
    },)

    function barquinho() {
        return navigate(`/recados`)
    }

    async function executarLogin() {
        if(!verificaInputsLogin(email, senha)) return
        const usuario: IUsuario = {
            email,
            senha
        }

        await dispatch(loginUsuarioThunk(usuario))

        if(!(store.getState().usuarioLogado.success)) return alert('Não foi possível logar. Verifique as informações.')
        
        alert('Bem vindo!')
        
        barquinho()
    }

    return(
        <>
            <MeuHeader sair={false} />
            <Container sx={{marginTop: 8}}>
                <Grid container display={'flex'} justifyContent={'center'}>
                    <Grid item sm={8} md={5} lg={5}>
                        <Paper sx={{padding: 2}} elevation={7}>
                            <div>
                                <Typography 
                                    variant='body1' 
                                    margin='normal' 
                                    textAlign={'center'}
                                >
                                    Digite seu e-mail e senha para acessar seus recados:
                                </Typography>
                                
                                <TextField 
                                    margin="dense" 
                                    variant="outlined" 
                                    label='E-mail' 
                                    type='email' 
                                    value={email}
                                    onChange={event=>setEmail(event.target.value)}
                                    fullWidth 
                                />
                                
                                <TextField 
                                    margin="dense" 
                                    variant="outlined" 
                                    label='Senha' 
                                    type='password'
                                    value={senha}
                                    onChange={event=>setSenha(event.target.value)}
                                    fullWidth 
                                />
                                
                                <Grid item margin={2} display={'flex'} justifyContent={'space-between'}>

                                    <Button 
                                        variant="outlined" 
                                        color="secondary" 
                                        onClick={()=>navigate('/cadastro')}
                                    >
                                        Criar conta
                                    </Button>

                                    <Button 
                                        variant="contained" 
                                        color="secondary"
                                        onClick={executarLogin}
                                    >
                                        Logar
                                    </Button>
                                
                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Home;