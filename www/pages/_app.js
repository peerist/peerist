import React from 'react'
import { Global } from '@emotion/core'
import App, { Container } from 'next/app'
import { ThemeProvider } from 'emotion-theming'

import theme from '../theme'
import Layout from '../components/layout'
import NavBar from '../components/navbar'
import Button from '../components/button'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Global
          styles={{
            '*': {
              margin: 0,
              fontFamily: 'Inter, -apple-system, Segoe UI, sans-serif',
              boxSizing: 'border-box'
            }
          }}
        />
        <ThemeProvider theme={theme}>
          <NavBar>
            <Button>Log In</Button>
          </NavBar>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    )
  }
}

export default MyApp
