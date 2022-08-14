import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript'
import {Role} from '../roles/roles.model'
import {UserRoles} from '../roles/user.roles.model'

@Table({tableName: 'users'})
export class User extends Model<User> {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    email: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

}
