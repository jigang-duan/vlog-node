import { DataType, Table, Model, Column, CreatedAt, UpdatedAt, Scopes } from 'sequelize-typescript';
import { providerWrapper } from 'midway';

const {STRING, INTEGER} = DataType;

export const factory = () => UserModel;
providerWrapper([
  {
    id: 'UserModel',
    provider: factory,
  },
]);

export type IUserModel = typeof UserModel;

@Scopes({
  // a self-defined scope means "non-soft-deleted rows"
  avaliable: {
    where: {status: 1},
  },
})
@Table({
  // you can claim your tableName explicitly
  freezeTableName: true,
  tableName: 'vlog_users',
})
export class UserModel extends Model<UserModel> {
  @Column({
    type: STRING(255),
    primaryKey: true,
    comment: 'user id -> openid',
  })
  id: string;

  @Column({
    type: STRING(1024),
    field: 'avatar_url',
    comment: '头像URL',
  })
  avatarUrl: string;

  @Column({
    type: STRING(255),
    field: 'nick_name',
    comment: '昵称',
  })
  nickName: string;

  @Column({
    type: INTEGER(255),
    comment: '性别',
  })
  gender: number;

  @Column({
    type: STRING(32),
    comment: '语言',
  })
  language: string;

  @Column({
    type: INTEGER(255),
    comment: '国家',
  })
  country: string;

  @Column({
    type: INTEGER(255),
    comment: '城市',
  })
  city: string;

  @Column({
    type: INTEGER(255),
    comment: '省',
  })
  province: string;

  @Column({
    type: INTEGER(11),
    allowNull: false,
    defaultValue: 1,
    comment: 'soft delete status', // 0-deleted 1-normal
  })
  status: number;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdTime: Date;

  @UpdatedAt
  @Column({ field: 'modified_at' })
  modifiedTime: Date;
}
