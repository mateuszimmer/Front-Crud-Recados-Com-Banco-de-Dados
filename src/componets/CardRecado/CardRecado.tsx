import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import { IRecado } from '../../interfaces/IRecado';
import { useAppDispatch } from '../../store/modules/hooks';
import { alterarRecadoThunk, deletarRecadoThunk } from '../../store/modules/SliceRecado/SliceRecado';
import { atualizaRecados } from '../../store/modules/SliceRecados/SliceRecados';
import { store } from '../../store';

interface CardRecadoProps extends Partial<IRecado> {
  setModal: any
}

export default function CardRecado({data, titulo, descricao, id, usuario, setModal, arquivado }: CardRecadoProps) {

  const dispatch = useAppDispatch();

  function apagarRecado(): void {
    if(window.confirm(`Deseja apagar o recado ${titulo}?`)) {

      const recadoEditado: Partial<IRecado> = {
        id,
        usuario: store.getState().usuarioLogado.data
    }
    
    dispatch(deletarRecadoThunk(recadoEditado))

    dispatch(atualizaRecados(recadoEditado))
    }
  }
  
  return (
    <Card sx={{ minWidth: 200 }} elevation={5} >
      <CardContent>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data}
        </Typography>

        <Typography variant="h5" component="div">
          {titulo}
        </Typography>

        <Typography variant="body2" marginTop={1} textAlign="justify">
          {descricao}
        </Typography>

      </CardContent>
      
      <CardActions>
        <Grid container justifyContent={'flex-end'}>
            <Button sx={{m: 0.5}} onClick={setModal} size="small" variant='outlined' color="secondary">Editar</Button>
            <Button sx={{m: 0.5}} onClick={apagarRecado} size="small" variant='outlined' color="error">Excluir</Button>
        </Grid>
      </CardActions>
    </Card>
  );
}