import { join } from 'path'
import { map, pipe, sort, split } from 'ramda'

import { getInput, toInt10 } from '../helpers'

const input = getInput(join(__dirname, './input.txt'))

const formatedInput =
    pipe(
        split('\n'),
        map(toInt10),
        sort((a, b) => a - b)
    )(input)

// Part 1
const find2EntriesThatSumTo = (sum: number, list: number[]) => {
    let headPos = 0
    let tailPos = list.length - 1

    while (list[headPos] + list[tailPos] != sum && headPos < tailPos) {
        while(list[headPos] + list[tailPos] > sum)
            tailPos -= 1

        if (list[headPos] + list[tailPos] < sum) {
            tailPos = list.length - 1
            headPos += 1
        }
    }

    return headPos >= tailPos
        // No binom found
        ? []
        // Binom found
        : [list[headPos], list[tailPos]]
}

// Part 2
const find3EntriesThatSumTo = (sum: number, list: number[]) => {
    for (const number of list) {
        const foundBinom = find2EntriesThatSumTo(sum - number, list)
        if (foundBinom.length == 2)
            return [number, ...foundBinom]
    }
    return []
}

const binomProduct =
    find2EntriesThatSumTo(2020, formatedInput).reduce((a, b) => a * b)

const trinomProduct =
    find3EntriesThatSumTo(2020, formatedInput).reduce((a, b) => a * b)

console.log('binom product', binomProduct)
console.log('trinom product', trinomProduct)
