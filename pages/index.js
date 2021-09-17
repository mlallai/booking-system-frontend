import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Layout, BookingSection, MeetingSection, ProfileSection } from '../components'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontWeight: "bold"
  },
  container: {
    padding: theme.spacing(3),
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Layout>
       <Box mb={3}>
         <ProfileSection/>
         </Box>
      <Box mb={3}>
      <Typography color="secondary" variant="h4" className={classes.title}>
        Manage my Bookings
      </Typography>
      </Box>
      <Grid container className={classes.root} spacing={2}>
        <BookingSection/>
        <MeetingSection/>
    </Grid>
    </Layout>
  )
}

export default Home