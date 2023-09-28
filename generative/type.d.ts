export type QuestionType = ('nasty' | 'relationship' | 'normal') | string

export type LevelType = ('message' | 'poll' | 'overall') | string

export interface Level {
    id: number,
    name: string
    pointRange: number[]
}