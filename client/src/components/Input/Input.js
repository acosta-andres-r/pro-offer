import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    margin: '0 auto',
    // width: '100%',

    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',

    [theme.breakpoints.down('sm')]: {
      width: '90%'
    },
  },
  textField: {
    marginBottom: '12px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  locationField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    width: '20%',
  }
}));

export default function LayoutTextFields(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        id="title"
        label="Title*"
        // defaultValue="Default Value"
        className={classes.textField}
        helperText="*Required"
        variant="outlined"
        onChange={props.handleOnChangeInput}
        value={props.title}
        error={props.isError}
      />
      <TextField
        id="description"
        label="Description"
        multiline
        className={classes.textField}
        rows={12}
        // defaultValue="Default Value"
        variant="outlined"
        style={{ marginBottom: "30px" }}
        onChange={props.handleOnChangeInput}
        value={props.description}
      />
      <div className={classes.textField} style={
        {
          display: "flex",
          flexWrap: "wrap",
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '25px',
          // alignContent: 'center',
        }
      }>
        <TextField
          id="city"
          label="City"
          // defaultValue="Default Value"
          className={classes.locationField}
          style={{ width: "55%" }}
          variant="outlined"
          onChange={props.handleOnChangeInput}
          value={props.city}
        />
        <TextField
          id="state"
          label="State"
          // defaultValue="Default Value"
          className={classes.locationField}
          variant="outlined"
          onChange={props.handleOnChangeInput}
          value={props.state}
        />
        <TextField
          id="zipcode"
          label="Zip"
          // defaultValue="Default Value"
          className={classes.locationField}
          variant="outlined"
          onChange={props.handleOnChangeInput}
          value={props.zipcode}
        />
      </div>
      <TextField
        id="price"
        label="Price"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        // defaultValue="Default Value"
        className={classes.locationField}
        style={{ width: "45%", marginLeft: 'auto', marginRight: 'auto', marginBottom: "30px" }}
        variant="filled"
        onChange={props.handleOnChangeInput}
        value={props.price}
      />
      <Button
        variant="contained"
        // color="secondary"
        component="span"
        color="secondary"
        style={{}}
        style={{
          width: "35%",
          marginLeft: 'auto',
          marginRight: 'auto',
          background: '#4C6B71'
        }}
        onClick={props.handleSubmit}
      // style={{ background: '#4C6B71' }}
      >
        Submit
        </Button>
    </div>
  );
}
