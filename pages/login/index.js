import { useEffect } from 'react'
import { Controller, useForm } from "react-hook-form";
import { Typography, Button, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router'

import { Input, Layout } from '../../components'
import { useAuth } from '../../utils/hooks/useAuth'

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
      fontWeight: "bold"
    },
    container: {
      padding: theme.spacing(3),
    }
  }));

const Login = () => {
    const { signIn, isAuth, loading } = useAuth()
    const classes = useStyles();
    const router = useRouter()
    

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            identifier: undefined,
            password: undefined
        }
    });
    const onSubmit = async (variables) => {
      signIn(variables)
    }

    useEffect(() => {
      if (isAuth()) {
        router.push("/")
      }
    }, [])

    return (
        <Layout>
           <Grid container>
            <Grid item xs={12} md={12} align="center">
              <Grid container justify="center" alignItems="center">
                <Typography variant="h5" className={classes.title}>
                Sign In
              </Typography>
          </Grid>
          </Grid>
          </Grid>
          <Container className={classes.container} maxWidth="xs">
            <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
            <Grid item xs={12} md={12} align="center">
              <Grid justify="center" alignItems="center">
                <Controller
                    name={"identifier"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input 
                        required={true}
                        label="Email"
                        value={value}
                        type="email"
                        onChange={onChange}
                    />
                )}
              />
              </Grid>
              <Grid justify="center" alignItems="center">
                <Controller
                    name={"password"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input 
                        required={true}
                        label="Password"
                        value={value}
                        type="password"
                        onChange={onChange}
                    />
                  )}
                />
                  </Grid>
                  <Grid item xs={12}>
            <Button color="secondary" fullWidth type="submit" variant="contained">
              Log in
            </Button>
          </Grid>
          </Grid>
          </Grid>
            </form>
            </Container>
        </Layout>
    )
}

export default Login