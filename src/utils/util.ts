import {createHash} from 'crypto'

const DELIMETER = '::'

export function hashPassword(password: string, salt: string): string {
    const input = `${password}${DELIMETER}${salt}`
    const sha = createHash('sha256')
    sha.update(input)

    return `${sha.digest('hex')}${DELIMETER}${salt}`
}
