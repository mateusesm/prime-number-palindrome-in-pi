import fs from 'fs'

const CHUNK_SIZE = 500000000; // 500 MB    //const CHUNK_SIZE = 1000000000; // 1 GB                  
const DNPI = 21; //Números de dígitos do palíndromo.
let resp = [] //Variável resposta que armazena todos os números encontrados em um array.


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
function isPrime( n, k=10)
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


//Função para converter milissegundos em tempo(hh:mm:ss.m) 
function msToTime(duration) {  
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + " horas, " + minutes + " minutos, " + seconds + " segundos e " + milliseconds + " milissegundos. " ;
}


// Função que recebe o intervalo de casa decimais do PI e verifica se o primeiro 
//e o último dígitos são iguais e se o último dígito é par, se for, retorna o número, se não, retorna 0    
function calcPalindromo(numPI){ 
    for (let i = 0; i < numPI.length-DNPI; i++) {
        
        if (numPI[i] !== numPI[i+DNPI-1] || numPI[i+DNPI-1] % 2 == 0) continue // Se o número primeiro dígito for diferente do último dígito ou se o último dígito for par, continue
        
        let num = "", j = 0, numr = ""
    
        while (numPI[i+j] === numPI[DNPI-1+i-j] && j < Math.trunc(DNPI/2)){ // Verifica se os DNPI/2 primeiros dígitos são iguais aos DNPI/2 últimos. 
            num += numPI[i+j];
            numr = numPI[i+j] + numr;
            j++;
        }
        
        if (j === Math.trunc(DNPI/2)){ // Caso o número seja palindromo entra na condição
            
            if (DNPI % 2 === 0) //Se o número de dígitos for par.
                num =  num+numr;
            else
                num =  num+numPI[i+j]+numr;   //Se o número de dígitos for ímpar.
            
            if (isPrime(BigInt(num))) return num;// Caso o número seja primo, retorna o número.
                
        }        
    }
    return 0;
}


//Fatia o arquivo em bytes [início, fim e tamanho da fatia em bytes do arquivo]: ini, fim, chunk
async function buscarPalindromo(ini,fim){ 
    const stream = fs.createReadStream('/Volumes/CLAYTON/pi_dec_1t_03.txt', { start: ini, end: fim, highWaterMark: CHUNK_SIZE });
    //const stream = fs.createReadStream('./pi_teste_21.txt', { start: ini, end: fim, highWaterMark: CHUNK_SIZE });
    
    let ret = 0;

    for await(const data of stream) { //data é a fatia do arquivo (as casas decimais)
      ret = calcPalindromo(data.toString());
      if(ret === 0) continue
      
      resp.push([ini,ret]) //quando encontrar algum número, adiciona no array resp e finaliza a busca.
      break
    }
}


//Função que divide as buscas paralelas no arquivo grande. A divisão é em bytes [início, fim e quantidade de bytes]
async function div_busca_arq() { 
  await buscarPalindromo(CHUNK_SIZE*0,CHUNK_SIZE*1)
  for (let it = 1; it < 202; it++) //200 * CHUNK_SIZE busca em arquivos de ~ 2 GB. ~ 100 GB
      await buscarPalindromo(CHUNK_SIZE*it - DNPI,CHUNK_SIZE*(it+1))
}


// Função principal
async function main() { 
    console.log(`Executando...Aguarde!`);
    const inicio = Date.now();
    await div_busca_arq();
    const fim = Date.now();
    
    console.log(resp);
    /*if (!resp.some((x) => x != null))
         console.log("=============================\nNenhum número encontrado! :-0");
    else
         console.log("=============================\nNúmero mágico:", resp.sort(function(a,b) { if (a != null && b != null) return a[0] - b[0];})[0][1]); //Ordena e mostra apenas o primeiro número.
   */
   console.log("=============================\nTempo de processamento: "+msToTime(fim - inicio));
}

main();