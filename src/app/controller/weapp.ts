import { controller, get, put, config, inject, provide } from 'midway';
import { stringify } from 'qs';
import { IWeappConfig, ErrorResult, IUserService } from '../../interface';

const wxCodeRule = {
  code: 'string',
};

@provide()
@controller('/weapp', {middleware: ['errorMiddleware']})
export class WeappController {

  @config('weapp')
  config: IWeappConfig;

  @inject()
  userService: IUserService;

  @get('/openid')
  async getOpenid(ctx) {
    ctx.validate(wxCodeRule, ctx.query);

    const baseUrl = 'https://api.weixin.qq.com/sns/jscode2session';
    const { appId, appSecret } = this.config;
    const params = {
      appid: appId,
      secret: appSecret,
      js_code: ctx.query.code,
      grant_type: 'authorization_code'
    }
    const apiUrl = `${baseUrl}?${stringify(params)}`
    const req = await ctx.httpclient.curl(apiUrl);
    const data = JSON.parse(req.data.toString());
    if (data.errcode && data.errcode > 0) {
      throw new ErrorResult(`errcode[${data.errcode}]`, 510, data.errmsg)
    }
    await this.userService.create(data.openid)
    ctx.body = data;
  }

  @put('/users')
  async updateUserInfo(ctx) {
    const userId = ctx.headers['x-userid']
    ctx.body = await this.userService.update(userId, ctx.request.body)
  }

}
