import { controller, get, post, provide, inject } from 'midway';
import { ICategoryService } from '../../interface';

const createRule = {
  userId: 'string',
  title: 'string',
  desc: { type: 'string', required: false },
  iconUrl: 'string'
};

@provide()
@controller('/categories', {middleware: ['errorMiddleware']})
export class CategoryController {
  @inject()
  categoryService: ICategoryService;

  @get('/')
  async index(ctx) {
    const userid = ctx.headers['x-userid']
    const result = await this.categoryService.list(userid);
    ctx.body = result.categoryList
  }

  @post('/')
  async create(ctx) {
    const userId = ctx.headers['x-userid']
    ctx.validate(createRule, {...ctx.request.body, userId });
    ctx.body = await this.categoryService.create({
      ...ctx.request.body,
      userId
    });
  }
}
