import {Model, Table} from 'sequelize-typescript'

@Table({tableName: 'roles'})
export class Role extends Model<Role> {

}
