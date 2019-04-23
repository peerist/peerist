import styled from '@emotion/styled'
import {
  background,
  color,
  space,
  fontWeight,
  fontSize,
  borderRadius
} from 'styled-system'

const Button = styled.button`
  appearance: none;
  border: none;
  display: inline-block;
  text-align: center;
  line-height: inherit;
  text-decoration: none;
  ${background}
  ${color}
  ${space}
  ${fontSize}
  ${fontWeight}
  ${borderRadius}
`

Button.propTypes = {
  ...background.propTypes,
  ...color.propTypes,
  ...space.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...borderRadius.propTypes
}

Button.defaultProps = {
  background: 'black',
  color: 'white',
  fontSize: '16px',
  px: '16px',
  py: '10px',
  fontWeight: 'bold',
  borderRadius: '7px'
}

export default Button
