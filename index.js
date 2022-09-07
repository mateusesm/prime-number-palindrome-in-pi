const inicio = Date.now() // Pega o tempo em milisegundos antes do algoritmo executar

//import axios from "axios" // Importa o módulo axios para fazer fetch e consumir APIS

import fetch from "node-fetch" // Importa o módulo fetch para fazer fetch e consumir APIS

import fs from 'fs'

//import PI from "./PI-billion.js"

//const numPI = PI

const timeEnd = () => { // Função que é chamada logo após o termino do algoritmo para mostrar o tempo decorrido

    const fim = Date.now() // Pega o tempo em milisegundos depois do algoritmo executar para mostrar o tempo decorrido
    console.log(`Tempo de execução: ${fim - inicio} milisegundos`)
    
    const used = process.memoryUsage().heapUsed / 1024 / 1024 // Pega o processamento para mostrar a memória usada na execução do algoritmo
    console.log(`O script usou aproximadamente ${Math.round(used * 100) / 100} MB`)

}

const getPI = (start, jump) => { // Função que recebe o número em que queremos iniciar a busca pelas casas decimais do PI e retorna o fetch
    return fetch(`https://api.pi.delivery/v1/pi?start=${start}&numberOfDigits=${jump}&radix=10`)
}

const vPrimo = (num) => { // Função que verifica se o número é primo
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false
    return true
}

const calcPalindromeNumber = (numPI) => { // Função que recebe o intervalo de casa decimais do PI e verifica se o primeiro e o último dígitos são iguais e se o último dígito é par, se for, retorna o número, se não, retorna undefined
    for (let i = 0; i < numPI.length-21; i++) {
        
        if (numPI[i] !== numPI[i+20] || numPI[i+20] % 2 == 0) // Se o número primeiro dígito for diferente do último dígito ou se o último dígito for par, continue
        continue
        
        let num = "", j = 0, numr = ""
    
        while (numPI[i+j] === numPI[20+i-j] && j < 10){ // Verifica se os 10 primeiros dígitos são iguais aos 10 últimos. 
            num += numPI[i+j]
            numr = numPI[i+j] + numr
            j++
        }
            
        if (j === 10 && vPrimo(num=num+numPI[i+j]+numr)){ // Caso o número seja palindromo e primo, retorna o número, caso contrário, retorna undefined
            return num
        }
        
    }

    return
}

let start1 = 100000000 // Variável de controle que controla por qual casa decimal de PI iremos começar a busca
let start2 = 100500000
let start3 = 200000000
let start4 = 200500000
let start5 = 300000000
let start6 = 300500000
let start7 = 400000000
let start8 = 400500000
let start9 = 500500000
let start10 = 600000000
let end = 10000 // Variável de controle do loop que controla quantas vezes irá se repetir
let jump = 1000 // Variável de controle que informa quantos dígitos de PI virão na requisição

const palindromePI = async (start, end, jump) => { // Função assíncrona que executa a função que faz requisição para a API e recebe uma promise para tratá-la e obter o intervalo de casas decimais de PI desejadas
    for (let c = 0; c < end; c++) { // Loop que fica fazendo requisições a API

        const response = await getPI(start, jump) // A variável response recebe uma promise que foi resolvida com o await e trazida pela função getPI mandando o número de início

        const responseJson = await response.json() // Converte a resposta para JSON

        const numPalindromePI = calcPalindromeNumber(responseJson.content) // Manda o intervalo de 1000 dígitos de PI para verificar e retorna ou undefined ou o número correto

        if (numPalindromePI && !fs.existsSync('./palindromo.txt')) { // Se retornar um número, entra no se, mostra o número e para a execução
            console.clear()
            fs.writeFileSync('palindromo.txt', numPalindromePI)
            break
        } else {
            console.log(`Não encontrei apartir de ${start}`)
        }

        start = start + jump - 21 // A cada iteração a variável de start recebe ela mesma mais 1000 - 9 para chamar um novo intervalo de casas decimais e subtrair 21 para evitar que os 21 últimos formem pares palindromos com a próxima "remessa"

    }

    timeEnd()

}

const startOne = (start1, end, jump) => {

    palindromePI(start1, end, jump)

}

const startTwo = (start2, end, jump) => {

    palindromePI(start2, end, jump)

}

const startThree = (start3, end, jump) => {

    palindromePI(start3, end, jump)

}

const startFour = (start4, end, jump) => {

    palindromePI(start4, end, jump)

}

const startFive = (start5, end, jump) => {

    palindromePI(start5, end, jump)

}

const startSix = (start6, end, jump) => {

    palindromePI(start6, end, jump)

}

const startSeven = (start7, end, jump) => {

    palindromePI(start7, end, jump)

}

const startEight = (start8, end, jump) => {

    palindromePI(start8, end, jump)

}


const startNine = (start9, end, jump) => {

    palindromePI(start9, end, jump)

}

const startTen = (start10, end, jump) => {

    palindromePI(start10, end, jump)

}

startOne(start1, end, jump)
startTwo(start2, end, jump)
startThree(start3, end, jump)
startFour(start4, end, jump)
startFive(start5, end, jump)
startSix(start6, end, jump)
startSeven(start7, end, jump)
startEight(start8, end, jump)
startNine(start9, end, jump)
startTen(start10, end, jump)



