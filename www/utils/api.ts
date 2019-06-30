import ky from 'ky-universal'
import { xml2js as convert } from 'xml-js'

import { Paper } from '../models/paper'

export const getData = async (target: string): Promise<Paper | undefined> => {
  let result
  try {
    const xml = await ky(target).text()
    const {
      feed: { entry }
    } = convert(xml, { compact: true })
    result = entry.map(p => {
      return {
        id: p.id._text.split('/').pop(),
        category: p['arxiv:primary_category']._attributes.term,
        title: p.title._text.trim(),
        summary: p.summary._text.trim(),
        pdf: p.link.find(l => l._attributes.title === 'pdf')._attributes.href,
        authors: Array.isArray(p.author)
          ? p.author.map(a => a.name._text.trim())
          : [p.author.name._text.trim()]
      }
    })
  } catch (e) {
    console.error(e)
  }

  return result
}
