import { provide, inject } from 'midway';
import {
  ICategoryService,
  ICategoryListResult,
  ICategoryCreateOptions,
} from '../../interface';
import { ICategoryModel } from '../model/category';

@provide()
export class CategoryService implements ICategoryService {

  @inject()
  CategoryModel: ICategoryModel;

  async list(userId?: string): Promise<ICategoryListResult> {
    const result = await this.CategoryModel
    .scope('avaliable')
    .findAndCountAll({
      where: {
        userId
      }
    });

    return {
      categoryList: result.rows,
      totalCount: result.count,
    };
  }

  async create(options: ICategoryCreateOptions): Promise<number> {
    const post = await this.CategoryModel.create(options);
    return post.id;
  }

  async softDelete(id: number): Promise<boolean> {
    const softDeleteResult = await this.CategoryModel
    .scope('avaliable')
    .update(
      { status: 0 },
      { where: { id } },
    );

    // affected rows should greater than 0
    return softDeleteResult[0] > 0;
  }

}
