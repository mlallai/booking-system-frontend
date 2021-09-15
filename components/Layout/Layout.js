import {Fragment, useState} from 'react'
import Container from '@material-ui/core/Container';
import {AppBar, Toolbar, Typography, Box, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useAuth} from '../../utils/hooks'
import {LoaderPage} from '../../components'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontWeight: "bold",
    },
  }));

const Layout = ({children}) => {
    const classes = useStyles();
    const {isAuth, logout} = useAuth()
    const [loading, setLoading]= useState(false)
    const handleLogout = () => {
      setLoading(true)
      logout()
    }

    return (
        <div className={classes.root}>
        <AppBar position="static">
              <Toolbar>
              <Typography variant="h6" className={classes.title}>
                  COLA DAY - ROOM BOOKING SYSTEM - September 24, 2021
                </Typography>
                <Box>
                  {
                    isAuth() ? (
                      <Fragment>
                        <Button onClick={handleLogout} color="default" variant="contained">
                          Logout
                        </Button>
                      </Fragment>
                    ) : (
                      <Fragment></Fragment>
                    )
                  }
                </Box>
              </Toolbar>
            </AppBar>
        <Container maxWidth="lg">
          {
            loading ? (
              <LoaderPage />
            ) : (
              <Box mt={5}>
              {children}
              </Box>
            )
          }
           
        </Container>
        </div>
    )
}

export default Layout