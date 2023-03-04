import { combineReducers } from '@reduxjs/toolkit';
import usuarioLogado from './SliceUsuarios/SliceUsuarios';
import recados from './SliceRecados/SliceRecados';
import recado from './SliceRecado/SliceRecado';

export default combineReducers({
    usuarioLogado,
    recados,
    recado
})