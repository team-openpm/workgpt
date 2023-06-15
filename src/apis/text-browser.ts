import { Api } from './base'
import { invokable } from './helpers/decorators'
import { z } from 'zod'

export class TextBrowser extends Api {
  @invokable({
    usage: `Useful for getting text contents of a website.`,
    schema: z.object({
      url: z.string(),
    }),
  })
  async evaluate({ url }: { url: string }): Promise<string> {}
}
