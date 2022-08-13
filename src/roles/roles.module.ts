import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import {RolesController} from './roles.controller'
import {SequelizeModule} from '@nestjs/sequelize'
import {Role} from './roles.model'
import {UserRoles} from './user.roles.model'
import {User} from '../users/users.model'

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
      SequelizeModule.forFeature([Role, User, UserRoles])
  ],
    exports: [RolesService]
})
export class RolesModule {}
