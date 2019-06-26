import { controller, get, config, provide } from 'midway';

function _code2SessionUrl(config: IWeappConfig, jscode: string): string {
  const apiUrl = 'https://api.weixin.qq.com/sns/jscode2session';
  const { appId, appSecret } = config;
  const params = `?appid=${appId}&secret=${appSecret}&js_code=${jscode}&grant_type=authorization_code`;
  return `${apiUrl}${params}`;
}

interface IWeappConfig {
  appId: string;
  appSecret: string;
}

@provide()
@controller('/weapp')
export class WeappController {

  @config('weapp')
  config: IWeappConfig;

  @get('/openid')
  async getOpenid(ctx) {
    console.info(_code2SessionUrl(this.config, ctx.query.code));
  }

}
