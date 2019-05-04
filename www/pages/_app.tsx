import React from 'react'
import { Global } from '@emotion/core'
import App, { Container } from 'next/app'
import { ThemeProvider } from 'emotion-theming'

import theme from '../theme'
import Layout from '../components/layout'
import NavBar from '../components/navbar'
import Button from '../components/button'
import Footer from '../components/footer'

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
              boxSizing: 'border-box',
              WebkitFontSmoothing: 'antialiased'
            }
          }}
        />
        <ThemeProvider theme={theme}>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </Container>
    )
  }
}

export default MyApp
