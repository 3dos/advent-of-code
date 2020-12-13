import { join } from 'path'
import
    { add
    , compose
    , equals
    , filter
    , intersection
    , length
    , map
    , not
    , pipe
    , reduce
    , split
    , uniq
    } from 'ramda'

import { getInput } from '../helpers'

const input = getInput(join(__dirname, './input.txt'))

const groups = split('\n\n')(input)

// Part 1
const countUniq =
    pipe(
        split(''),
        filter(
            compose(not, equals('\n'))
        ),
        uniq,
        length
    )

// Part 2
const countUnan =
    pipe(
        split('\n'),
        map(split('')),
        xs => xs.reduce(intersection),
        length
    )

const countAllBy = (f: (g: string) => number) =>
    pipe(
        map(f),
        reduce(add, 0)
    )

console.log('all unique answers', countAllBy(countUniq)(groups))
console.log('all unanimous answers', countAllBy(countUnan)(groups))
