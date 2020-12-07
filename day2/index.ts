import { join } from 'path'
import { compose, filter, lensIndex, map, over, pipe, split, trim } from 'ramda'

import { getInput, toInt10 } from '../helpers'

const input = getInput(join(__dirname, './input.txt'))

const headLens = lensIndex(0)

const parseRules = (s: string) => {
    const [minMax, char] = split(' ')(s)
    const [min, max] = compose(
        map(toInt10),
        split('-')
    )(minMax)
    return { char, max, min }
}

const parsedInput =
    pipe(
        split('\n'),
        map(
            pipe(
                split(':'),
                map(trim),
                over(headLens, parseRules)
            )
        )
    )(input) as [ReturnType<typeof parseRules>, string][]

// Part 1
const validPasswords =
    filter(
        ([{ char, max, min }, password]) => {
            const occurrences = password.split(char).length - 1
            return occurrences >= min && occurrences <= max
        }
    )(parsedInput)

// Part 2
const officialValidPasswords =
    filter(
        ([{ char, max, min }, password]) =>
            (password.charAt(max - 1) == char) !=
            (password.charAt(min - 1) == char)
    )(parsedInput)

console.log('valid passwords count', validPasswords.length)
console.log('official valid passwords count', officialValidPasswords.length)