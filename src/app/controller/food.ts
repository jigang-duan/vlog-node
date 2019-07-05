import { controller, get, post, del, put, provide, inject } from 'midway';
import { IFoodService, IFoodListOptions } from '../../interface';

const createRule = {
  authorId: 'string',
  categoryId: 'number',
  type: { type: 'enum', values: [ 'theme', 'video' ], required: true },
  tag: 'string',
  imageUrl: 'string',
  title: 'string',
  desc: { type: 'string', required: false },
  isShared:  { type: 'boolean', required: false },
};

const addItemRule = {
  type: 'string',
  title: 'string',
  desc: { type: 'string', required: false },
  imageUrl: { type: 'string', required: false },
  vid: { type: 'string', required: false },
  videoUrl: { type: 'string', required: false },
};

const addCommentRule = {
  authorId: 'string',
  content: 'string',
};

@provide()
@controller('/foods', {middleware: ['errorMiddleware']})
export class FoodController {
  @inject()
  foodService: IFoodService;

  @get('/')
  async index(ctx) {
    const userid = ctx.headers['x-userid']
    const { categoryId, isShared } = ctx.query
    const query: IFoodListOptions = {
      limit: parseInt(ctx.query.limit, 10) || 10,
      offset: parseInt(ctx.query.offset, 10) || 0,
      authorId: userid,
      categoryId: categoryId && parseInt(categoryId, 0) || undefined,
      isShared: isShared ? (isShared === 'true') : undefined,
    }
    const result = await this.foodService.list(query);
    ctx.body = result
  }

  @get('/:id')
  async show(ctx) {
    ctx.body = await this.foodService.find(parseInt(ctx.params.id));
  }

  @post('/')
  async create(ctx) {
    const authorId = ctx.headers['x-userid']
    const query = {...ctx.request.body, authorId }
    ctx.validate(createRule, query);
    const id = await this.foodService.create(query);
    const { item } = ctx.request.body;
    if (ctx.query.withVideo && item) {
      ctx.validate(addItemRule, item);
      await this.foodService.addItem(id, item);
    }
    ctx.body = id;
  }

  @put('/:id/shard')
  async shard(ctx) {
    const id = ctx.params.id;
    ctx.body = await this.foodService.shard(id);
  }

  @post('/:id/items')
  async addItem(ctx) {
    const id = ctx.params.id;
    const query = ctx.request.body;
    ctx.validate(addItemRule, query);
    ctx.body = await this.foodService.addItem(id, query);
  }

  @del('/:id/items/:itemId')
  async delItem(ctx) {
    const { id, itemId } = ctx.params;
    ctx.body = await this.foodService.removeItem(id, itemId);
  }

  @post('/:id/comments')
  async addComment(ctx) {
    const authorId = ctx.headers['x-userid']
    const id = ctx.params.id;
    const query = { ...ctx.request.body, authorId };
    ctx.validate(addCommentRule, query);
    ctx.body = await this.foodService.addComment(id, query);
  }

  @del('/:id/comments/:commentId')
  async delComment(ctx) {
    const { id, commentId } = ctx.params;
    ctx.body = await this.foodService.removeComment(id, commentId);
  }
}
