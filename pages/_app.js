import '../styles/globals.css'
import { ContextProvider } from '../context/Context'
import { NavBar, Footer } from '../components/componentsIndex'

const MyApp = ({ Component, pageProps }) => (
  <ContextProvider>
    <div>
      <NavBar/>
      <div>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  </ContextProvider>
)

export default MyApp;



// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp
