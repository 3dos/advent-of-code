import { readFileSync } from 'fs'

export const getInput =
    (path: string) => readFileSync(path, { encoding: 'utf8' })
