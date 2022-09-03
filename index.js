const lineReader = require('line-reader')

const { eachLine } = lineReader

const inicio = Date.now()

eachLine('./PI.txt', (line, last) => {

    const numPI = line

    function vPrimo(num) {
        for(let i = 2, s = Math.sqrt(num); i <= s; i++)
            if(num % i === 0) return false
        return true
    }

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
            const fim = Date.now()
            console.log(`Tempo de execução: ${fim - inicio} milisegundos`)
            break
        }
    }
    if (last) {
        return false; // stop reading
    }
});
