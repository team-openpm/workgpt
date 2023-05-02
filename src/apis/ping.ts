import { Api } from './base'
import { invokable } from './helpers/decorators'

export class PingApi extends Api {
  @invokable({
    usage: `Useful for determining if anyone is there.`,
  })
  async ping() {
    return 'pong'
  }
}
