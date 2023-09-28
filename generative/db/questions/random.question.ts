import { nasty } from './nasty.question'
import { normal } from './normal.question'
import { relationship } from './relationship.question'

const random = {
    nasty,
    normal,
    relationship
}

const all = [...normal, ...relationship, ...nasty]

export { random as randomQuestions, all as allQuestions }