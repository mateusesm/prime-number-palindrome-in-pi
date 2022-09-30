import fetch from "node-fetch" // Importa o módulo fetch para fazer fetch e consumir APIS

import fs from 'fs'

//import PI from "./PI-billion.js"

const DNPI = 21 //Números de dígitos a se buscar

const timeEnd = (inicio) => { // Função que é chamada logo após o termino do algoritmo para mostrar o tempo decorrido

    const fim = Date.now() // Pega o tempo em milisegundos depois do algoritmo executar para mostrar o tempo decorrido
    console.log(`\nAlgoritmo Finalizado!\nTempo de execução: ${fim - inicio} milisegundos`)
    
    const used = process.memoryUsage().heapUsed / 1024 / 1024 // Pega o processamento para mostrar a memória usada na execução do algoritmo
    console.log(`O script usou aproximadamente ${Math.round(used * 100) / 100} MB\n`)

}

const getPI = (start) => { // Função que recebe o número em que queremos iniciar a busca pelas casas decimais do PI e retorna o fetch
    return fetch(`https://api.pi.delivery/v1/pi?start=${start}&numberOfDigits=1000&radix=10`)
}

/* As três funções a seguir (power, miillerTest, isPrime)
foram adaptadas do site: https://www.geeksforgeeks.org/primality-test-set-3-miller-rabin/
O teste Miller-Rabin (por Gary Miller e Michael Rabin) é um teste probabilístico da primitividade de um dado número n.
Se um número n não passar pelo teste, n com certeza é um número composto (ou seja, não-primo).
Se o número passar no teste, ele é primo, com uma probabilidade.
A margem de erro pode ser diminuída arbitrariamente, aplicando-se o teste várias vezes ao mesmo número n.
No caso do algoritmo abaixo, aumente o valor do k para aumentar a confiabilidade do resultado.*/

// Utility function to do modular exponentiation. It returns (x^y) % p
function power(x, y, p){
    
    // Initialize result 
    // (JML- all literal integers converted to use n suffix denoting BigInt)
    let res = 1n;
    
    // Update x if it is more than or
    // equal to p
    x = x % p;
    while (y > 0n){
        
        // If y is odd, multiply
        // x with result
        if (y & 1n)
            res = (res*x) % p;

        // y must be even now
        y = y/2n; // (JML- original code used a shift operator, but division is clearer)
        x = (x*x) % p;
    }
    return res;
}


// This function is called
// for all k trials. It returns
// false if n is composite and
// returns false if n is
// probably prime. d is an odd
// number such that d*2<sup>r</sup> = n-1
// for some r >= 1
function miillerTest(d, n){
    // (JML- all literal integers converted to use n suffix denoting BigInt)
    
    // Pick a random number in [2..n-2]
    // Corner cases make sure that n > 4
    /* 
        JML- I can't mix the Number returned by Math.random with
        operations involving BigInt. The workaround is to create a random integer 
        with precision 6 and convert it to a BigInt.
    */  
    const r = BigInt(Math.floor(Math.random() * 100_000))
    // JML- now I have to divide by the multiplier used above (BigInt version)
    const y = r*(n-2n)/100_000n
    let a = 2n + y % (n - 4n);

    // Compute a^d % n
    let x = power(a, d, n);

    if (x == 1n || x == n-1n)
        return true;

    // Keep squaring x while one
    // of the following doesn't
    // happen
    // (i) d does not reach n-1
    // (ii) (x^2) % n is not 1
    // (iii) (x^2) % n is not n-1
    while (d != n-1n){
        x = (x * x) % n;
        d *= 2n;

        if (x == 1n)    
            return false;
        if (x == n-1n)
            return true;
    }

    // Return composite
    return false;
}

// It returns false if n is composite and returns true if n is probably prime. k is an
// input parameter that determines accuracy level. Higher value of k indicates more accuracy.
function isPrime(n, k=10)
{
    // (JML- all literal integers converted to use n suffix denoting BigInt)
    // Corner cases
    if (n <= 1n || n == 4n) return false;
    if (n <= 3n) return true;

    // Find r such that n =
    // 2^d * r + 1 for some r >= 1
    let d = n - 1n;
    while (d % 2n == 0n)
        d /= 2n;

    // Iterate given nber of 'k' times
    for (let i = 0; i < k; i++)
        if (!miillerTest(d, n))
            return false;

    return true;
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
            
            if (isPrime(BigInt(num))) // Caso o número seja palindromo e primo, retorna o número, caso contrário, retorna undefined
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
let start = 100000000
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