import styled from '@emotion/styled'
import { string } from 'prop-types'

const Hero = styled.div`
  background: black;
  ${props => props.image && `background-image: url('${props => props.image}');`}
  height: 20em;
  display: flex;
  align-items: center;
  color: white;
`

Hero.propTypes = {
  image: string
}

export default Hero
