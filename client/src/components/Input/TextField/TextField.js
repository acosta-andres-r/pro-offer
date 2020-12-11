import React, { useState } from 'react';
import Axios from '../../../utils/API'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const inputForm = [
  { label: "Product Name:", name: "title" },
  { label: "Description:", name: "description" },
  // { label: "Posted:", name: "posted" },
  { label: "Price:", name: "price" },
  { label: "City:", name: "city" },
  { label: "State:", name: "state" },
  { label: "Zip code:", name: "zipcode" },
]

const emptyInput = {
  title: "",
  description: "",
  // posted: "",
  city: "",
  state: "",
  zipcode: "",
  price: "",
  imageURL: "",
  public_id: ""
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '150px',
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();

  const [input, setInput] = useState({...emptyInput});

  // const [name, setName] = React.useState('Cat in the Hat');
  const handleChange = (event) => {
    // setName(event.target.value);
    const { name, value } = event.target;
    // console.log(event.target);
    setInput({ ...input, [name]: value });
  };

  const handleSaveInput = () => {
    console.log(input);
    props.save(input);
    setInput({ ...emptyInput });
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {inputForm.map((element, index) => (
        <TextField
          key={index}
          id="standard-name"
          label={element.label}
          name={element.name}
          value={input[element.name]}
          onChange={handleChange} />
      ))
      }
      <Button
        variant="contained"
        onClick={handleSaveInput}
      >Default</Button>
    </form>
  );
}