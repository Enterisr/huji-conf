import * as React from "react";
import {Grid} from "@mui/material";
import {lightTheme} from "../../themes/lightTheme";
import {darkTheme} from "../../themes/darkTheme";
import {makeStyles} from '@mui/styles';
import TextField from "@mui/material/TextField";
import {forwardRef, useImperativeHandle, useState} from "react";

// styling of cssButton
const useStyles = makeStyles({
    cssTextField: props => ({
        // '& fieldset': {
        //     borderRadius: `0px`,
        // },
        '& label': {
            color: props.labelcolor,
        },
        '& label.Mui-focused': {
            color: props.labelcolor,
        },
        '& label.Mui-disabled': {
            color: props.textboxborder,
        },
        '& .MuiInputBase-root': {
            color: props.labelcolor,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: props.textboxborder,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: props.textboxborder,
            },
            '&:hover fieldset': {
                borderColor: props.textboxborder,
            },
            '&.Mui-focused fieldset': {
                borderColor: props.textboxborder,
            },
            '&.Mui-disabled fieldset': {
                borderColor: props.textboxborder,
            }
        },
    }),
});

const ConfessionTextField = forwardRef((props, ref) => {

    const [confession, setConfession] = useState('');

    // child function so parent could use it.
    useImperativeHandle(ref, () => ({
        clear: () => {
            setConfession("");
        }
    }));

    // theme related
    let textBoxBorder, labelColor;
    if (props.theme === 'light') {
        textBoxBorder = lightTheme.textBoxBorder;
        labelColor = lightTheme.labelColor;
    } else {
        textBoxBorder = darkTheme.textBoxBorder;
        labelColor = darkTheme.labelColor;
    }

    // props to cssButton styling
    // its not inside because of the "onChange" rendring each time
    const classes = useStyles({labelcolor: labelColor, textboxborder: textBoxBorder});

    return (
        <Grid item xs={12}>
            <TextField className={classes.cssTextField}
                       required
                       fullWidth multiline
                       id="fullWidth"
                       labelcolor={labelColor}
                       textboxborder={textBoxBorder}
                       size="medium"
                       rows={4}
                       label="?What's on your mind"
                       variant="outlined"
                       value={confession}
                       name="entry.638196057"
                       dir="rtl"
                       onChange={(event) => {
                           setConfession(event.target.value);
                           props.onSaveConfessionText(event.target.value);
                       }}
            />
        </Grid>
    );
});

export default ConfessionTextField;