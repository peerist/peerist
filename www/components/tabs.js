import styled from '@emotion/styled'
import { string, bool } from 'prop-types'
import { animated, useSpring } from 'react-spring'

const Tab = ({ children, active, onClick }) => {
  const { width, color, ...rest } = useSpring({
    width: active ? 60 : 0,
    color: active ? '#000000' : '#d3d3d3'
  })

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: 'fit-content',
        margin: '0 1em 2em 1em'
      }}
      onClick={onClick}
    >
      <animated.h2
        style={{
          color,
          marginBottom: '0.5em',
          fontVariant: 'all-petite-caps'
        }}
      >
        {children}
      </animated.h2>
      <animated.div
        style={{
          background: '#9DDEB7',
          height: '3px',
          width: width.interpolate(w => `${w}%`),
          ...rest
        }}
      />
    </div>
  )
}

Tab.propTypes = {
  children: string.isRequired,
  active: bool
}

Tab.defaultProps = {
  active: false
}

export default Tab
