import { xml2js as convert } from 'xml-js'
import { useRef, useEffect, useState } from 'react'

import categories from './categories'

export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export const useArxiv = (
  id,
  query = categories.join('+OR+'),
  results = 10,
  start = 0
) => {
  const [target, setTarget] = useState(
    `https://export.arxiv.org/api/query?${
      id ? `id_list=${id}` : `search_query=all:${query}`
    }&start=${start}&max_results=${results}&sortBy=submittedDate&sortOrder=descending`
  )
  const [ready, setReady] = useState(true)
  const [error, setError] = useState()
  const [output, setOutput] = useState()

  const makeRequest = async () => {
    try {
      const response = await fetch(target)
      const xml = await response.text()
      const {
        feed: { entry }
      } = convert(xml, { compact: true })
      const papers = entry.map(p => {
        return {
          id: p.id._text.split('/').pop(),
          category: p['arxiv:primary_category']._attributes.term,
          title: p.title._text.trim(),
          summary: p.summary._text.trim(),
          pdf: p.link.find(l => l._attributes.title === 'pdf')._attributes.href,
          authors: Array.isArray(p.author)
            ? p.author.map(a => ({
                name: a.name._text.trim()
              }))
            : [p.author.name._text.trim()]
        }
      })
      setOutput(papers)
    } catch (e) {
      setError(JSON.stringify(e))
    } finally {
      setReady(false)
    }
  }

  useEffect(() => {
    if (ready) makeRequest()
  }, [ready])

  const refetch = (newId, newQuery, newResults, newStart) => {
    if (newId || newQuery || newResults || newStart) {
      setTarget(
        `https://export.arxiv.org/api/query?${
          newId || id
            ? `id_list=${newId || id}`
            : `search_query=all:${newQuery || query}`
        }&start=${newStart || start}&max_results=${newResults ||
          results}&sortBy=submittedDate&sortOrder=descending`
      )
    }

    if (!ready) setReady(true)
  }

  return { output, error, refetch }
}
