import Head from 'next/head'
import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { animated, useTransition } from 'react-spring'
import { usePageVisibility } from 'react-browser-hooks'

import Tab from '../components/tabs'
import Hero from '../components/hero'
import Layout from '../components/layout'
import { useArxiv } from '../utils/hooks'
import { useInterval } from '../utils/hooks'
import SearchBar from '../components/search-bar'
import { ArticleSnippet } from '../components/content'
import { getData } from '../utils/api'
import categories from '../utils/categories'

const phraseChanger = function*(phrases) {
  let index = phrases.length
  while (true) {
    if (index < phrases.length - 1) {
      index++
      yield phrases[index]
    } else {
      index = 0
      yield phrases[index]
    }
  }
}

const phraser = phraseChanger([
  'Papers.',
  'Peer reviews.',
  'Experiments.',
  'Datasets.',
  'Citations.',
  'Science.'
])

const Page = props => {
  const visibility = usePageVisibility()
  const [delay, setDelay] = useState(4000)
  const [text, setText] = useState('Science.')
  const [activeTab, setActiveTab] = useState('Most Recent')

  const [papers, setPapers] = useState(props.papers)
  const { output, refetch } = useArxiv()
  const transitions = useTransition(text, null, {
    from: { opacity: 0, y: -20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 20 }
  })

  useEffect(() => {
    if (output) setPapers(output)
  }, [output])

  useEffect(() => {
    setDelay(visibility ? 4000 : undefined)
  }, [visibility])

  useInterval(() => {
    setText(phraser.next().value)
  }, delay)

  return (
    <>
      <Head>
        <title>Home | Peerist</title>
      </Head>
      <Hero>
        <Layout>
          <h1 css={{ fontSize: '4em' }}>
            {transitions.map(({ item, key, props: { y, ...rest } }) => (
              <animated.div
                style={{
                  ...rest,
                  position: 'absolute',
                  transform: y.interpolate(y => `translateY(${y}px)`)
                }}
                key={key}
              >
                {item}
              </animated.div>
            ))}
            <br />
            For everyone.
          </h1>
        </Layout>
      </Hero>
      <Layout width={860}>
        <main
          css={{
            width: '100%',
            paddingTop: '2em'
          }}
        >
          <div css={{ marginBottom: '2em' }}>
            <SearchBar onSubmit={refetch} />
          </div>
          <div
            css={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <Tab
              active={activeTab === 'Most Recent'}
              onClick={() => setActiveTab('Most Recent')}
            >
              Most Recent
            </Tab>
          </div>
          {papers &&
            papers.map(p => (
              <ArticleSnippet
                key={p.title}
                title={p.title}
                preview={`${p.summary.substring(0, 200)}...`}
              />
            ))}
        </main>
      </Layout>
    </>
  )
}

Page.getInitialProps = async () => {
  const papers = await getData(
    `https://export.arxiv.org/api/query?search_query=cat:${categories.join(
      '+OR+'
    )}&sortBy=submittedDate&sortOrder=descending`
  )
  return { papers }
}

export default Page
