import { DataType, Table, Model, Column, CreatedAt, UpdatedAt, Scopes } from 'sequelize-typescript';
import { providerWrapper } from 'midway';

const {STRING, INTEGER, BIGINT} = DataType;

export const factory = () => TrophyModel;
providerWrapper([
  {
    id: 'TrophyModel',
    provider: factory,
  },
]);

export type ITrophyModel = typeof TrophyModel;

@Scopes({
  // a self-defined scope means "non-soft-deleted rows"
  avaliable: {
    where: {status: 1},
  },
})
@Table({
  // you can claim your tableName explicitly
  freezeTableName: true,
  tableName: 'vlog_trophies',
})
export class TrophyModel extends Model<TrophyModel> {
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
    comment: '用户ID',
  })
  userId: string;

  @Column({
    type: STRING(32),
    comment: '类型: favor & collect & follow',
  })
  type: string;

  @Column({
    type: STRING(255),
    field: 'related_user_id',
    comment: '关联的用户ID',
  })
  relatedUserId: string;

  @Column({
    type: BIGINT(20),
    field: 'related_food_id',
    allowNull: false,
  })
  relatedFoodId: number;

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
