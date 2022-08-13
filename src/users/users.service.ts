import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {User} from './users.model'
import {Role} from '../roles/roles.model'
import {RolesService} from '../roles/roles.service'

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepo: typeof User,
        private roleService: RolesService) {
    }

    async save(user: User): Promise<User> {
        const userFromDB: User = await this.userRepo.create(user)

        const role: Role = await this.roleService.getRoleByName('User')

        await userFromDB.$set('roles', [role.id])

        return userFromDB
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepo.findAll( {include: [{ model: Role, attributes: ['name']}]})
    }

    async getUserByEmail(email: string) {
        const user: User =  await this.userRepo.findOne({where: {email: email}, include: [{ model: Role, attributes: ['name']}]})

        if (!user) {
            throw new HttpException(`User with email ${email} not found`, HttpStatus.BAD_REQUEST)
        }

        return user
    }

    async update(email: string, user: User) {
        return await this.userRepo.update(user, {where: {email: email}})
    }

    async delete(email: string) {
        await this.userRepo.destroy({where: {email: email}})
        return await this.getAllUsers()
    }
}
