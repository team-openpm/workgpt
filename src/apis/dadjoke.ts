import { z } from 'zod'
import { Api } from './base'
import { invokable } from './helpers/decorators'

export class DadJokeApi extends Api {
  @invokable({
    schema: z.tuple([z.string().describe('topic')]),
    usage:
      'a dad joke generator. get a dad joke about a specific topic. input should be a search term.',
  })
  async makeJoke(topic: string): Promise<string> {
    const headers = { Accept: 'application/json' }
    const searchUrl = `https://icanhazdadjoke.com/search?term=${topic}`

    const response = await fetch(searchUrl, { headers })

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    const data = await response.json()
    const jokes = data.results

    if (jokes.length === 0) {
      return `No dad jokes found about ${topic}`
    }

    const randomIndex = Math.floor(Math.random() * jokes.length)
    const randomJoke = jokes[randomIndex].joke

    return randomJoke
  }
}
