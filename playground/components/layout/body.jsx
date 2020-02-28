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

          <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
        </Head>
        <body>
          <style jsx>{`
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
