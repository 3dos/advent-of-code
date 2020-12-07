import { join } from 'path'
import { last, map, pipe, sort, split } from 'ramda'

import { getInput } from '../helpers'

const input = getInput(join(__dirname, './input.txt'))

const seats = split('\n')(input)

// Part 1
const parseSeat:
    (seat: string) => [number, number] =
    seat => {
        const rowRange = [0, 127]
        const colRange = [0, 7]
        for (let i = 0; i < 10; i++) {
            const rowHalf = Math.pow(2, 6 - i)
            const colHalf = Math.pow(2, 9 - i)
            switch (seat[i]) {
                case 'F':
                    rowRange[1] -= rowHalf
                    break
                case 'B':
                    rowRange[0] += rowHalf
                    break
                case 'L':
                    colRange[1] -= colHalf
                    break
                case 'R':
                    colRange[0] += colHalf
                    break
            }
        }

        return [rowRange[0], colRange[0]]
    }

const seatToId:
    (seat: [number, number]) => number =
    ([row, col]) => row * 8 + col

const highestSeatId =
    pipe(
        map(parseSeat),
        map(seatToId),
        sort((a, b) => a - b),
        last
    )(seats)

// Part 2
const seatIds =
    pipe(
        map(parseSeat),
        map(seatToId),
        sort((a, b) => a - b)
    )(seats)

const mySeatId =
    (seatIds.find((id, i) => i > 0 && id > seatIds[i - 1] + 1) ?? 0) - 1

console.log('highest seat id', highestSeatId)
console.log('my seat id', mySeatId)