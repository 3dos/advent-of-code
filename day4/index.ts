import { join } from 'path'
import
    { and
    , chain
    , contains
    , converge
    , filter
    , head
    , map
    , mergeAll
    , pipe
    , propSatisfies
    , split
    } from 'ramda'

import { getInput } from '../helpers'

const input = getInput(join(__dirname, './input.txt'))

const passports =
    pipe(
        split('\n\n'),
        map(
            pipe(
                split(' '),
                chain(split('\n')),
                map(split(':'))
            )
        )
    )(input)

const allTrue = (...tests: boolean[]) => tests.reduce(and, true)

// Part 1
const isValidPassport =
    pipe(
        map(head),
        converge(
            allTrue,
            [ contains('byr')
            , contains('iyr')
            , contains('eyr')
            , contains('hgt')
            , contains('hcl')
            , contains('ecl')
            , contains('pid')
            ]
        ),
    )

const between =
    (min: number, max: number) => (s: string) => {
        const x = parseInt(s, 10)
        return x >= min && x <= max
    }

const isHeightValid = (h = '') => {
    const [, heightInCm] = h.match(/(\d+)cm$/) ?? []
    const [, heightInIn] = h.match(/(\d+)in$/) ?? []

    return (
        between(150, 193)(heightInCm) ||
        between(59, 76)(heightInIn)
    )
}

const isHairColorValid = (s = '') => !!s.match(/^#[0-9a-f]{6}$/)

const isEyeColorValid =
    (s = '') => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(s)

const isPidValid = (s = '') => !!s.match(/^\d{9}$/)

// Part 2
const isValidPassportStrict =
    pipe(
        map<string[], Record<string, string | undefined>>(
            ([k, v]) => ({ [k]: v })
        ),
        mergeAll,
        converge(
            allTrue,
            [ propSatisfies(between(1920, 2002), 'byr')
            , propSatisfies(between(2010, 2020), 'iyr')
            , propSatisfies(between(2020, 2030), 'eyr')
            , propSatisfies(isHeightValid, 'hgt')
            , propSatisfies(isHairColorValid, 'hcl')
            , propSatisfies(isEyeColorValid, 'ecl')
            , propSatisfies(isPidValid, 'pid')
            ]
        )
    )

console.log(
    'valid passports amount',
    filter(isValidPassport)(passports).length
)
console.log(
    'valid strict passports amount',
    filter(isValidPassportStrict)(passports).length
)