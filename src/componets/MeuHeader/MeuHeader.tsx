import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';
import { logoutUsuarioThunk } from '../../store/modules/SliceUsuarios/SliceUsuarios';

interface MeuHeaderProps {
    sair?: boolean,
}

export default function MeuHeader({sair}: MeuHeaderProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const id = useAppSelector(state => state.usuarioLogado.data)

  const funcaoSair = async () => {
    await dispatch(logoutUsuarioThunk(id))
    barquinho()
  }

  function barquinho() {
    return navigate('/')
  }

  return (


    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='secondary'>
            <Toolbar>
                <PlaylistAddCheckIcon fontSize='large' sx={{marginLeft: 2, marginRight: 1}} />
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Gugol Recados
                </Typography>
                {sair && (
                    <div>
                        
                        <IconButton
                            size='small'
                            aria-controls="menu-appbar"
                            color="inherit"
                            onClick={funcaoSair}
                            sx={{marginRight: 2}}
                        >
                            <Typography variant='body1' component="div" sx={{ flexGrow: 1 }}>
                                Sair
                            </Typography>
                        </IconButton>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    </Box>
    );
}