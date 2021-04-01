import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const headCells = [];
  let i=0;
  if(props.data){
    for(const key of props.data ){
      if(i==0){
        headCells.push({ id: 'SELECTED', numeric: true, disablePadding: true, label: 'Selected' })
  
      }
      else{
        headCells.push({ id: key, numeric: false, disablePadding: false, label: key })
      }
      i++;
    }
    
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell  style={{boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 10px",position:'sticky',top:0,background:'#033444', color:'white',zIndex:20}}  padding="checkbox">
          <Checkbox
            style={{color:'#3bbad6'}}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            icon={<RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>}
            checkedIcon={<CheckCircleIcon></CheckCircleIcon>}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
          style={{ fontFamily:'Poppinsbold',boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 10px",zIndex:20,position:'sticky',top:0,background:'#033444',color:'white',fontSize:'14px', fontWeight:'bold'}}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            
              {headCell.label}
              
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        fontSize:'12px'
      },
      paper: {
        width: '100%',
        position:'relative',
        overflow:'auto',
        width:'584px',
        marginBottom: theme.spacing(2),
      },
      sort:{
        '&$selected':{
    
        }
      },
      table: {
        width: 600,
        
      },
      tableRow: {
        "&$selected":{
          // backgroundColor: "#c7e0f4"
          backgroundColor: "rgba(204, 219, 232,0.5)",
        }, "&$selected:hover":{
          
         
          boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
          // boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
         
    
        },
        '&$hover:hover': {
          backgroundColor: "white",
        
          boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
          // boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
          // boxShadow: "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px"
          // boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
          
          // border: "1px solid rgba(0,0,0,0.75)",
          // backgroundColor: "#c7e0f4",
          // boxShadow:"inset 0 -1px 3px rgba(255,255,255,0.50), inset 0 2px 3px rgba(255,255,255,0.20), inset 0 -20px 5px rgba(255,255,255,0.15), inset 5px -10px 5px rgba(255,255,255,0.15), inset -5px -10px 5px rgba(255,255,255,0.15),inset 0 15px 20px #fff, inset 0 -15px 30px rgba(0,0,0,0.1), 0 2px 1px #fff"
        },
        '&$hover:hover td:nth-child(2) span  ':{
          
            display:'none !important'
        },  
        '&$hover:hover td:nth-child(1) span  ':{
          
          display:'block !important'
        },
        '&$hover:hover td:nth-child(2) div  ':{
          
          display:'flex !important'
        }
        
      },
      someTextField: {
        height: 20,
        width:'100%',
       textAlign:'center',
       
        
    
      },
      // tableCell: {
      //   "$hover:hover &": {
      //     color: "pink"
      //   }
      changeRow:{
        position:"absolute",
        left:5, bottom:10, 
        fontSize:12,
        fontWeight:'bold',
        "&:hover":{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
        }
        
      },
      changeRowButton:{
       
        fontSize:12,
        fontWeight:'bold',
        "&:hover":{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
        }
        
      },
      icon:{
        
        "&:hover":{
          color:'black',
        }
      },
      hover: {},
      selected: {},
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [save, setSave] = useState(false)
 
    useEffect(()=>{
        setSelected(props?.selectedTable?.length>0?props.selectedTable:[])
    },[props])
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.data.map((n) => n[props.schema[0]]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    props.onClick(newSelected)
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const handleChange =(e)=>{
      
      props.onChange(e.target.name,e.target.id ,e.target.checked)
  }
  console.log(props.data)
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const handleDragTask = (ev)=>{
       
    if(ev.target.draggable==true){
        
        
        if(!ev.target.id){
        
            ev.dataTransfer.setData("srcId", ev.target.parentNode.id);

        }else{
           
            ev.dataTransfer.setData("srcId", ev.target.id);
        }
    }else{

       
    }
}
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper+ " dragboxTable"}>
     
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'small'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              data={props.schema}
              
              rowCount={props.data.length}
            />
            <TableBody>
             
              {
                props.data.map((row, index) => {
                  const isItemSelected = isSelected(row[props.schema[0]]);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  return (
                    <TableRow
                      hover
                      draggable="true"
                      onDragEnd={props.onDragEnd}
                      onDragStart={handleDragTask}
                      onClick={(event) => handleClick(event, row[props.schema[0]])}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      style={{cursor:'pointer'}}
                      id={"target|"+row[props.schema[0]]}
                      className={classes.tableRow}
                      // classes={{ hover: classes.hover, selected:classes.selected }}
                      key={row[props.schema[0]]}
                      selected={isItemSelected}
                    >
                        <TableCell padding="checkbox">
                          <Checkbox
                            style={{color:'#3bbad6'}}
                            checked={isItemSelected}
                            icon={<RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>}
                            checkedIcon={<CheckCircleIcon></CheckCircleIcon>}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        {props.schema.map((column,index1)=>{
                            if(column=="accessView" || column=="accessCreate" || column=="accessUpdate" || column=="accessDelete"){
                              return(<TableCell key={index1} align="center">
                                <Checkbox id={row[props.schema[0]]}  color="primary" value={row[column]} checked={row[column]}
            onChange={handleChange}
            name={column}></Checkbox>
                              </TableCell>)
                            }else{

                              return(
                                  <>
  
                          <TableCell key={index1} align="center"><span style={{fontSize:'12px', fontFamily:'Poppinsbold'}}>{row[column]}</span></TableCell>
                         
                                  </>
                              )
                            }
                            
                        })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      
      </Paper>
  
    </div>
  );
}
