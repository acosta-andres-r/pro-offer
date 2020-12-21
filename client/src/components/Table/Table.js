import React from 'react';
import API from '../../utils/API';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

import priceFormatter from '../../utils/priceFormat'

const useStyles = makeStyles((theme) => ({
  table: {
    height: "78vh",
    width: '80%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    }
  },
}));

const usdPrice = {
  // type: 'number',
  valueFormatter: ({ value }) => priceFormatter(value),
  cellClassName: 'font-tabular-nums',
};

const columns = (redirect, deleteProduct, editProduct) => {
  return [
    {
      field: 'id',
      width: 70,
      // headerName: 'ID',
      renderHeader: () => (
        <strong style={{ fontSize: '18px' }}>
          {'ID'}
        </strong>
      ),
    },
    {
      field: 'imageURL',
      width: 120,
      sortable: false,
      headerAlign: 'center',
      // headerName: 'Image',
      renderHeader: () => (
        <span role="img" aria-label="enjoy">
          📷
        </span>
      ),
      renderCell: (params) => (
        <img
          src={params.value}
          style={{ marginLeft: 1, height: '100%' }}
        />
      ),
    },
    {
      field: 'title',
      width: 320,
      flex: 1,
      // headerName: 'Title', 
      renderHeader: () => (
        <strong style={{ fontSize: '18px' }}>
          {'Title'}
        </strong>
      ),
      renderCell: (params) => (
        <Typography
          variant="body1"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            redirect(params.row._id)
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'price',
      width: 130,
      // headerName: 'price',
      renderHeader: () => (
        <strong style={{ fontSize: '18px' }}>
          {'Price'}
        </strong>
      ),
      ...usdPrice,
    },
    {
      field: 'city',
      width: 130,
      // headerName: 'City''Houston'
      renderHeader: () => (
        <strong style={{ fontSize: '18px' }}>
          {'City'}
        </strong>
      ),
    },
    {
      field: 'state',
      width: 95,
      // headerName: 'City',
      renderHeader: () => (
        <strong style={{ fontSize: '18px' }}>
          {'State'}
        </strong>
      ),
    },
    {
      field: 'zipcode',
      width: 90,
      // headerName: 'City',
      renderHeader: () => (
        <strong style={{ fontSize: '18px' }}>
          {'Zip'}
        </strong>
      ),
    },
    {
      field: 'edit',
      sortable: false,
      width: 70,
      // headerName: 'Edit',
      renderHeader: () => (
        <strong style={{ fontSize: '18px' }}>
          {'Edit'}
        </strong>
      ),
      renderCell: (params) => (
        <IconButton
          color="primary"
          aria-label="delete"
          onClick={() => {
            console.log('edit')
            editProduct(params.row._id)
          }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      sortable: false,
      width: 70,
      // headerName: 'Del',
      renderHeader: () => (
        <strong style={{ fontSize: '18px' }}>
          {'Del'}
        </strong>
      ),
      renderCell: (params) => (
        <IconButton
          color="secondary"
          aria-label="delete"
          onClick={() => {
            console.log('delete')
            deleteProduct(params.row._id)
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]
};

export default function DataTable(props) {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <DataGrid
        rows={props.rows}
        columns={
          columns(
            props.diplayProductInfoHandler,
            props.handleDeleteProduct,
            props.handleEditPage
          )
        }
        loading={false}
        hideFooterPagination={true}
        hideFooterSelectedRowCount={true}
        density='comfortable'
      />
    </div>
  );
}
