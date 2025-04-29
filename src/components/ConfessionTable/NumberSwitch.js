import "./NumberSwitch.css"
import Grid from "@mui/material/Grid";
import {lightTheme} from "../../themes/lightTheme";
import {darkTheme} from "../../themes/darkTheme";
import React, {forwardRef, useState, useImperativeHandle} from 'react';
import {alpha, styled} from '@mui/material/styles';
import Switch from "@mui/material/Switch";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";

import {makeStyles} from "@mui/styles";


// styling of switch
const CostumedSwitch = styled(Switch)(({theme}) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: "#b084d9",
        "&:hover": {
            backgroundColor: alpha("#b084d9", theme.palette.action.hoverOpacity)
        }
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#b084d9"
    },
    "& .MuiSwitch-switchBase": {
        color: "#c1c6c9"
    },
    "& .MuiSwitch-track": {
        backgroundColor: "#859099"
    }
}));

// styling of text box
const useStyles = makeStyles({
    cssTextField: props => ({
        // '& fieldset': {
        //     borderRadius: `0px`,
        // },
        '& label': {
            color: props.labelColor,
        },
        '& label.Mui-focused': {
            color: props.labelColor,
        },
        '& label.Mui-disabled': {
            color: props.textBoxBorder,
        },
        '& .MuiInputBase-root': {
            color: props.labelColor,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: props.textBoxBorder,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: props.textBoxBorder,
            },
            '&:hover fieldset': {
                borderColor: props.textBoxBorder,
            },
            '&.Mui-focused fieldset': {
                borderColor: props.textBoxBorder,
            },
            '&.Mui-disabled fieldset': {
                borderColor: props.textBoxBorder,
            }
        },
    }),
});

// component
const NumberSwitch = forwardRef((props, ref) => {

    const [disabled, setDisabled] = useState(true);
    let [numberBoxText, setNumberBoxText] = useState('');


    // handling disabling and abling number box
    function handleConfessionNumberBox(event) {
        setDisabled(!disabled);
        event.currentTarget.value = "";
        onChangeOfTextBox(event);
    }

    // child function so parent could use it.
    // clears the number switch
    useImperativeHandle(ref, () => ({
        clear: () => {
            setNumberBoxText("");
            // don't need, its done in handleConfessionNumberBox
            // if (!disabled) {
            //     setDisabled(false);
            // } else {
            //     setDisabled(true);
            // }
        },
        turnToggleOff: () => {
            // turn toggle off when confession is sent
            label.checked = false;
            setDisabled(true);
        }
    }));

    function onChangeOfTextBox(event) {
        if (!disabled) {
            setNumberBoxText(event.currentTarget.value);
        } else {
            setNumberBoxText("");
        }
        // current input
        props.onCommentToExistingConfession(event.currentTarget.value);
    }

    // colors for theme and for text box
    let textBoxBorder, labelColor;

    // changing colors
    function renderTheme() {
        let root = document.documentElement;

        if (props.theme === 'light') {
            root.style.setProperty('--switch-text', lightTheme.switchTextColor);
            textBoxBorder = lightTheme.textBoxBorder;
            labelColor = lightTheme.labelColor
        } else {
            root.style.setProperty('--switch-text', darkTheme.switchTextColor);
            textBoxBorder = darkTheme.textBoxBorder;
            labelColor = darkTheme.labelColor
        }
    }


    // changing colors to current theme
    renderTheme();

    // only positive numbers
    function validate(event) {
        var theEvent = event || window.event;
        var key;
        // Handle paste
        if (theEvent.type === 'paste') {
            key = event.clipboardData.getData('text/plain');
        } else {
            // Handle key press
            key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    // props to cssButton styling
    // its not inside because of the "onChange" rendring each time
    const classes = useStyles({labelColor: labelColor, textBoxBorder: textBoxBorder});

    const label = {
        inputProps: {'aria-label': 'confession number switch'},
        checked: !disabled,
    };

    return (
        <>
        <Grid container
              justifyContent="center"
              alignItems="center"
              className="switch-box"
        > 

         <CostumedSwitch {...label
        }
        onChange={
            (event) => handleConfessionNumberBox(event)
        }
        />
            <Typography>  This is a response confession </Typography>
            </Grid>
            <Grid position={"relative"}  width={"100%"} display={"flex"}justifyContent={"center"}>
            <TextField
                required
                className={classes.cssTextField}
                id="outlined-basic"
                label="confession number"
                variant="outlined"
                disabled={disabled}
                onKeyPress={(event) => validate(event)}
                onChange={(event) => onChangeOfTextBox(event)
                }
                value={numberBoxText}
            />
            </Grid>
            </>
    );
});

export default NumberSwitch;