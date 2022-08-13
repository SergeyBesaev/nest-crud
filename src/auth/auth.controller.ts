import {Body, Controller, Post} from '@nestjs/common'
import {AuthService} from './auth.service'
import {User} from '../users/users.model'

@Controller('auth')
export class AuthController {

    constructor(private service: AuthService) {}

    @Post('/register')
    register(@Body() user: User) {
        return this.service.register(user)
    }

    @Post('/login')
    login(@Body() user: User) {
        return this.service.login(user)
    }

}
