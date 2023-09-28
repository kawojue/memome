import { Level } from '../type'

const calculateLevel = (levels: Level[], point: number): string => {
    for (const level of levels) {
        if (point >= level.pointRange[0] && point <= level.pointRange[1]) {
            return level.name
        }
    }
    return 'Unknown level.'
}

export default calculateLevel