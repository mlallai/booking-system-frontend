import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { Typography, Grid, Box, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import {
  QUERY_BOOKINGS, MUTATION_DELETE_BOOKING, QUERY_ROOMS
} from '../../graphql'
import { LoaderPage } from '../../components'

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
      fontWeight: "bold"
    },
    container: {
      padding: theme.spacing(3),
    },
    iconBtn: {
        color: "red"
    }
  }));

const MeetingSection = () => {
    const [loader, setLoader] = useState(false)
    const { loading: bookingsLoading, data: bookingsData } = useQuery(QUERY_BOOKINGS);
    const [deleteBooking] = useMutation(MUTATION_DELETE_BOOKING, {
        refetchQueries: [{ query: QUERY_BOOKINGS }, { query: QUERY_ROOMS }],
        awaitRefetchQueries: true,
      })
    const classes = useStyles();

    const handleDeleteBooking = async (booking = {}) => {
        setLoader(true)
        try {
            await deleteBooking({ variables: { id: booking.id } })
            setLoader(false)
          } catch {
            setLoader(false)
          }
    }
    
    if (loader) return <LoaderPage/>

    return (
        <Grid item xs={12} md={6}>
        <Typography color="primary" variant="h6" className={classes.title}>
       My Bookings
       </Typography>
       <Grid container className={classes.root} spacing={2}>
        <Box ml={1} mt={3}>
          {
            bookingsData?.bookings && bookingsData.bookings.map(booking => (
              <Grid key={booking.id} item xs={12}>
                <Typography color="secondary" variant="h6">
                Room {booking.room.name} -  {moment(booking.time, ["hh:mm"]).format("HH:mm A")} <IconButton onClick={() => handleDeleteBooking(booking)} className={classes.iconBtn}><Delete/></IconButton>
                </Typography>
                </Grid>
            ))
          }
        </Box>
         </Grid>
        </Grid>
    )
}

export default MeetingSection