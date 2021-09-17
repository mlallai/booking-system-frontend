import { Typography, Grid, Box } from '@material-ui/core';
import { QUERY_ME } from "../../graphql"
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    bodyText: {
      flexGrow: 1,
      fontWeight: "bold",
      color: "red"
    },
  }));
const ProfileSection = () => {
    const { data, } = useQuery(QUERY_ME);
    const classes = useStyles();

    return (
        <Grid container spacing={2} alignContent="space-between">
        {
            data?.me && (
                <Grid xs={12} item>
                 <Typography variant="body1" className={classes.bodyText}>
                    Username : {data?.me?.username || ""}
               </Typography>
               </Grid>
            )
        }
        </Grid>        
    )
}

export default ProfileSection