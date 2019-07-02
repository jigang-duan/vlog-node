import { provide, inject } from 'midway';
import {
  IFoodService,
  IFoodResult,
  IFoodListOptions,
  IFoodListResult,
  IFoodCreateOptions,
  IFoodItemAddOptions,
  IFoodCommentAddOptions,
} from '../../interface';
import { IFoodModel } from '../model/food';
import { IFoodItemModel } from '../model/food_item';
import { ICommentModel } from '../model/comment';

@provide()
export class FoodService implements IFoodService {

  @inject()
  FoodModel: IFoodModel;

  @inject()
  FoodItemModel: IFoodItemModel;

  @inject()
  CommentModel: ICommentModel;

  async create(options: IFoodCreateOptions): Promise<number> {
    const post = await this.FoodModel.create(options);
    return post.id;
  }

  async shard(id: number): Promise<boolean> {
    const shardResult = await this.FoodModel
    .scope('avaliable')
    .update(
      { isShared: true },
      { where: { id } },
    );
    return shardResult[0] > 0;
  }

  async addItem(id: number, options: IFoodItemAddOptions): Promise<number> {
    const food = await this.FoodModel
      .scope('avaliable')
      .findByPrimary(id);
    const item = this.FoodItemModel.build(options);
    await item.save();
    await food.$add('items', item);
    return item.id;
  }

  async removeItem(id: number, itemId: number): Promise<boolean> {
    const food = await this.FoodModel
      .scope('avaliable')
      .findByPrimary(id);
    await food.$remove('items', itemId)
    const softDeleteResult = await this.FoodItemModel
      .scope('avaliable')
      .update(
        { status: 0 },
        { where: { id: itemId } },
      );

    // affected rows should greater than 0
    return softDeleteResult[0] > 0;
  }

  async addComment(id: number, options: IFoodCommentAddOptions): Promise<number> {
    const food = await this.FoodModel
      .scope('avaliable')
      .findByPrimary(id);
    const comment = this.CommentModel.build(options);
    await comment.save();
    await food.$add('comments', comment);
    return comment.id;
  }

  async removeComment(id: number, commentId: number): Promise<boolean> {
    const food = await this.FoodModel
      .scope('avaliable')
      .findByPrimary(id);
    await food.$remove('comments', commentId)
    const softDeleteResult = await this.CommentModel
      .scope('avaliable')
      .update(
        { status: 0 },
        { where: { id: commentId } },
      );

    // affected rows should greater than 0
    return softDeleteResult[0] > 0;
  }

  async find(id: number): Promise<IFoodResult> {
    return this.FoodModel
    .scope('avaliable')
    .findByPrimary(id);
  }

  async list(options: IFoodListOptions): Promise<IFoodListResult> {
    let where = {}
    const { authorId, categoryId, isShared } = options;
    if (authorId !== undefined) {
      where['authorId'] = authorId
    }
    if (categoryId) {
      where['categoryId'] = categoryId
    }
    if (isShared !== undefined) {
      where['isShared'] = isShared ? 1 : 0
    }
    const result = await this.FoodModel
      .scope('avaliable')
      .findAndCountAll({
        limit: options.limit,
        offset: options.offset,
        where: where
      });

    return {
      list: result.rows,
      offset: options.offset,
      count: result.rows.length,
      total: result.count,
    };
  }
}
