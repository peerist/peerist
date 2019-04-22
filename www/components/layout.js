import styled from '@emotion/styled'
import { justifyContent, alignItems, space } from 'styled-system'
import { node } from 'prop-types'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Limiter = styled.div`
  width: 100%;
  display: flex;
  ${justifyContent}
  ${alignItems}
  ${space}
  flex-basis: ${props => props.theme.pageWidth || 1140}px;
`

Limiter.propTypes = {
  ...justifyContent.propTypes,
  ...alignItems.propTypes,
  ...space.propTypes
}

Limiter.defaultProps = {
  justifyContent: 'center',
  alignItems: 'flex-start'
}

const Layout = ({ children }) => {
  return (
    <Container>
      <Limiter justifyContent="flex-start" px="2em">
        {children}
      </Limiter>
    </Container>
  )
}

Layout.propTypes = {
  children: node
}

export { Container, Limiter }
export default Layout
