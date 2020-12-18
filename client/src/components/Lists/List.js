import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import HistoryIcon from '@material-ui/icons/History';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#CFD4C7',

    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  title: {

  }
}));

export default function SelectedListItem(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="primary history folder">
        <ListItem alignItems='center'>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Search History:" />
        </ListItem>
        <Divider />
        {props.searchNames.map((name, index) => {
          return (
            <ListItem
              button
              key={index}
              selected={props.selectedIndex === index}
              onClick={(event) => props.handleListItemClick(index, name)}
            >
              <ListItemText primary={name} />
              {(name === 'Camera' || name === 'Boiler') ?
                null :
                <ListItemSecondaryAction onClick={() => props.handleListItemRemove(name)}>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>}
            </ListItem>
          )
        })}
      </List>
    </div >
  );
}
