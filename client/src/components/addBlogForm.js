import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import API from '../utils/API';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core'
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      textAlign: "center",
      boxShadow: "0 0 5px"
    },
  }));
  
  export default function AddProductForm() {
  
    const classes = useStyles();
  
    const titleRef = useRef();
    const bodyRef = useRef();
  
    function AddBlog() {
      console.log(titleRef.current.value);
      console.log(bodyRef.current.value);
      API.saveProduct({
        Title: titleRef.current.value,
        Body: bodyRef.current.value,
      }).then(res => console.log("Blog created!! burkeep!"))
    }
  
  
    const Type = [
      {
        value: 'Clothing',
        label: 'Clothing',
      },
      {
        value: 'Stand Up',
        label: 'Stand Up',
      },
      {
        value: 'Relic',
        label: 'Relic',
      },
      {
        value: 'Used Kitchenware',
        label: 'Used Kitchenware',
      },
    ];
  
    const genders = [
      {
        value: 'Female',
        label: 'Female'
      },
      {
        value: 'Male',
        label: 'Male'
      },
      {
        value: 'Unisex',
        label: 'Unisex'
      }
    ]
  
  
  
    return (
      <div>
  
        <div>
          <Grid container diretion="row" xs={12}>
            <Grid item xs={2}></Grid>
  
            <Grid container direction="column" xs={3}>
              <form className={classes.root} noValidate autoComplete="off" bgcolor="primary.main">
                <h2>Write a blog</h2>
                <FormControl fullWidth>
                  <TextField
                    label="Item Name"
                    variant="filled"
                    inputRef={itemRef}
                    fullWidth={true}
                  />
                  <FilledInput
                    id="filled-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    inputRef={priceRef}
                  />
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Type"
                    variant="filled"
                    inputRef={typeRef}
                  >
                    {Type.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
  
                  <TextField
                    label="Item Description"
                    variant="filled"
                    inputRef={descriptionRef}
                  />
                  <TextField
                    label="Quantity"
                    variant="filled"
                    inputRef={quantityRef}
                  />
                  <TextField
                    select
                    label="Gender"
                    variant="filled"
                    inputRef={genderRef}
                  >
                    {genders.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <Button variant="contained" color="primary" onClick={() => AddItem()}>
                  Submit
              </Button>
              </form>
            </Grid>
  
  
          </Grid>
        </div>
      </div>
    );
  }