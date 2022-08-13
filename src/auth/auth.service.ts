import {Injectable} from '@nestjs/common'
import {User} from '../users/users.model'
import {UsersService} from '../users/users.service'
import {hashPassword} from '../utils/util'
import {uuid} from 'uuidv4'
import jwt from 'jsonwebtoken'
import {InjectModel} from '@nestjs/sequelize'
import {RefreshTokenDto} from './dto/refresh.token.dto'
import {where} from 'sequelize'

@Injectable()
export class AuthService {

    constructor(@InjectModel(RefreshTokenDto) private refreshTokenRepo: typeof RefreshTokenDto,
        private userService: UsersService) {
    }

    async register(user: User) {
        const candidate = await this.userService.getUserByEmail(user.email)

        if (candidate) {
            throw Error(`User with email ${user.email} already exist`)
        }

        const salt = uuid()
        user.password = hashPassword(user.password, salt)

        const savedUser = await this.userService.save(user)

        const userData = this.createUserData(savedUser)

        await this.saveRefreshToken(savedUser.id, userData.refreshToken)

        return userData

    }

    async login(user: User) {
        const candidate = await this.userService.getUserByEmail(user.email)

        const userData = this.createUserData(candidate)

        await this.saveRefreshToken(candidate.id, userData.refreshToken)

        return userData

    }

    private createUserData(user: User) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshToken(user)
        }
    }

    private generateAccessToken(user: User): string {
        const payload = {
            id: user.id,
            roles: user.roles
        }

        return jwt.sign(payload, '', {expiresIn: '24h'})
    }

    private generateRefreshToken(user: User): string {
        const payload = {
            id: user.id,
            roles: user.roles
        }

        return jwt.sign(payload, '', {expiresIn: '30d'})
    }

    private async saveRefreshToken(userId: number, token: string): Promise<void> {
        const expectedToken = await this.refreshTokenRepo.findOne({where: {userId: userId}})

        if (expectedToken) {
            await this.refreshTokenRepo.update({userId: userId, refreshToken: token}, {where: {userId: userId}})
        } else {
            await this.refreshTokenRepo.create({userId: userId, refreshToken: token})
        }
    }

}
