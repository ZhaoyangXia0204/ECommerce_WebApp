import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import API from '../utils/API';
import { useStoreContext } from "../utils/GlobalState";
import EditBlogModal from './EditBlogModal'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function OutlinedCard(props) {

const [state, dispatch] = useStoreContext()


function loadBlogs() {
    API.getBlogPosts().then(res => {
      dispatch({
        type: "GET_BLOGS",
        blogs: res.data
      })
    })
    .catch(err => console.log(err));
  };


function deleteBlog (id) {
  console.log(id);
  API.deleteBlogPost(id);
  setTimeout(() => {
    loadBlogs()
  }, 100);
}


  // const [state, dispatch] = useStoreContext();
  const classes = useStyles();

  // console.log("state", state.blogPosts)

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography color="textSecondary" variant="h4" gutterBottom>
          {props.Title}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.Body}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Date Published: {props.Date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" size="small" onClick={() => deleteBlog(props.Key)}>Delete!</Button>
        <EditBlogModal
        id={props.Key}
        Title={props.Title}
        Body= {props.Body}
        />
      </CardActions>
    </Card>
  );
}
