const inicio = Date.now() // Pega o tempo em milisegundos antes do algoritmo executar

const PI = require('./PI.js') // Chama um arquivo JS exportando a string do número PI com 1 milhão de casas decimais
const numPI = PI.variable // Coloca a string do número PI contendo 1 milhão de casas decimais na variável numPI

function vPrimo(num) { // Função que verifica se o número é primo
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false
    return true
}

for (let i = 2; i < numPI.length-9; i++) {
    if (numPI[i] !== numPI[i+8] || numPI[i+8] % 2 == 0) // Se o número primeiro dígito for diferente do último dígito ou se o último dígito for par, continue
    continue
            
    let num = "", j = 0, numr = ""

    while (numPI[i+j] === numPI[8+i-j] && j < 4){ // Verifica se os 4 primeiros dígitos são iguais aos 4 últimos
        num += numPI[i+j]
        numr = numPI[i+j] + numr
        j++
    }
        
    if (j === 4 && vPrimo(num=num+numPI[i+j]+numr)){
        console.log(num)
        break
    }
}
  
const fim = Date.now() // Pega o tempo em milisegundos depois do algoritmo executar para mostrar o tempo decorrido
console.log(`Tempo de execução: ${fim - inicio} milisegundos`)

const used = process.memoryUsage().heapUsed / 1024 / 1024 // Pega o processamento para mostrar a memória usada na execução do algoritmo
console.log(`O script usou aproximadamente ${Math.round(used * 100) / 100} MB`)

