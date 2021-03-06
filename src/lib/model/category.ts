import { DataType, Table, Model, Column, CreatedAt, UpdatedAt, Scopes } from 'sequelize-typescript';
import { providerWrapper } from 'midway';

const {STRING, INTEGER, BIGINT} = DataType;

export const factory = () => CategoryModel;
providerWrapper([
  {
    id: 'CategoryModel',
    provider: factory,
  },
]);

export type ICategoryModel = typeof CategoryModel;

@Scopes({
  // a self-defined scope means "non-soft-deleted rows"
  avaliable: {
    where: {status: 1},
  },
})
@Table({
  // you can claim your tableName explicitly
  freezeTableName: true,
  tableName: 'vlog_categories',
})
export class CategoryModel extends Model<CategoryModel> {
  @Column({
    type: BIGINT(20),
    primaryKey: true,
    autoIncrement: true,
    comment: '分类ID',
  })
  id: number;

  @Column({
    type: STRING(255),
    field: 'user_id',
    comment: '关联的用户ID',
  })
  userId: string;

  @Column({
    type: STRING(64),
    allowNull: false,
    comment: '分类标题',
  })
  title: string;

  @Column({
    type: STRING(1024),
    allowNull: true,
    comment: '分类描述',
  })
  desc: string;

  @Column({
    type: STRING(1024),
    field: 'icon_url',
    allowNull: true,
    comment: '分类Icon',
  })
  iconUrl: string;

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
