import { Injectable } from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {Role} from './roles.model'

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepo: typeof Role) {
    }

    async create(role: Role): Promise<Role> {
        return this.roleRepo.create(role)
    }

    async getRoleByName(roleName: string): Promise<Role> {
        return this.roleRepo.findOne({where: {name: roleName}})
    }
}
