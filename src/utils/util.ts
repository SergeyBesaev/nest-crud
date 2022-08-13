import crypto from 'crypto'

const DELIMETER = '::'

export function hashPassword(password: string, salt: string): string {
    const input = `${password}${DELIMETER}${salt}`
    const sha = crypto.createHash('sha256')
    sha.update(input)
    return sha.digest('hex')
}
