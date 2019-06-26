import { controller, get, provide, inject } from 'midway';
import { ICategoryService } from '../../interface';

@provide()
@controller('/categories')
export class CategoryController {
  @inject()
  categoryService: ICategoryService;

  @get('/')
  async index(ctx) {
    ctx.body = await this.categoryService.list();
  }
}
