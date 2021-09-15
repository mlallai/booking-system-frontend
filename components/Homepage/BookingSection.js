import {useState} from 'react'
import { Typography, Grid, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';

import {
  QUERY_TIMESLOTS, QUERY_ROOMS, QUERY_BOOKINGS, MUTATION_CREATE_BOOKING
} from '../../graphql'

import { SelectSingleInput, LoaderPage } from '../../components'


const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
      fontWeight: "bold"
    },
    container: {
      padding: theme.spacing(3),
    }
  }));

const BookingSection = () => {
    const classes = useStyles();
    const [loader, setLoader] = useState(false)
    const { loading, data, } = useQuery(QUERY_TIMESLOTS);
    const { loading: roomsLoading, data: roomsData } = useQuery(QUERY_ROOMS);
    const initialState = {
      room: null,
      time: null
    }
    const [variables, setVariables] = useState(initialState)
    const [createBooking] = useMutation(MUTATION_CREATE_BOOKING, {
      refetchQueries: [{ query: QUERY_BOOKINGS }, { query: QUERY_ROOMS }],
      awaitRefetchQueries: true,
    })

    const onValueChange = (o) => {
     setVariables({
      room: o.id,
      time: moment(o.value, "HH:mm:ss A").format("HH:mm:ss.SSS")
     })
    }

    const handleSubmit = async () => {
      setLoader(true)
      try {
        await createBooking({ variables })
        setVariables(initialState)
        setLoader(false)
      } catch {
        setLoader(false)
      }
    }

    const optionsList = data?.timeslots && roomsData?.rooms ? roomsData.rooms.map(room => (
      {
        optionTitle: room.name,
        optionTitleId: room.id,
        optionValues: data.timeslots.reduce((a,c) => a.concat(!room.bookings.find(booking => booking.time == c.startTime) ? moment(c.startTime, ["hh:mm"]).format("HH:mm A"):[]), [])

      })) : undefined


      if (loader) return <LoaderPage/>
    
      return (
        <Grid item xs={12} md={6}>
        <Typography color="primary" variant="h6" className={classes.title}>
          Book a room
        </Typography>

        {
          optionsList && (
            <Box mt={3} mb={3} pr={5}>
            <SelectSingleInput
              list={optionsList}
              label="Select a room and a time"
              onValueChange={onValueChange}
            />
            </Box>
          )
        }

            <Button disabled={!variables.room || !variables.time} onClick={handleSubmit} color="secondary" variant="contained">
              I confirm my booking
            </Button>

        </Grid>
    )
}

export default BookingSection