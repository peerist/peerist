import styled from '@emotion/styled'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { animated, useTransition } from 'react-spring'

import Layout from '../components/layout'
import Hero from '../components/hero'
import { useInterval } from '../utils/hooks'

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
        <div
          css={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1
          }}
        >
          <div css={{ width: '100%' }}>posts</div>
          <div css={{ width: '300px' }}>links</div>
        </div>
      </Layout>
    </>
  )
}

export default Page
