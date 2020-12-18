import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    margin: '16px',
    width: 255,
    borderRadius: 15,
    border: '1px solid #CFD4C7'
  },
  media: {
    height: 180
  },
  content: {
    background: 'linear-gradient(45deg, #FEF9EE 40%, #CFD4C7 90%)'
  }
});

const productCard = (props) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      onClick={props.clicked}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.imageURL}
          title={props.title}
          data-id={props._id}
        />
        <CardContent className={classes.content} data-id={props._id}>
          <Typography gutterBottom variant="h5" component="h2" data-id={props._id}>
            {props.title}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p" data-id={props._id}>
            Price: ${props.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" data-id={props._id}>
            {props.city}, {props.state}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default productCard