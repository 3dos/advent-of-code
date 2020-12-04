import { join } from 'path'
import { apply, converge, map, multiply, pipe, split } from 'ramda'

import { getInput } from '../helpers'

const input = getInput(join(__dirname, './input.txt'))

const matrix = pipe(
    split('\n'),
    map(split(''))
)(input)

// Part 1
const countTrees =
    (right: number, down: number) => (matrix: string[][]) => {
        const height = matrix.length
        const width = matrix[0].length
        let downPos = 0
        let rightPos = 0
        let count = 0

        while (downPos < height) {
            count += matrix[downPos][rightPos % width] == '#' ? 1 : 0

            // On to the next position
            downPos += down
            rightPos += right
        }

        return count
    }

// Part 2
const multiplySlopes =
    converge(
        (...counts) => counts.reduce(multiply),
        [ countTrees(1, 1)
        , countTrees(3, 1)
        , countTrees(5, 1)
        , countTrees(7, 1)
        , countTrees(1, 2)
        ]
    )

console.log('found trees', countTrees(3, 1)(matrix))
console.log('multiplied slopes', multiplySlopes(matrix))