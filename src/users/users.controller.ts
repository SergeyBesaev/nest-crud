import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common'
import {UsersService} from './users.service'
import {User} from './users.model'

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) {
    }

    @Post()
    create(@Body() user: User) {
        return this.service.save(user)
    }

    @Get()
    getAllUsers() {
        return this.service.getAllUsers()
    }

    @Get(':email')
    getUserByEmail(@Param('email') email: string) {
        return this.service.getUserByEmail(email)
    }

    @Put(':email')
    update(@Body() user: User, @Param('email') email: string) {
        return this.service.update(email, user)
    }

    @Delete(':email')
    delete(@Param('email') email: string) {
        return this.service.delete(email)
    }
}
