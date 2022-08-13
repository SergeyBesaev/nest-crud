import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {UsersModule} from '../users/users.module'
import {SequelizeModule} from '@nestjs/sequelize'
import {RefreshTokenDto} from './dto/refresh.token.dto'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      SequelizeModule.forFeature([RefreshTokenDto]),
      UsersModule
  ]
})
export class AuthModule {}
