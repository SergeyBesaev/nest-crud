import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {User} from '../users/users.model'
import {UsersService} from '../users/users.service'
import {hashPassword} from '../utils/util'
import {JwtService} from '@nestjs/jwt'
import {InjectModel} from '@nestjs/sequelize'
import {RefreshTokenDto} from './dto/refresh.token.dto'
import {v4} from 'uuid'

const DELIMETER = '::'

@Injectable()
export class AuthService {

    constructor(@InjectModel(RefreshTokenDto) private refreshTokenRepo: typeof RefreshTokenDto,
        private userService: UsersService,
        private jwtService: JwtService) {
    }

    async register(user: User) {
        const candidate = await this.userService.getUserByEmail(user.email)

        if (candidate) {
            throw new HttpException(`User with email ${user.email} already exist`, HttpStatus.CONFLICT)
        }

        const salt: string = v4()
        user.password = hashPassword(user.password, salt)

        const savedUser = await this.userService.save(user)

        return this.createUserData(savedUser)
    }

    async login(user: User) {
        const candidate = await this.userService.getUserByEmail(user.email)

        if (!candidate) {
            throw new HttpException(`User with email ${user.email} not found`, HttpStatus.BAD_REQUEST)
        }

        if (!this.checkPassword(user.password, candidate.password)) {
            throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST)
        }

        return this.createUserData(candidate)
    }

    private createUserData(user: User) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            accessToken: this.generateAccessToken(user),
        }
    }

    private checkPassword(interredPassword: string, passwordFromDb: string): boolean {
        const salt = passwordFromDb.split(DELIMETER)[1]
        return hashPassword(interredPassword, salt) === passwordFromDb
    }

    private generateAccessToken(user: User): string {
        const payload = {
            id: user.id,
            roles: user.roles
        }

        return this.jwtService.sign(payload)
    }

}
