const inicio = Date.now()

//import PI from "./PI.js"

//const numPI = PI

import fetch from "node-fetch";

function getPI(start) {
    return fetch(`https://api.pi.delivery/v1/pi?start=${start}&numberOfDigits=1000&radix=10`)
}

function vPrimo(num) {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false
    return true
}

function calcPrimePalindrome(numPI) {
    for (let i = 0; i < numPI.length-9; i++) {
        
        if (numPI[i] !== numPI[i+8] || numPI[i+8] % 2 == 0) //se o número primeiro dígito for diferente do último dígito ou se o último dígito for par, continue.
        continue
                
        let num = "", j = 0, numr = ""
    
        while (numPI[i+j] === numPI[8+i-j] && j < 4){ //verifica se os 4 primeiros dígitos são iguais aos 4 últimos. 
            num += numPI[i+j]
            numr = numPI[i+j] + numr
            j++
        }
            
        if (j === 4 && vPrimo(num=num+numPI[i+j]+numr)){
            console.log(num)
            break
        }
    }
}

let start = 100000
let end = 900

async function palindromePI() {
    for (let c = 0; c <= end; c++) {

        const response = await getPI(start, 1000)
        const responseJson = await response.json()

        calcPrimePalindrome(responseJson.content)

        start = start + 1000 - 9
    
        if (start >= 1000000) break
    }

    const fim = Date.now()
    console.log(`Tempo de execução: ${fim - inicio} milisegundos`)
    
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    console.log(`O script usou aproximadamente ${Math.round(used * 100) / 100} MB`)
  
}

palindromePI()

