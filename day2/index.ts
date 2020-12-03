import { join, parse } from 'path'
import { lensIndex, pipe, map, over, split, trim, compose } from 'ramda'

import { getInput } from '../helpers'

const input = getInput(join(__dirname, './input.txt'))

const headLens = lensIndex(0)

const parseRules = (s: string) => {
    const [minMax, char] = split(' ')(s)
    const [min, max] = compose(
        map((s: string) => parseInt(s, 10)),
        split('-')
    )(minMax)
    return { char, max, min }
}

const parsedInput =
    input
        .split('\n')
        .map(
            pipe(
                split(':'),
                map(trim),
                over(headLens, parseRules)
            )
        ) as [ReturnType<typeof parseRules>, string][]

// Part 1
const validPasswords =
    parsedInput
        .filter(
            ([{ char, max, min }, password]) => {
                const occurrences = password.split(char).length - 1
                return occurrences >= min && occurrences <= max
            }
        )

// Part 2
const officialValidPasswords =
    parsedInput
        .filter(
            ([{ char, max, min }, password]) =>
                (password.charAt(max - 1) == char) !=
                (password.charAt(min - 1) == char)
        )

console.log('valid passwords count', validPasswords.length)
console.log('official valid passwords count', officialValidPasswords.length)