import {Column, DataType, Model, Table} from 'sequelize-typescript'

@Table({tableName: 'refresh_tokens', createdAt: false, updatedAt: false})
export class RefreshTokenDto extends Model<RefreshTokenDto> {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.INTEGER, field: 'user_id'})
    userId: number

    @Column({type: DataType.STRING, field: 'refresh_token'})
    refreshToken: string

}
