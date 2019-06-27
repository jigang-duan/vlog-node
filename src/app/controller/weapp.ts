import { controller, get, config, provide } from 'midway';
import { stringify } from 'qs';
import { IWeappConfig, ErrorResult } from '../../interface';

const wxCodeRule = {
  code: 'string',
};

@provide()
@controller('/weapp', {middleware: ['errorMiddleware']})
export class WeappController {

  @config('weapp')
  config: IWeappConfig;

  @get('/openid')
  async getOpenid(ctx) {
    ctx.validate(wxCodeRule, ctx.query);

    const baseUrl = 'https://api.weixin.qq.com/sns/jscode2session';
    const { appId, appSecret } = this.config;
    const params = {
      app_id: appId,
      secret: appSecret,
      js_code: ctx.query.code,
      grant_type: 'authorization_code'
    }
    const apiUrl = `${baseUrl}?${stringify(params)}`
    const req = await ctx.httpclient.curl(apiUrl);
    const data = JSON.parse(req.data.toString());
    ctx.body = data;
    if (data.errcode && data.errcode > 0) {
      throw new ErrorResult(`errcode[${data.errcode}]`, 510, data.errmsg)
    }
  }

}
