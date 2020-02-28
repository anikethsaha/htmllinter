import React, { Component } from 'react';
import Head from 'next/head';
import Footer from './footer';

class Body extends Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{this.props.title || 'htmllinter playground'}</title>
          <link
            href="https://fonts.googleapis.com/css?family=Kanit&display=swap"
            rel="stylesheet"
          />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
        </Head>
        <body>
          <style jsx>{`
            * {
              font-family: 'Kanit' !important;
            }
            body {
              margin: auto;
            }
          `}</style>
          {this.props.children}
          <Footer />
        </body>
      </React.Fragment>
    );
  }
}

export default Body;
