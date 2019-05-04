import styled from '@emotion/styled'

const FooterBase = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10em;
  font-weight: 600;
`

const Footer = () => {
  return (
    <FooterBase>
      &copy; Peerist Foundation {new Date().getFullYear()}
    </FooterBase>
  )
}

export default Footer
