import Link from 'next/link'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import Button from './button'
import { Container, Limiter } from './layout'

const NavLink = styled.a`
  font-weight: bold;
  color: black;
  text-decoration: none;
  margin: 0 1em;
  cursor: pointer;
`

const NavBar = ({ children }) => {
  return (
    <Container as="nav">
      <Limiter
        justifyContent="space-between"
        alignItems="center"
        p="2em"
        width={1250}
      >
        <Link href="/">
          <a>
            <img
              src="/static/logo.svg"
              css={{ height: 'auto', width: '160px' }}
            />
          </a>
        </Link>
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/about">
            <NavLink>About Us</NavLink>
          </Link>
          <Link href="/submit">
            <NavLink>Submit</NavLink>
          </Link>
          <Button ml="1em">Log In</Button>
        </div>
      </Limiter>
    </Container>
  )
}

export default NavBar
