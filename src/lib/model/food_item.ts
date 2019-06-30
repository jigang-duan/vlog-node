import { DataType, Table, Model, Column, ForeignKey, CreatedAt, UpdatedAt, Scopes } from 'sequelize-typescript';
import { providerWrapper } from 'midway';
import { FoodModel } from './food';

const {STRING, INTEGER, BIGINT} = DataType;

export const factory = () => FoodItemModel;
providerWrapper([
  {
    id: 'FoodItemModel',
    provider: factory,
  },
]);

export type IFoodItemModel = typeof FoodItemModel;

@Scopes({
  // a self-defined scope means "non-soft-deleted rows"
  avaliable: {
    where: {status: 1},
  },
})
@Table({
  // you can claim your tableName explicitly
  freezeTableName: true,
  tableName: 'vlog_food_items',
})
export class FoodItemModel extends Model<FoodItemModel> {
  @Column({
    type: BIGINT(20),
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: STRING(32),
    allowNull: false,
  })
  type: string;

  @Column({
    type: STRING(64),
    allowNull: false,
    comment: '标题',
  })
  title: string;

  @Column({
    type: STRING(1024),
    allowNull: true,
    comment: '描述',
  })
  desc: string;

  @Column({
    type: STRING(1024),
    field: 'image_url',
    allowNull: true,
  })
  imageUrl: string;

  @Column({
    type: STRING(64),
    allowNull: true,
  })
  vid: string;

  @Column({
    type: STRING(1024),
    field: 'video_url',
    allowNull: true,
  })
  videoUrl: string;

  @ForeignKey(() => FoodModel)
  @Column({
    type: BIGINT(20),
    field: 'food_id',
    allowNull: true,
  })
  foodId: number;

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
