import "react-toastify/dist/ReactToastify.css"
import { ApolloProvider } from '@apollo/client'
import { useApollo, ProtectRoute, theme } from '../utils'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import { ToastContainer } from "react-toastify"


const App = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <ToastContainer />
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProtectRoute>
      <Component {...pageProps} />
      </ProtectRoute>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export async function getStaticProps(appContext) {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App