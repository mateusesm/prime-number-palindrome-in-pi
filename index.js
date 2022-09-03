const lineReader = require('line-reader')

const { eachLine } = lineReader

const inicio = Date.now()

eachLine('./PI.txt', (line, last) => {

    const numPI = line

    function ePrimo(num) {
        for(let i = 2, s = Math.sqrt(num); i <= s; i++)
            if(num % i === 0) return false
        return true
    }

    for (let i = 0; i < numPI.length-9; i++) {

        if (numPI[i] !== numPI[i+8])
        continue
            
        let num = ""

        let j = 0
        while (numPI[i+j] === numPI[8+i-j] && j < 9){
            num += numPI[i+j]
            j++
        }
            
        if (j === 9 && numPI[i+j-1] % 2 !== 0){
            //verifica primo
            //se primo, imprime e break
            if (ePrimo(num)){
                console.log(num)

                const fim = Date.now()
                console.log(`Tempo de execução: ${fim - inicio} milisegundos`)
                break
                
            }
        }
    }

    if (last) {
        return false; // stop reading
    }

});












    