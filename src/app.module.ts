import {Module} from '@nestjs/common'
import {SequelizeModule} from '@nestjs/sequelize'
import {ConfigModule} from '@nestjs/config'
import {UsersModule} from './users/users.module'
import {RolesModule} from './roles/roles.module'
import {User} from './users/users.model'
import {Role} from './roles/roles.model'
import {UserRoles} from './roles/user.roles.model'
import {AuthModule} from './auth/auth.module'
import {RefreshTokenDto} from './auth/dto/refresh.token.dto'

@Module({
    imports: [
        ConfigModule.forRoot({
           envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            autoLoadModels: true,
            models: [User, Role, UserRoles, RefreshTokenDto]
        }),
        UsersModule,
        RolesModule,
        AuthModule
    ],
    exports: []
})
export class AppModule {

}
