import { xml2js as convert } from 'xml-js'
import { useRef, useEffect, useState } from 'react'

import { getData } from './api'
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
  query = categories.join('+OR+'),
  id,
  results = 10,
  start = 0
) => {
  const [target, setTarget] = useState(
    `https://export.arxiv.org/api/query?${
      id
        ? `id_list=${id}`
        : `search_query=all:${query.replace(' ', '+') ||
            categories.join('+OR+')}`
    }&start=${start}&max_results=${results}&sortBy=submittedDate&sortOrder=descending`
  )
  const [ready, setReady] = useState(false)
  const [error, setError] = useState()
  const [output, setOutput] = useState()

  const makeRequest = async () => {
    try {
      const papers = await getData(target)
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

  const refetch = (newQuery, newId, newResults, newStart) => {
    if (newId || newQuery || newResults || newStart) {
      setTarget(
        `https://export.arxiv.org/api/query?${
          newId || id
            ? `id_list=${newId || id}`
            : `search_query=all:${newQuery || categories.join('+')}`
        }&start=${newStart || start}&max_results=${newResults ||
          results}&sortBy=submittedDate&sortOrder=descending`
      )
    }

    if (!ready) setReady(true)
  }

  return { output, error, refetch }
}
