import { readFileSync } from 'fs'

export const getInput =
    (path: string) => readFileSync(path, { encoding: 'utf8' })

export const toInt10 =
    (s: string) => parseInt(s, 10)
