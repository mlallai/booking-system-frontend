import {TextField, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const Input = ({required, defaultValue, label, value, register, type, onChange}) => {
    return (
        <div>
            <Box mb={3}>
            <TextField
                fullWidth
                variant="outlined"
                required={required}
                label={label}
                defaultValue={defaultValue}
                ref={register}
                name={value}
                type={type}
                onChange={onChange}
            />
            </Box>
        </div>

    )
}

Input.defaultProps = {
    required: false,
    defaultValue: "",
    label: "",
    value: "",
    type: "text"
}

Input.propTypes = {
    required: PropTypes.bool,
    defaultValue: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    ref: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Input