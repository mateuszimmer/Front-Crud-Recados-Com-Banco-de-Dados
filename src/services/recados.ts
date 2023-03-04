import { IDadosGetRecados } from '../interfaces/IDadosGetRecados'
import { IRecado } from '../interfaces/IRecado'
import { api } from './index'

class RecadosDataService {
    async userGetRecados(dados: IDadosGetRecados) {
        const { id, arquivado, titulo } = dados
        try {
            return (await api
                .get(`/usuario/${id}/recados?${arquivado?`arquivado=1`:`arquivado=0`}${titulo?`&titulo=${titulo}`:''}`)).data
        } catch (error: any) {
            return error.response.data
        }
    }

    async cadastraRecado(novoRecado: Partial<IRecado>) {
        try {
            return (await api.post('/recados/novorecado',
            {
                titulo: novoRecado.titulo,
                descricao: novoRecado.descricao,
                data: novoRecado.data,
                usuario: novoRecado.usuario,
            })).data
        } catch (error: any) {
            return error.response.data
        }
    }

    async alteraRecado(recadoAlterado: Partial<IRecado>) {
        try {
            return (await api.put(`/recado/${recadoAlterado.id}`,
                {
                    titulo: recadoAlterado.titulo,
                    descricao: recadoAlterado.descricao,
                    data: recadoAlterado.data,
                    token: recadoAlterado.usuario,
                    arquivado: recadoAlterado.arquivado
                })).data
        } catch (error: any) {
            return error.response.data
        }
    }

    async deletarRecado(recadoAlterado: Partial<IRecado>) {
        try {
            return (await api.delete(`/recado/delete/${recadoAlterado.usuario}?recado=${recadoAlterado.id}`)).data
        } catch (error: any) {
            return error.response.data
        }
    }
}

const recadosService = new RecadosDataService()

export { recadosService }