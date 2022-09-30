import { Permutation } from 'js-combinatorics'

import fs from 'fs'
import { stringify } from 'querystring'

const DNPI = 21

let contador = 0

const vPrimo = (num) => { // Função que verifica se o número é primo
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false
    return true
}

let it = new Permutation('0123456789')

for (let element of it) {

    contador++

    let num = ''

    let numr = ''

    let numCopy = ''

    const arrayNum = []

    if (element[0] % 2 == 0) continue

    for (let n of element) {
        num += n
    }

    for (let i = 9; i >= 0; i--) {
        numr += num[i]
    }

    numCopy = num
    for (let j = 0; j <= 9; j++) {

        num = numCopy
        num += j

        arrayNum.push(num)
    }

    const numPI = []
    for (let num of arrayNum) {
        numCopy = num
        num = numCopy

        num += numr

        if (vPrimo(num)) {

            try {

                let numString = ''
            
                numString = `${num}\n`
            
                fs.appendFile('palindromos.txt', numString, err => {
                    if (err) throw err
                })
            
            } catch (err) {
                console.log(err)
            }
        
        } else {
            console.clear()
            console.log(contador)
        }

    }

    if (fs.existsSync('palindromos.txt'))
        break
}


