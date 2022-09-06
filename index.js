const inicio = Date.now() // Pega o tempo em milisegundos antes do algoritmo executar

//import PI from "./PI.js" // Chama um arquivo JS exportando a string do número PI com 1 milhão de casas decimais

//const numPI = PI // Coloca a string do número PI contendo 1 milhão de casas decimais na variável numPI

import fetch from "node-fetch"; // Importa o módulo node-fetch para fazer fetch e consumir APIS

function getPI(start, jump) { // Função que recebe o número em que queremos iniciar a busca pelas casas decimais do PI e retorna o fetch
    return fetch(`https://api.pi.delivery/v1/pi?start=${start}&numberOfDigits=${jump}&radix=10`)
}

function vPrimo(num) { // Função que verifica se o número é primo
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false
    return true
}

function calcPalindromeNumber(numPI) { // Função que recebe o intervalo de casa decimais do PI e verifica entre elas se existe um palindromo para mandar para a função vPrimo verificar se é primo
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

let start = 0 // Variável de controle que controla por qual casa decimal de PI iremos começar a busca
let end = 10000 // Variável de controle do loop que controla quantas vezes irá se repetir
let jump = 1000

async function palindromePI() { // Função assíncrona que executa a função que faz requisição para a API e recebe uma promise para tratá-la e obter o intervalo de casas decimais de PI desejadas
    for (let c = 0; c <= end; c++) { // Loop que fica fazendo requisições a API

        const response = await getPI(start, jump) // A variável response recebe uma promise que foi resolvida com o await e trazida pela função getPI mandando o número de início
        const responseJson = await response.json() // A variável responseJson recebe o resultado dessa promise convertida para JSON

        const numPalindromePI = calcPalindromeNumber(responseJson.content) // Manda o intervalo de 1000 dígitos de PI para verificar e retorna ou undefined ou o número correto

        if (numPalindromePI) { // Se retornar um número, entra no se, mostra o número e para a execução
            console.log(numPalindromePI)
            break
        }

        start = start + jump - 21 // A cada iteração a variável de start recebe ela mesma mais 1000 - 9 para chamar um novo intervalo de casas decimais e subtrair 21 para evitar que os 21 últimos formem pares palindromos com a próxima "remessa"
    
        if (start >= 10000000) break // Para ter um pouco mais de controle sobre a execução, ao chegar em 10 milhões o programa para a execução
    }

    const fim = Date.now() // Pega o tempo em milisegundos depois do algoritmo executar para mostrar o tempo decorrido
    console.log(`Tempo de execução: ${fim - inicio} milisegundos`)
    
    const used = process.memoryUsage().heapUsed / 1024 / 1024 // Pega o processamento para mostrar a memória usada na execução do algoritmo
    console.log(`O script usou aproximadamente ${Math.round(used * 100) / 100} MB`)
  
}

palindromePI()
