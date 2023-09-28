import { QuestionType } from '../type'
import {
    randomQuestions, allQuestions
} from '../db/questions/random.question'

const selectQuestion = (questionType: QuestionType): string[] => {
    switch (questionType) {
        case 'nasty':
            return randomQuestions.nasty
        case 'normal':
            return randomQuestions.normal
        case 'relationship':
            return randomQuestions.relationship
        case 'all':
            return allQuestions
        default:
            return []
    }
}

export default selectQuestion