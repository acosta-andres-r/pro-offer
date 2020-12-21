import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import UploadBtn from "../../Buttons/Upload/Upload"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto 15px auto',
    width: '45%',
    borderRadius: 5,
    border: '1px solid #CFD4C7',
    // flexGrow: 2,

    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  media: {
    height: 350,
    [theme.breakpoints.down('sm')]: {
      height: 350
    },
  },
  content: {
    background: 'linear-gradient( #CFD4C7 20%, #FEF9EE 90%)',
    // backgroundColor: '#CFD4C7',
    // background: 'rgb(207, 212, 199)',
  }
}));

const viewProductCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} >
      <div>
        <CardMedia
          className={classes.media}
          title="Image to Upload"
          image={props.imageURL}
          data-public={props.public_id}
        />
        <CardContent className={classes.content} >
          {/* <UploadBtn
            handleUploadClick={props.handleUploadClick}
            handleDeleteClick={props.handleDeleteClick} /> */}
          {props.children}
        </CardContent>
      </div>
    </Card>
  );
}

export default viewProductCard;