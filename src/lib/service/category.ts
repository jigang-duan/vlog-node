import { provide, inject } from 'midway';
import {
  ICategoryService,
  ICategoryListResult,
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

}
