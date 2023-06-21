import { Api } from './base'
import { invokable } from './helpers/decorators'
import { z } from 'zod'
import puppeteer, { Page } from 'puppeteer'

export class TextBrowser extends Api {
  @invokable({
    usage: `Useful for getting plain text contents of a website.`,
    schema: z.object({
      url: z.string(),
    }),
  })
  async getSiteText({ url }: { url: string }): Promise<string> {
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()
    await page.goto(url)
    const text = await extractText(page)
    await browser.close()
    return text ?? ''
  }

  @invokable({
    usage: `Get sitemap of a website. Useful for getting a list of pages of a website.`,
    schema: z.object({
      url: z.string(),
    }),
  })
  async getSitemap({ url }: { url: string }) {
    const browser = await puppeteer.launch({ headless: 'new' })
    const base = new URL(url).hostname
    const page = await browser.newPage()
    await page.goto(url)
    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href]')).map((node) => ({
        href: node.getAttribute('href'),
        linkText: node.textContent,
      }))
    )
    await browser.close()

    const normalizedLinks: {
      linkText: string
      linkUrl: string
    }[] = []

    for (const { href, linkText } of links) {
      if (!href || !linkText) {
        continue
      }

      let url: URL

      try {
        url = new URL(href)
      } catch (e) {
        continue
      }

      if (url.hostname !== base) {
        continue
      }

      // Check uniqueness
      if (normalizedLinks.some((link) => link.linkUrl === url.href)) {
        continue
      }

      normalizedLinks.push({
        linkText: linkText.trim(),
        linkUrl: url.href,
      })
    }

    return normalizedLinks
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
