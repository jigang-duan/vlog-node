import { DataType, Table, Model, Column, ForeignKey, CreatedAt, UpdatedAt, Scopes, BelongsTo } from 'sequelize-typescript';
import { providerWrapper } from 'midway';
import { FoodModel } from './food';
import { UserModel } from './user';

const {STRING, INTEGER, BIGINT} = DataType;

export const factory = () => CommentModel;
providerWrapper([
  {
    id: 'CommentModel',
    provider: factory,
  },
]);

export type ICommentModel = typeof CommentModel;

@Scopes({
  // a self-defined scope means "non-soft-deleted rows"
  avaliable: {
    where: {status: 1},
    include: [
      {
        // note as with the @BelongsTo Column name
        as: "author",
        model: () => UserModel,
      },
    ]
  },
})
@Table({
  // you can claim your tableName explicitly
  freezeTableName: true,
  tableName: 'vlog_food_comments',
})
export class CommentModel extends Model<CommentModel> {
  @Column({
    type: BIGINT(20),
    primaryKey: true,
    autoIncrement: true,
    comment: '分类ID',
  })
  id: number;

  @ForeignKey(() => UserModel)
  @Column({
    type: STRING(255),
    allowNull: false,
    field: 'author_id',
    comment: '关联的用户ID',
  })
  authorId: string;

  @BelongsTo(() => UserModel)
  author: UserModel;

  @ForeignKey(() => FoodModel)
  @Column({
    type: BIGINT(20),
    field: 'food_id',
    allowNull: true,
  })
  foodId: number;

  @Column({
    type: STRING(1024),
    allowNull: true,
  })
  content: string;

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
