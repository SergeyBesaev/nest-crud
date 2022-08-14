import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {UsersModule} from '../users/users.module'
import {SequelizeModule} from '@nestjs/sequelize'
import {RefreshTokenDto} from './dto/refresh.token.dto'
import {JwtModule} from '@nestjs/jwt'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      SequelizeModule.forFeature([RefreshTokenDto]),
      JwtModule.register({
          secret: process.env.ACCESS_TOKEN_KEY || 'secret',
          signOptions: {
            expiresIn: '24h'
          }
      }),
      UsersModule
  ]
})
export class AuthModule {}
