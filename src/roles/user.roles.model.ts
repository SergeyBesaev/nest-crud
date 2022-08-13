import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript'
import {User} from '../users/users.model'
import {Role} from './roles.model'

@Table({tableName: 'users_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, field: 'user_id'})
    userId: number

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, field: 'roles_id'})
    rolesId: number
}
