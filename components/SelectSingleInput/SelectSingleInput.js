import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
      },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const SelectSingleInput = ({label, list, onValueChange}) => {
    const classes = useStyles();

    const handleChange = (event) => {
      const value = JSON.parse(event.target.value)
      onValueChange(value)
    }

    return (
      <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">{label}</InputLabel>
        <Select
        onChange={handleChange}
        native defaultValue=""
        id="grouped-native-select">
          <option aria-label="None" value="" />
          {
            list.map((item, index) => (
              <optgroup key={index} label={item.optionTitle}>
                {
                  item.optionValues.map((v, i) => (
                    <option key={i} value={JSON.stringify({
                      id: item.optionTitleId,
                      value: v
                    })
                    }>{v}</option>
                  ))
                }
            </optgroup>
            ))
          }
         
         
        </Select>
      </FormControl>

      </div>
    )
}

SelectSingleInput.defaultProps = {
    label: "",
    list: [],
}

SelectSingleInput.propTypes = {
    label: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    onValueChange: PropTypes.func
}

export default SelectSingleInput