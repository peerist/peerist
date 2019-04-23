import styled from '@emotion/styled'
import { string, bool } from 'prop-types'
import { animated, useSpring } from 'react-spring'

const Tab = ({ children, active, onClick }) => {
  const { width, ...rest } = useSpring({ width: active ? 60 : 0 })

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
      <h2
        css={{
          marginBottom: '0.5em',
          fontVariant: 'all-petite-caps',
          color: active ? 'black' : 'grey'
        }}
      >
        {children}
      </h2>
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
