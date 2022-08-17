// viacep.com.br/ws/01001000/json/


const cepForm = document.getElementById("cep-form")
const resultado = document.getElementById("result")

cepForm.addEventListener("submit", buscarCep)

async function buscarCep(event) {
    event.preventDefault();

    const input = cepForm[0].value.trim()
    const rua = document.createElement('p')
    const bairroLocal = document.createElement('p')
    const cepLocal = document.createElement('p')
    const dddLocal = document.createElement('p')
    const ibgeLocal = document.createElement('p')
    const ufLocal = document.createElement('p')
    const cidade = document.createElement('p')


    async function getCharacter() {
        const response = await fetch(`https://viacep.com.br/ws/${input}/json`)
        let userData = await response.json();
        return userData
    }

    let character = await getCharacter()
        .catch((erro) => {
            resultado.innerHTML = ""
            rua.innerText = "Pesquisa não encontrada"
            resultado.append(rua)
        })

    let { bairro, cep, ddd, ibge, localidade, logradouro, uf } = character

    if (logradouro == undefined) {
        resultado.innerHTML = ""
        rua.innerText = "Pesquisa não encontrada"
    } else {
        rua.innerText = `Rua: ${logradouro}`
        cidade.innerText = `Cidade: ${localidade}`
        bairroLocal.innerText = `Bairro: ${bairro}`
        cepLocal.innerText = `Cep: ${cep}`
        dddLocal.innerText = `DDD: ${ddd}`
        ibgeLocal.innerText = `Ibje: ${ibge}`
        ufLocal.innerHTML = `Estado: ${uf}`
    }

    resultado.innerHTML = ""
    resultado.append(rua, cidade, bairroLocal, cepLocal, dddLocal, ibgeLocal, ufLocal)

}

