import { func } from 'prop-types'
import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { Search, ChevronRight } from 'react-feather'
import { animated, useTransition, useSpring, interpolate } from 'react-spring'

import { useArxiv } from '../utils/hooks'

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)

  const iconProps = useTransition(hovered, null, {
    from: { rotation: -360, opacity: 0, scale: 0.5 },
    enter: { rotation: 0, opacity: 1, scale: 1 },
    leave: { rotation: 360, opacity: 0, scale: 0.5 }
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onSubmit(query)
      }}
      css={{
        width: '100%',
        display: 'flex',
        height: 'fit-content'
      }}
    >
      <input
        placeholder="Search for papers..."
        value={query}
        onChange={e => setQuery(e.currentTarget.value)}
        css={{
          width: 'auto',
          flexGrow: 1,
          padding: '1em 2em',
          fontSize: '18px',
          borderRadius: '100px',
          marginRight: '1em',
          border: 'none',
          boxShadow: '0px 0px 21px rgba(0, 0, 0, 0.15)'
        }}
      />
      <button
        type="submit"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          fontSize: '20px',
          width: '3em',
          height: '3em',
          background: '#9DDEB7',
          border: 'none',
          boxShadow: '0px 0px 21px #9DDEB7FF',
          borderRadius: '100%'
        }}
      >
        {iconProps.map(({ item, props: { opacity, rotation, scale }, key }) =>
          item ? (
            <animated.div
              style={{
                opacity,
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: interpolate(
                  [scale, rotation],
                  (s, r) => `scale(${s}) rotate(${r}deg)`
                )
              }}
              key={key}
            >
              <ChevronRight style={{ position: 'absolute' }} />
            </animated.div>
          ) : (
            <animated.div
              style={{
                opacity,
                position: 'absolute',
                display: 'flex',
                transform: interpolate(
                  [scale, rotation],
                  (s, r) => `scale(${s}) rotate(${r}deg)`
                )
              }}
              key={key}
            >
              <Search />
            </animated.div>
          )
        )}
      </button>
    </form>
  )
}

SearchBar.propTypes = {
  onSubmit: func.isRequired
}

export default SearchBar
