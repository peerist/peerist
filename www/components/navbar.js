import { css } from '@emotion/core'
import { Container, Limiter } from './layout'

const NavBar = ({ children }) => {
  return (
    <Container>
      <Limiter justifyContent="space-between" alignItems="center" p="2em">
        <img src="/static/logo.svg" css={{ height: 'auto', width: '160px' }} />
        <div>{children}</div>
      </Limiter>
    </Container>
  )
}

export default NavBar
