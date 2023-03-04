export function verificaInputsLogin(email: string, senha: string): boolean {
    if(email === '' || senha === '') {
        alert("Email e Senha devem ser preenchidos")
        return false
    }

    return true
}