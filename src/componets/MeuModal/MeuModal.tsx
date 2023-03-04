import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Modal, TextField, Button, FormGroup, FormControlLabel, Switch, styled, alpha } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';
import { IRecado } from '../../interfaces';
import { alterarRecadoThunk, deletarRecadoThunk } from '../../store/modules/SliceRecado/SliceRecado';
import { atualizaRecados } from '../../store/modules/SliceRecados/SliceRecados';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 2,
    pb: 0,
  };

interface MeuModalProps {
    open: boolean,
    handleClose: any,
    id: string
    dispatch: any
}


export default function MeuModal({ open, handleClose, id, dispatch }: MeuModalProps) {
    // const dispatch = useAppDispatch()
    const usuarioLogado: string = useAppSelector(state => state.usuarioLogado.data)
    const recadoParaEditar: IRecado = useAppSelector(state => state.recados.data.find((recado: IRecado) => recado.id === id))
    const [ idRecado ] = useState<string>(recadoParaEditar.id)
    const [ titulo, setTitulo] = useState<string>(recadoParaEditar.titulo)
    const [ descricao, setDescricao ] = useState<string>(recadoParaEditar.descricao)
    const [ data, setData ] = useState<string>(recadoParaEditar.data)
    const [ arquivado, setArquivado ] = useState<boolean>(recadoParaEditar.arquivado)

    const MySwitch = styled(Switch)(({ theme }) => ({
        color: '#123456',
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: '#d900ff',
          '&:hover': {
            backgroundColor: alpha('#00ff62', theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: '#e95ad6',
        },
      }));

    function salvarEdicao(){
        if(titulo === '' || descricao === '' || data === '') return alert('Todos os campos devem ser preenchidos') 

        const recadoEditado: Partial<IRecado> = {
            id: idRecado,
            titulo,
            descricao,
            data,
            usuario: usuarioLogado,
            arquivado
        }
        dispatch(alterarRecadoThunk(recadoEditado))

        dispatch(atualizaRecados(recadoEditado))
        
        handleClose()
    }

    function excluiRecado() {
            if(window.confirm(`Deseja apagar o recado ${titulo}?`)) {

                const recadoEditado: Partial<IRecado> = {
                    id: idRecado,
                    usuario: usuarioLogado
                }
              
                dispatch(deletarRecadoThunk(recadoEditado))
                dispatch(atualizaRecados(recadoEditado))
            }
        handleClose()
    }

    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Editar recado
                </Typography>

                    <TextField 
                        margin='dense' 
                        variant='outlined'
                        placeholder='Titulo'
                        type='string'
                        value={titulo}
                        onChange={event => setTitulo(event.target.value)}
                        fullWidth
                    />
                

                <TextField
                    margin='dense' 
                    variant='outlined'
                    type='date'
                    value={data}
                    onChange={event => setData(event.target.value)}
                    fullWidth 
                />

                <TextField 
                    margin='dense'
                    variant='outlined'
                    placeholder='Descrição'
                    type='string'
                    value={descricao}
                    onChange={event => setDescricao(event.target.value)}
                    multiline
                    rows={5}
                    fullWidth
                />

                <Grid
                    item 
                    margin={2} 
                    display={'flex'} 
                    justifyContent={'space-evenly'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                                    
                >
                        <FormGroup sx={{
                            background: '#ebb5f3aa', 
                            display: 'flex', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '5px',
                            paddingLeft: '15px',
                            borderRadius: '5px',
                        }}>
                            <FormControlLabel 
                                control={<MySwitch
                                    checked={arquivado}
                                    onChange={()=>setArquivado(!arquivado)}
                                />}
                                label="Arquivado"
                                color='warning'
                            />
                        </FormGroup>

                        <Button 
                            variant='outlined'
                            color='error'
                            onClick={excluiRecado}
                            sx={{mb: 1}}
                        >
                            Excluir
                        </Button>

                        <Button 
                            variant='outlined'
                            color='secondary'
                            onClick={handleClose}
                            sx={{mb: 1}}
                        >
                            Fechar
                        </Button>

                        <Button 
                            variant='contained'
                            color='secondary'
                            onClick={salvarEdicao}
                            sx={{mb: 1}}
                        >
                            Salvar recado
                        </Button>
                </Grid>
            </Box>
        </Modal>
    )
}