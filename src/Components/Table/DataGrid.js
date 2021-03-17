import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

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

const headCells = [
    { id: 'Selected', numeric: false, disablePadding: false, label: 'Selected' },
    { id: 'View', numeric: false, disablePadding: false, label: 'view' },
    { id: 'create', numeric: false, disablePadding: false, label: 'create' },
    { id: 'update', numeric: false, disablePadding: false, label: 'update' },
    { id: 'delete', numeric: false, disablePadding: false, label: 'delete' },
  { id: 'created date', numeric: false, disablePadding: false, label: 'created date' },
  { id: 'created by', numeric: false, disablePadding: false, label: 'created by' },
  { id: 'updated date', numeric: false, disablePadding: false, label: 'updated date' },
  { id: 'updated by', numeric: false, disablePadding: false, label: 'updated by' },

];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
 
  return (
    <TableHead>
      <TableRow>
        <TableCell style={{boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 10px",position:'sticky',top:0,background:'#033444', color:'white',zIndex:20}}  padding="checkbox">
          <Checkbox
          style={{color:'white', fontFamily:'Poppinsbold'}}
          indeterminateIcon={<RemoveCircleIcon/>}
          icon={<RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>}
          checkedIcon={<CheckCircleIcon></CheckCircleIcon>}
           indeterminate={numSelected > 0 && numSelected < rowCount}
           checked={rowCount > 0 && numSelected === rowCount}
           onChange={onSelectAllClick}
           inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            style={{ fontFamily:'Poppinsbold',boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 10px",zIndex:20,position:'sticky',top:0,background:'#033444',color:'white', fontWeight:'bold'}}
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
     

      
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height:"310px",
        
      },
      paper: {
        width: '100%',
        position:'relative',
        overflow:'auto',
        height:'310px',
        marginBottom: theme.spacing(2),
      },
      sort:{
        '&$selected':{
    
        }
      },
      table: {
        minWidth: 750,
        
        
       
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
        fontSize:10,
        fontWeight:'bold',
        "&:hover":{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
        }
        
      },
      changeRowButton:{
       
        fontSize:10,
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
  useEffect(()=>{
    setSelected(props.dataSelected)
  },[props.dataSelected])
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
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
  const handleDragTask = (ev)=>{
       
    if(ev.target.draggable==true){
        
        
        if(!ev.target.id){
        
            ev.dataTransfer.setData("srcId", ev.target.parentNode.id);

        }else{
           
            ev.dataTransfer.setData("srcId", ev.target.id);
        }
    }else{

        console.log('asas')
    }
}
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
   
      <Paper className={classes.paper + ' drag_box1'}>
        
        <TableContainer  className={classes.paper}>
          <Table
          
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'small'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              style={{position:'sticky'}}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {
                props.data.map((row, index) => {
                  const isItemSelected = isSelected(row.menuId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                        draggable="true"
                      hover
                      onDragStart={handleDragTask}
                      style={{cursor:'pointer'}}
                      className={classes.tableRow}
                      classes={{ hover: classes.hover, selected:classes.selected }}
                      onClick={(event) => handleClick(event, row.menuId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.menuId}
                      id={row.menuId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          icon={<RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>}
                          checkedIcon={<CheckCircleIcon></CheckCircleIcon>}
                          color = "primary"
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.menuDesc}
                      </TableCell>
                      <TableCell align="right">{row.accessView}</TableCell>
                      <TableCell align="right">{row.accessCreate}</TableCell>
                      <TableCell align="right">{row.accessUpdate}</TableCell>
                      <TableCell align="right">{row.accessDelete}</TableCell>
                      <TableCell align="right">{row.createdTime}</TableCell>
                      <TableCell align="right">{row.createdUser}</TableCell>
                      <TableCell align="right">{row.updatedTime}</TableCell>
                      <TableCell align="right">{row.updatedUser}</TableCell>
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
      
  
  );
}
