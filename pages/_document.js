import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html className='scroll-smooth' style={{scrollBehavior:'smooth'}}>
        <Head>
        <link href="https://fonts.googleapis.com/css2?family=Overpass:wght@500&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument