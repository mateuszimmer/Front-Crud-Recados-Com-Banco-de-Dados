import { IResposta } from "../interfaces/IResposta";
import { IUsuario } from "../interfaces/IUsuario";
import { api } from "./index";

class UsuarioDataService {
    async cadastraUsuario(usuario: IUsuario) {
        try {
            return (await api.post('/usuario/novo', usuario)).data
        } catch (error: any) {
            return error.response.data
        }
    }

    async getUser(usuario: Partial<IUsuario>) {
        try {
            return (await api.post('/logar', usuario)).data
        } catch (error: any) {
            return error.response.data
        }
    }

    async logoutUser(id: string) {
        try {
            return (await api.delete(`/logout/${id}`)).data
        } catch (error: any) {
            return error.response.data
        }
    }

    async verificaUsuarioLogado(id: string) {
        try {
            return (await api.get(`/usuarioLogado/${id}`)).data
        } catch (error: any) {
            return error.response.data
        }
    }
}

const userService = new UsuarioDataService()

export { userService }