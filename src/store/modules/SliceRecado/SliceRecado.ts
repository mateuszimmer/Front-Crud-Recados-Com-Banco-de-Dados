import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IRecado, IResposta } from '../../../interfaces';
import { recadosService } from '../../../services';

export const adicionarRecadoThunk = createAsyncThunk<IResposta, Partial<IRecado>>('/recado/novo', async (recado) => {
    return await recadosService.cadastraRecado(recado)
})

export const alterarRecadoThunk = createAsyncThunk<IResposta, Partial<IRecado>>('/recado/alterar/', async (recadoAlterado) => {
    return await recadosService.alteraRecado(recadoAlterado)
})

export const deletarRecadoThunk = createAsyncThunk<IResposta, Partial<IRecado>>('/recado/deletar/', async (recadoAlterado) => {
    return await recadosService.deletarRecado(recadoAlterado)
})

const SliceRecado = createSlice({
    name: 'recado',
    initialState: {} as IResposta,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(adicionarRecadoThunk.fulfilled, (state, action) => {
                const { success, message, data } = action.payload
                state.data = data
                state.message = message
                state.success = success
            })
            .addCase(alterarRecadoThunk.fulfilled, (state, action) => {
                const { success, message, data } = action.payload
                state.data = data
                state.message = message
                state.success = success
            })
            .addCase(deletarRecadoThunk.fulfilled, (state, action) => {
                const { success, message, data } = action.payload
                state.data = data
                state.message = message
                state.success = success
            })
    }
})

export default SliceRecado.reducer