import React from 'react';
import NextApp from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from '../context/theme';

import 'codemirror/lib/codemirror.css';

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
