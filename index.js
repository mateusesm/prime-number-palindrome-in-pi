import fetch from "node-fetch" // Importa o módulo fetch para fazer fetch e consumir APIS

import fs from 'fs'

//import PI from "./PI-billion.js"

const DNPI = 5 //Números de dígitos a se buscar

const timeEnd = (inicio) => { // Função que é chamada logo após o termino do algoritmo para mostrar o tempo decorrido

    const fim = Date.now() // Pega o tempo em milisegundos depois do algoritmo executar para mostrar o tempo decorrido
    console.log(`\nAlgoritmo Finalizado!\nTempo de execução: ${fim - inicio} milisegundos`)
    
    const used = process.memoryUsage().heapUsed / 1024 / 1024 // Pega o processamento para mostrar a memória usada na execução do algoritmo
    console.log(`O script usou aproximadamente ${Math.round(used * 100) / 100} MB\n`)

}

const getPI = (start) => { // Função que recebe o número em que queremos iniciar a busca pelas casas decimais do PI e retorna o fetch
    return fetch(`https://api.pi.delivery/v1/pi?start=${start}&numberOfDigits=1000&radix=10`)
}

const vPrimo = (num) => { // Função que verifica se o número é primo
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false
    return true
}

const calcPalindromeNumber = (numPI) => { // Função que recebe o intervalo de casa decimais do PI e verifica se o primeiro e o último dígitos são iguais e se o último dígito é par, se for, retorna o número, se não, retorna undefined
    for (let i = 0; i < numPI.length-DNPI; i++) {
        
        if (numPI[i] !== numPI[i+DNPI-1] || numPI[i+DNPI-1] % 2 == 0) // Se o número primeiro dígito for diferente do último dígito ou se o último dígito for par, continue
        continue
        
        let num = "", j = 0, numr = ""
    
        while (numPI[i+j] === numPI[DNPI-1+i-j] && j < Math.trunc(DNPI/2)){ // Verifica se os 10 primeiros dígitos são iguais aos 10 últimos. 
            num += numPI[i+j]
            numr = numPI[i+j] + numr
            j++
        }
        
        if (j === Math.trunc(DNPI/2)){
            if (DNPI % 2 === 0) //Se o número de dígitos for par
                num =  num+numr
            else
                num =  num+numPI[i+j]+numr  
            
            if (vPrimo(num)) // Caso o número seja palindromo e primo, retorna o número, caso contrário, retorna undefined
                return num
        }        
    }

    return null
}

const palindromePI = async (start, end) => { // Função assíncrona que executa a função que faz requisição para a API e recebe uma promise para tratá-la e obter o intervalo de casas decimais de PI desejadas
    for (let c = start; c < end; c+=1000 - DNPI) { // Loop que fica fazendo requisições a API
        
        const response = await getPI(c) // A variável response recebe uma promise que foi resolvida com o await e trazida pela função getPI mandando o número de início

        const responseJson = await response.json() // Converte a resposta para JSON

        const numPalindromePI = calcPalindromeNumber(responseJson.content) // Manda o intervalo de 1000 dígitos de PI para verificar e retorna ou undefined ou o número correto

        if (numPalindromePI) // Se retornar um número, retorna mostra o número de inicio do range da busca
            return [start,numPalindromePI]
    }
    return null
}

console.log("Executando... Aguarde!")
const inicio = Date.now() // Pega o tempo em milisegundos antes do algoritmo executar

let jump = 1000
let start = 0
let resp = []

while (true){
    let start_backup = start 
    try {
        console.log("buscando (início, fim): ",start,start+jump*6)
    
        await Promise.all([palindromePI(start, start+jump), palindromePI(start+jump-DNPI, start+jump*2),
        palindromePI(start+jump*2-DNPI, start+jump*3),palindromePI(start+jump*3-DNPI, start+jump*4),
        palindromePI(start+jump*4-DNPI, start+jump*5),palindromePI(start+jump*5-DNPI, start+jump*6)
        ]).then((values) => {
            resp = values;
        }); 

        if (resp.some((x) => x != null))
            break
        
        start += jump*6-DNPI
    }
    catch (e) {
       console.log(e)
       console.log("reiniciando a última operação...")
       start = start_backup
    }   
}

timeEnd(inicio)

if (!resp.some((x) => x != null))
    console.log("Nenhum número encontrado! :-0")
else{
    console.log("Resposta: (range(ini), número)")
    console.log(resp.sort(function(a,b) { if (a != null && b != null) return a[0] - b[0];}))
}