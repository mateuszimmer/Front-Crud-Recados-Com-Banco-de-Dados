import React from "react";
import MeuHeader from "../../componets/MeuHeader/MeuHeader";
import { Button, Container, Grid, TextField , Paper, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userService } from "../../services";
import { IResposta, IUsuario } from "../../interfaces/";
import { verificaInputsCadastro } from "../../utils/functions";

const Cadastro = () => {
    const navigate = useNavigate()

    const [ email, setEmail ] = useState<string>('');
    const [ senha, setSenha ] = useState<string>('');
    const [ reSenha, setReSenha ] = useState<string>('');

    async function cadastrarUsuario(){
        if(!verificaInputsCadastro(email, senha, reSenha)) return

        const novoUsuario: IUsuario = {
            email,
            senha,
            reSenha
        }

        const resposta:IResposta = await userService.cadastraUsuario(novoUsuario)
        console.log(resposta)
        if(resposta.success) {
            alert('Usuário Cadastrado com sucesso')
            navigate('/') 
        } else {
            alert(`${resposta.message}`)
        }
    }

    return (
        <>
            <MeuHeader />
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
                                    Preencha os campos abaixo para criar uma conta:
                                </Typography>

                                <TextField 
                                    margin="dense" 
                                    variant="outlined" 
                                    label='E-mail' 
                                    type='email' 
                                    value={email} 
                                    onChange={(event) => setEmail(event.target.value)} 
                                    fullWidth 
                                />

                                <TextField 
                                    margin="dense"
                                    variant="outlined"
                                    label='Senha'
                                    type='password'
                                    value={senha}
                                    onChange={(event) => setSenha(event.target.value)}
                                    fullWidth
                                />

                                <TextField 
                                    margin="dense"
                                    variant="outlined"
                                    label='Repete Senha'
                                    type='password'
                                    value={reSenha}
                                    onChange={(event) => setReSenha(event.target.value)}
                                    fullWidth
                                />

                                <Grid item margin={2} display={'flex'} justifyContent={'space-between'}>
                                    
                                    <Button 
                                        variant="outlined" 
                                        color="secondary" 
                                        onClick={() => navigate('/')}
                                    >
                                        Voltar
                                    </Button>
                                
                                    <Button
                                        variant="contained" 
                                        color="secondary"
                                        onClick={() => cadastrarUsuario()}
                                    >
                                        Criar conta
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

export default Cadastro;