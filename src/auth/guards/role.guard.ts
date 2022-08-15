import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import {Reflector} from '@nestjs/core'
import {JwtService} from '@nestjs/jwt'
import {Observable} from 'rxjs'
import {ROLES_KEY} from './role.decorator'

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private jwtService: JwtService,
        private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])

            if(!requiredRoles) {
                return true
            }

            const req = context.switchToHttp().getRequest()
            const authHeader = req.headers.authorization
            const [bearer, token] = authHeader.split(' ')

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            const user = this.jwtService.verify(token)
            req.user = user
            return user.roles.some(role => requiredRoles.includes(role.name))

        } catch (e) {
            console.log(e)
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
        }
    }

}
