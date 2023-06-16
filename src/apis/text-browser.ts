import { Api } from './base'
import { invokable } from './helpers/decorators'
import { z } from 'zod'
import puppeteer, { Page } from 'puppeteer'

export class TextBrowser extends Api {
  @invokable({
    usage: `Useful for getting text contents of a website.`,
    schema: z.object({
      url: z.string(),
    }),
  })
  async browse({ url }: { url: string }): Promise<string> {
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()
    await page.goto(url)
    const text = await extractText(page)
    await browser.close()
    return text ?? ''
  }
}

async function extractText(page: Page) {
  // Extract all text from the page. We can't use `innerText` because it
  // concatenates all text nodes, which means we lose the whitespace between them
  const texts = (await page.evaluate(`
    var texts = []
    document.querySelectorAll('style,svg,script,img,iframe').forEach((el) => el.remove())

    function visitNode(node) {
      if (node.nodeType === node.TEXT_NODE && node.textContent) {
        texts.push(node.textContent)
        return
      }

      if (!node.childNodes) {
        return
      }

      // Visit each child node
      for (const child of Array.from(node.childNodes)) {
        visitNode(child)
      }
    }

    visitNode(document.body)

    texts
  `)) as string[]

  // Remove all extra whitespace and newlines
  const text = texts.join(' ').trim().replace(/\s+/g, ' ')

  return text
}
