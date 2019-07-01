import { DataType, Table, Model, Column, HasMany, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, Scopes } from 'sequelize-typescript';
import { providerWrapper } from 'midway';
import { FoodItemModel } from './food_item';
import { CommentModel } from './comment';
import { CategoryModel } from './category';
import { UserModel } from './user';

const {STRING, INTEGER, BIGINT, TINYINT} = DataType;

export const factory = () => FoodModel;
providerWrapper([
  {
    id: 'FoodModel',
    provider: factory,
  },
]);

export type IFoodModel = typeof FoodModel;

@Scopes({
  // a self-defined scope means "non-soft-deleted rows"
  avaliable: {
    where: {status: 1},
    include: [
      {
        // note as with the @BelongsTo Column name
        as: "category",
        model: () => CategoryModel,
      },
      {
        // note as with the @BelongsTo Column name
        as: "author",
        model: () => UserModel,
      },
      {
        // note as with the @BelongsTo Column name
        as: "items",
        model: () => FoodItemModel,
      },
      {
        // note as with the @BelongsTo Column name
        as: "comments",
        model: () => CommentModel,
      },
    ]
  }
})
@Table({
  // you can claim your tableName explicitly
  freezeTableName: true,
  tableName: 'vlog_foods',
})
export class FoodModel extends Model<FoodModel> {
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

  @ForeignKey(() => CategoryModel)
  @Column({
    type: BIGINT(20),
    field: 'category_id',
    allowNull: false,
  })
  categoryId: number;

  @BelongsTo(() => CategoryModel)
  category: CategoryModel;

  @Column({
    type: STRING(32),
    comment: '类型: theme & video',
  })
  type: string;

  @Column({
    type: STRING(32),
    comment: 'tag 主题 & 视频',
  })
  tag: string;

  @Column({
    type: STRING(1024),
    field: 'image_url',
    comment: '图片URL',
  })
  imageUrl: string;

  @Column({
    type: STRING(255),
    comment: '标题',
  })
  title: string;

  @Column({
    type: STRING(1024),
    comment: '描述',
  })
  desc: string;

  @Column({
    type: TINYINT(1),
    field: 'is_shared',
    comment: '分享',
  })
  isShared: boolean;

  @HasMany(() => FoodItemModel,'food_id')
  items: FoodItemModel[];

  @HasMany(() => CommentModel,'food_id')
  comments: CommentModel[];

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
