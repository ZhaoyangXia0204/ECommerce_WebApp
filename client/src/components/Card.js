import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from './Modal';
import { useStoreContext } from "../utils/GlobalState";
import API from '../utils/API';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: "40px",
    marginBottom: "40px",
    marginRight: "10px"
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  const [state, dispatch] = useStoreContext();

  // function setCurrentProduct (id) {
  //   API.getProduct(id).then(res => dispatch({type: "SET_CURRENT_PRODUCT", product: res.data}))
  // }

  function addToWish(id) {
    console.log(id)
    API.getProduct(id).then(res => dispatch({ type: "ADD_TO_WISH", product: res.data }))
  }

  function setWishDb() {
    API.saveWish(state.currentUser.id, state.wishList).then(res => console.log("saved to wishList", res.data)).then(dispatch({
      type: "SET_USER",
      user: {
        ...state.currentUser,
        wishList: state.wishList
      }
    }))
  }

  useEffect(() => {
    setWishDb();
  }, [state.wishList])

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.name}
          className={classes.media}
          image={props.Image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Category: {props.type}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            ${props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" size="small" color="primary" key={props.id} onClick={() => addToWish(props.id)}>
          Wishlist!
        </Button>
        <Modal
          name={props.name}
          description={props.description}
          price={props.price}
          id={props.id}
          Image={props.Image}
          size={props.gender}
          quantity={props.quantity}
        />
      </CardActions>
    </Card>
  );
}
