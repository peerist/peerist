import styled from '@emotion/styled'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { animated, useTransition } from 'react-spring'

import Layout from '../components/layout'
import Hero from '../components/hero'
import { ArticleSnippet } from '../components/content'
import { useInterval } from '../utils/hooks'
import Tab from '../components/tabs'

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

const Page = () => {
  const [text, setText] = useState('Science.')
  const [activeTab, setActiveTab] = useState('Most Recent')
  const transitions = useTransition(text, null, {
    from: { opacity: 0, y: -20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 20 }
  })

  useInterval(() => {
    setText(phraser.next().value)
  }, 4000)

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
      <Layout>
        <main
          css={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1
          }}
        >
          <div css={{ width: '100%', paddingTop: '2em', paddingRight: '1em' }}>
            <div css={{ display: 'flex', flexDirection: 'row' }}>
              <Tab
                active={activeTab === 'Most Recent'}
                onClick={() => setActiveTab('Most Recent')}
              >
                Most Recent
              </Tab>
              <Tab
                active={activeTab === 'Popular'}
                onClick={() => setActiveTab('Popular')}
              >
                Popular
              </Tab>
              <Tab
                active={activeTab === 'Featured'}
                onClick={() => setActiveTab('Featured')}
              >
                Featured
              </Tab>
            </div>
            <ArticleSnippet
              title="Ancestral sequences from an elite neutralizer proximal to the development of neutralization resistance as a potential source of HIV vaccine immunogens"
              preview="Mesa and colleagues identify sequences that may define the transition from neutralization sensitive to resistant envs."
            />
            <ArticleSnippet
              title="Evaluation of intuitive trunk and non-intuitive leg sEMG control interfaces as command input for a 2-D Fitts’s law style task"
              preview="Verros and co-workers report a non-intuitive control interface for a trunk orthotic device for subjects with Duchenne muscular dystrophy that can be easily used to perform daily tasks."
            />
            <ArticleSnippet
              title="Non-verbal speech cues as objective measures for negative symptoms in patients with schizophrenia"
              preview="Tahir and colleagues use a machine learning based system to identify non-verbal speech cues that can be used as indices of the negative symptoms of schizophrenia."
            />
          </div>
          <div css={{ width: '400px' }}>links</div>
        </main>
      </Layout>
    </>
  )
}

export default Page
