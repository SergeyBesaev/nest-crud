import {Body, Controller, Get, Param, Post} from '@nestjs/common'
import {RolesService} from './roles.service'
import {Role} from './roles.model'

@Controller('roles')
export class RolesController {

    constructor(private service: RolesService) {
    }

    @Post()
    create(@Body() role: Role) {
        return this.service.create(role)
    }

    @Get(':role')
    getRole(@Param('role') role: string) {
        return this.service.getRoleByName(role)
    }

}
