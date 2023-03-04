export function verificaInputsCadastro(email: string, senha: string, reSenha: string): boolean{
const regexEmail = /\S+@\S+\.\S+/
if(email === '' || senha === '' || reSenha === '') {
alert("Todas as informações devem ser preenchidas")
return false
}

    if(!regexEmail.test(email)) {
        alert('Digite um e-mail válido')
        return false
    }

    if(senha.length<3) {
        alert('A senha deve ter pelo menos 3 dígitos')
        return false
    }
    if(senha !== reSenha) {
        alert('As senhas não conferem')
        return false
    }

    return true
}
