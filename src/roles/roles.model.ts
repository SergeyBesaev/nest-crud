import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript'
import {User} from '../users/users.model'
import {UserRoles} from './user.roles.model'

export interface ResponseRole {
    name: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, ResponseRole> {

    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string

    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}
