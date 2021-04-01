import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {Icon} from 'rsuite'
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import {RiEditLine} from 'react-icons/ri'
import EditIcon from '@material-ui/icons/Edit';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FilterListIcon from '@material-ui/icons/FilterList';
import { VscSourceControl } from "react-icons/vsc";
import {useSelector,useDispatch} from 'react-redux';
// import Tabs from  '../tabkomponen/tabs.js';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AlertDismiss from './../Alert/AlertDismiss'
import Button from '@material-ui/core/Button';

import {BiTrash} from 'react-icons/bi'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Step from './../PopUp/Step'
// import { Button } from 'bootstrap';
import {ChangeSelectedRow, ChangeRowPageTable} from './../../Redux/Table/Action'
import Popover from '@material-ui/core/Popover';
import { set } from 'lodash';
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [cuy,setCuy] = React.useState([]);
  const {t} = useTranslation();
 
const cekLebarParent = (name,lebarparent)=>{
  let hey = Object.keys(cuy);
  if(hey.findIndex(cek=> cek==name)==-1  && name.toString().includes("resize")){
    let ambil = cuy;
    ambil[name] = lebarparent;
    setCuy(ambil)
    console.log(cuy)
  }
}
const MouseDown = (e)=>{
 

  let prevX = e.target.clientX;
  let prevY = e.target.clientY;
  let parent = e.target.parentNode.children[0];
  cekLebarParent(e.target.id, e.target.parentNode.children[0].getBoundingClientRect().width)

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);
  let cuy1 = e.target.parentNode.children[0].getBoundingClientRect().width+10;
  let hay = cuy[e.target.id];

  function mousemove(e) {
    
    const rect = parent.getBoundingClientRect();
    // createSortHandler=null;
    // if(hay+10<=cuy1){
      cuy1 = isNaN(rect.width - (prevX - e.clientX))?cuy1:rect.width - (prevX - e.clientX);
      
      // }
      
      parent.style.width = rect.width - (prevX - e.clientX) + "px";
    

    prevX = e.clientX;
    prevY = e.clientY;
  }

  function mouseup() {
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
    
  }
}
  let createSortHandler = (property) => (event) => {
    if(event.target.id.toString().includes("resize")){
      
    }else{
      props.onClick("order",property)
      onRequestSort(event, property);

    }
  };

  // console.log("hay"+props.data)
  const headCells = [];
  let i=0;
  if(props.schema){
    for(const key of props.schemaHeader ){
      // let hmm = JSON.parse(JSON.stringify(key))
      // let label = ''
      // hmm = hmm.split(/(?=[A-Z])/)
      // for(const cobaloh of hmm){
      //   if(cobaloh.toUpperCase()=="ID"){
      //     label = label + cobaloh.charAt(0).toUpperCase() + cobaloh.substring(1).toUpperCase();
      //   }else{
      //     label = label + cobaloh.charAt(0).toUpperCase() + cobaloh.substring(1);

      //   }
      // }
      // console.log(label)
      if(i==0){
        headCells.push({ id: 'no', numeric: true, disablePadding: true, label: t("lblNo") })
  
      }
    
      else{
        headCells.push({ id: props.schema[i], numeric: false, disablePadding: false, label: t(key) })
      }
      i++;
    }
    
  }
//  headCells = [
//     { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
//     { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
//     { id: 'password', numeric: false, disablePadding: false, label: 'Password' },
//     { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
//     { id: 'nik', numeric: false, disablePadding: false, label: 'Nik' },
//     { id: 'dept', numeric: false, disablePadding: false, label: 'Departement' },
//     { id: 'group', numeric: false, disablePadding: false, label: 'Group' },


//   ];

const tableSortEnter = (e)=>{
    // if(e.target.tagName=="TH"){
    //   e.target.children[1].style.display="block";
    //   e.target.children[1].style.cursor="col-resize";

    // }
    if(e.target.closest('TH')){
      e.target.closest('TH').children[1].style.display="block";
      e.target.closest('TH').children[1].style.cursor="col-resize";
    }
          
}
const tableSortLeave = (e)=>{
  
  if(e.target.closest('TH')){
    e.target.closest('TH').children[1].style.display="none";
  
  }

  

}  
  return (
  
    <TableHead >
      
      <TableRow >
        {props.tab=="all"? <TableCell style={{boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 10px",position:'sticky',top:0,background:'#033444', color:'white',zIndex:20}}  padding="checkbox">
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
        </TableCell>:null}
       
        {headCells.map((headCell) => {
          if(headCell.id!="workflowStep"){
          return(
          <TableCell 
        
          onMouseEnter={tableSortEnter}
          onMouseLeave={tableSortLeave}
          style={{ fontFamily:'Poppinsbold',boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 10px",zIndex:20,position:'sticky',top:0,background:'#033444',color:'white', fontWeight:'bold'}}
            key={headCell.id}
          
          
            // padding={20}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
           <TableSortLabel
              className={classes.sort}
              style={{color:'white'}}
              active={orderBy === headCell.id}
              direction={orderBy == headCell.id?order:'asc'}
              onClick={createSortHandler(headCell.id)}

            >

              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}  >
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null} */}
              &nbsp;
             
  
            </TableSortLabel>
            <div  id={"resize"+headCell.label}  onMouseDown={MouseDown} style={{display:orderBy === headCell.id?'block':'none',position:'absolute',right:10,width:2,top:0,bottom:0,height:"100%", borderRight:'3px solid rgba(0,0,0,0.5)'}}></div>
           
          </TableCell>
         
        )}})}

          
          {props.tab!="all"?<TableCell style={{ fontFamily:'Poppinsbold',boxShadow: "rgba(0, 0, 0, 0.04) 0px 10px 10px",zIndex:20,position:'sticky',top:0,background:'#033444',color:'white', fontWeight:'bold'}} >
            {'Action'}
          </TableCell>:null}
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
        color: "#0078d4",
        backgroundColor: "#c7e0f4",
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
    fontWeight:'bold'
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
          {props.name}
        </Typography>
      )}

      {/* {numSelected > 0 ? (
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
      )} */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    position:'relative',
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
    position:"relative",
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
      color:"#3bbad6",
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
  const {t} = useTranslation();
  const classes = useStyles(props);
  const selectedusersetting = useSelector(state =>state.SelectedRow);
  const paging = useSelector(state=>state.Paging);
  const dispatch = useDispatch();
  const SelectedRowPageCombo = useSelector(state=>state.SelectedRowPage)
  const reduxComboUser = useSelector(state=>state.UserSetting);
  const [comboRowperpage, setComboRowPerpage] = React.useState([]);
  const [hiding, setHiding] = React.useState("none");
  const [order, setOrder] = React.useState();
  const [orderBy, setOrderBy] = React.useState();
  const [selected, setSelected] = React.useState([1,2,3]);
  const [page, setPage] = React.useState(paging);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(0);
  const [deleteArray, setdeleteArray] = React.useState([]);
  const [save, setSave] = useState(false)
  const [schema, setSchema] = useState();
  const [alert, setAlert] = useState();
  const [stateStep, setStateStep] = useState()
  const [stateDataStep, setStateDataStep] = useState()
  const [tampil, setTampil] = useState(true)
  const [stateOpen, setStateOpen]= useState();
  const ButtonTable = styled.button`
    padding-right:7px;
    padding-left:7px;
    padding-top:2px;
    padding-bottom:2px;
    background:${props.themeColor};
    color:white;
    border-radius:10px;
    &:hover {
      background: ${props.themeColorBgHover}; // <Thing> when hovered
    }
  `
  const handleCloseSave = (handle)=>{
    if(handle=="no"){
      
      setSave(false)
    }else{
      props.onClick("DELETE", deleteArray)
      setSave(false)
    }
  }

  let deptName = [];
  useEffect(()=>{
    if(reduxComboUser!=""){
      let combo = []
      let selected1 = 0;
      for(const lala of reduxComboUser.rowOfPage){
        combo.push(parseInt(lala.value))
        if(lala.selected=="yes"){
          selected1 = parseInt(lala.value)
        }
      }
      setComboRowPerpage(combo)
      setRowsPerPage(selected1)
      dispatch(ChangeRowPageTable(selected1))
      
    }

  },[reduxComboUser, SelectedRowPageCombo])
  useEffect(()=>{
    if(props?.data){
      for(let i in props.data){
        setStateOpen({
          [i]:false
        })
      }
    }
    if(props.schema){
      let i = 0
      let cuy = []
      for(const hmm of props.schema){
        if((props.judulSekarang=="005" || props.judulSekarang=="006") && i==3){
          break
        }else{
          cuy.push(hmm)
        }
        
        i++
      }
      setSchema(cuy)
    }
    if(props.tab!="all"){
      let hmm = []
      props.data.map((rows, index)=>{
        hmm.push(rows.workflowStep)
      })
      setStateDataStep(hmm)
    }
    if(document.querySelector(".MuiTablePagination-caption").innerHTML=="Rows per page:"){
      document.querySelector(".MuiTablePagination-caption").innerHTML=t("lblRowofpage")
    }
    
  },[props])
  
  useEffect(()=>{
    setSelected(selectedusersetting);
},[selectedusersetting])

  function createData(userdata) {
    return {userdata};
  }
  const rows = [];
  
  let dataUser = props.data;
// console.log(props.deptName[0])
// let nomorTogel = rowsPerPage*(page+1)-rowsPerPage;
//   for(let i=0;i<dataUser.length;i++){
//     nomorTogel++;
//     rows[i] = createData(dataUser[i].user_id,(nomorTogel),dataUser[i].username, dataUser[i].name, dataUser[i].password,props.roleName[i], dataUser[i].nik,props.deptName[i], props.groupName[i]);
    
//   }

  

const kirimisOpen = (isOpen) => {
  return {
    type: "CLOSE",
    payload: {
      isOpen: isOpen,
    }
  }
}

  const kirimuserselected = (jumlah, data)=>{
    return{
      type:"SELECTEDUSER",
      payload:{
        selectedUser: jumlah,
        selectedId:data
      }
    }
  }
 
  
  let handleLeave = (e)=>{
    
    
    // else if(e.target.parentNode==null){

    // }else if(e.target.parentNode.children[0]==null){

    // }else if(e.target.parentNode.children[0].children[0]==null){

    // }
    // else{
    //   e.target.parentNode.children[0].children[0].style.display="none";
   
    // }

    // if(e.target.parentNode.children[1]==null){

    // }else if(e.target.parentNode.children[1].children[0]==null){

    // }else if(e.target.parentNode.children[1].children[1]==null){
      
    // }else{
    //   e.target.parentNode.children[1].children[0].style.display="block";
    //   e.target.parentNode.children[1].children[1].style.display="none";
    // }
    // console.log(e.target.parentNode.tagName)
      // if(e.target.closest('TR').id.toString().includes('rowParent')){
      //     e.target.closest("TR").children[1].children[0].style.display="block";
      //     e.target.closest("TR").children[1].children[1].style.display="none";  
      // }
      // if(e.target.closest('TR').id.toString().includes('rowParent') && selected.length==0){
      //   e.target.closest("TR").children[0].children[0].style.display="none";
      
      // }




    // if(e.target.parentNode.tagName=="TR" ){
     
    //   e.target.parentNode.children[1].children[0].style.display="block";
    //   e.target.parentNode.children[1].children[1].style.display="none";  
    // }else if(e.target.parentNode.parentNode.tagName=="TR" ){
    
    //   e.target.parentNode.parentNode.children[1].children[0].style.display="block";
    //   e.target.parentNode.parentNode.children[1].children[1].style.display="none";  
    // }
    // else if(e.target.parentNode.parentNode.parentNode.tagName=="TR" ){
     
    //   e.target.parentNode.parentNode.parentNode.children[1].children[0].style.display="block";
    //   e.target.parentNode.parentNode.parentNode.children[1].children[1].style.display="none";  
    // }else if(e.target.parentNode.parentNode.parentNode.parentNode.tagName=="TR" ){
      
    //   e.target.parentNode.parentNode.parentNode.parentNode.children[1].children[0].style.display="block";
    //   e.target.parentNode.parentNode.parentNode.parentNode.children[1].children[1].style.display="none";  
    // }

    // if(e.target.parentNode.tagName=="TR" && selected.length==0){
    //   e.target.parentNode.children[0].children[0].style.display="none";
      
    // }else if(e.target.parentNode.parentNode.tagName=="TR" && selected.length==0){
    //   e.target.parentNode.parentNode.children[0].children[0].style.display="none";
     
    // }
    // else if(e.target.parentNode.parentNode.parentNode.tagName=="TR" && selected.length==0){
    //   e.target.parentNode.parentNode.parentNode.children[0].children[0].style.display="none";
      
    // }else if(e.target.parentNode.parentNode.parentNode.parentNode.tagName=="TR" && selected.length==0){
    //   e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0].style.display="none";
      
    // }
  }
  const onChangeComboUser = (e)=>{
   
      if(e.target.name=="combo1"){
          const cuy = [...comboRowperpage];
          let ganti = parseInt(e.target.value?e.target.value:1);
          if(parseInt(e.target.value?e.target.value:1)==cuy[1]){
            ganti = reduxComboUser[0];
          }
          if(parseInt(e.target.value?e.target.value:1)==cuy[2]){
            ganti = reduxComboUser[0];
          }

          cuy[0] = ganti;
          setComboRowPerpage(cuy)
      }else if(e.target.name=="combo2"){
       
        const cuy = [...comboRowperpage];
        let ganti = parseInt(e.target.value?e.target.value:1);
        if(parseInt(e.target.value?e.target.value:1)==cuy[0]){
          ganti = reduxComboUser[1];
        }
        if(parseInt(e.target.value?e.target.value:1)==cuy[2]){
          ganti = reduxComboUser[1];
        }

        cuy[1] = ganti;
        setComboRowPerpage(cuy)
      }else if(e.target.name=="combo3"){
        const cuy = [...comboRowperpage];
        let ganti = parseInt(e.target.value?e.target.value:1);
        if(parseInt(e.target.value?e.target.value:1)==cuy[1]){
          ganti = reduxComboUser[2];
        }
        if(parseInt(e.target.value?e.target.value:1)==cuy[0]){
          ganti = reduxComboUser[2];
        }

        cuy[2] = ganti;
        setComboRowPerpage(cuy)
      }
  }
  const onResetComboUser = (e)=>{
   
      setComboRowPerpage([5,10,25]);
      setRowsPerPage(parseInt(5, 10));
      dispatch(kirimurowperpage(5, 1))
      dispatch(ChangeComboUser([5,10,25]))
      setPage(0); 
      setAnchorEl(null);
}
const onSaveComboUser = (e)=>{
  const cuy = comboRowperpage;
  setComboRowPerpage(cuy.sort(function(a, b) {
    return a - b;
  }));
  dispatch(ChangeComboUser(cuy.sort(function(a, b) {
    return a - b;
  })))
  setRowsPerPage(parseInt(cuy[0], 10));
  dispatch(kirimurowperpage(cuy[0], 1))
  setPage(0); 
  setAnchorEl(null);
}

  const ChangeComboUser = (data)=>{
    return{
      type:"CHANGECOMBOROWUSER",
      payload:{
        user: data,
        
      }
    }
  }
  const kirimurowperpage = (jumlah, halaman)=>{
    return{
      type:"CHANGEROWUSER",
      payload:{
        jumlah: jumlah,
        halaman:halaman
      }
    }
  }
  let handleEnter = (e)=>{
    console.log('hay')
    // if(e.target.parentNode==null){

    // }else if(e.target.parentNode.children[0]==null){

    // }else if(e.target.parentNode.children[0].children[0]==null){

    // }else if(e.target.parentNode.children[1]==null){

    // }else if(e.target.parentNode.children[1].children[0]==null){

    // }else if(e.target.parentNode.children[1].children[1]==null){
      
    // }
    // if(e.target.closest('TR').id.toString().includes('rowParent')){
      
    //     e.target.closest("TR").children[0].children[0].style.display="block";
    //     // e.target.closest("TR").children[1].children[0].style.display="none";
    //     // e.target.closest("TR").children[1].children[1].style.display="flex";
    // }

    // if(e.target.parentNode.tagName=="TR"){
    //   e.target.parentNode.children[0].children[0].style.display="block";
    //   e.target.parentNode.children[1].children[0].style.display="none";
    //   e.target.parentNode.children[1].children[1].style.display="flex";

      
    // }else if(e.target.parentNode.parentNode.tagName=="TR"){
    //   e.target.parentNode.parentNode.children[0].children[0].style.display="block";
    //   e.target.parentNode.parentNode.children[1].children[0].style.display="none";
    //   e.target.parentNode.parentNode.children[1].children[1].style.display="flex";

      
    // }else if(e.target.parentNode.parentNode.parentNode.tagName=="TR"){
    //   e.target.parentNode.parentNode.parentNode.children[0].children[0].style.display="block";
    //   e.target.parentNode.parentNode.parentNode.children[1].children[0].style.display="none";
    //   e.target.parentNode.parentNode.parentNode.children[1].children[1].style.display="flex";

      
    // }else if(e.target.parentNode.parentNode.parentNode.parentNode.tagName=="TR"){
    //   e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0].style.display="block";
    //   e.target.parentNode.parentNode.parentNode.parentNode.children[1].children[0].style.display="none";
    //   e.target.parentNode.parentNode.parentNode.parentNode.children[1].children[1].style.display="flex";

      
    // }
    
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if(selected?.length>0){
      dispatch(ChangeSelectedRow([]))
      setSelected([]);
    }
    else if (event.target.checked) {
      const newSelecteds = props.data.map((n) => { if(n.pending=="no"){return n[props.schema[0]]}});
      const newSel = newSelecteds.filter(function (el) {
        return el != null;
      });

     
      let jumlah = newSelecteds.length;
      
      dispatch(ChangeSelectedRow(newSel))
     
      setSelected(newSel);
      return;
    }
    dispatch(kirimuserselected(0,[]))
    setSelected([]);
  };
  useEffect(()=>{
    if(selected?.length>0){
      setHiding("block");
     

        
      
    }else{
      setHiding("none")
    }
   
  },[selected])
  const handleyesDelete = (e)=>{
        
        setAnchorElu(false);
         
  }
  const handleClick1 =(event, name)=>{
    const updatepilih = [];
    updatepilih.push(name)
    if(event.target.parentNode.id.toString().includes("view") || event.target.id.toString().includes("view")){
     
      
      props.onClick("VIEW",updatepilih)
    }else  if(event.target.parentNode.id.toString().includes("action") || event.target.id.toString().includes("action")){
     
      
      props.onClick("ACTION",updatepilih)
    }
    else{
      
      let hmm = props?.data.findIndex(cuy=>cuy[props?.schema[0]]==name)
      let cuy = Object.keys(stateOpen)
      let cuya = ''
      for(let love of cuy){
        if(stateOpen[love]==true){
          cuya = love
        }
      }
      if(cuya==""){
        setStateOpen({...stateOpen,[hmm]:true})

      }else{
        setStateOpen({...stateOpen,[hmm]:true,[cuya]:false})

      }
     
      
    }
  }
  const handleClick = (event, name) => {
    if(event.target.parentNode.id.toString().includes("delete.") || event.target.id.toString().includes("delete.")){
      
      const deletepilih = [];
      deletepilih.push(name)
      setdeleteArray(deletepilih);
    
      setSave(true)
      setAlert('delete')
     



      // dispatch(kirimuserselected(1,deletepilih))
      
      
    }else if(event.target.parentNode.id.toString().includes("update.") || event.target.id.toString().includes("update.")){
      const updatepilih = [];
      updatepilih.push(name)
      
      props.onClick("EDIT",updatepilih)
      
    }else if(event.target.parentNode.id.toString().includes("detail.") || event.target.id.toString().includes("detail.")){
      const updatepilih = [];
      updatepilih.push(name)
      
      props.onClick("DETAIL",updatepilih)
      
    }
    else if(event.target.parentNode.id.toString().includes("change.") || event.target.id.toString().includes("change.")){
      const changepilih = [];
      changepilih.push(name)
      
      props.onClick(changepilih,"change")
      dispatch(kirimuserselected(1,changepilih))
    }else if(name=="orderby"){
        if(event.target.closest("TH")){
          let oreder = event.target.closest("TH").children[0].innerHTML.toString().split('&nbsp;')[0];
          const isAsc = orderBy == oreder && order === 'asc';
        
          const changeorder = [oreder,isAsc?'desc':'asc'];
          setOrder(isAsc?'desc':'asc');
          setOrderBy(oreder);
          props.onClick(changeorder,"orderby")
        }
    }else if(event.target.parentNode.id.toString().includes("view") || event.target.id.toString().includes("view")){
      const updatepilih = [];
      
      
      props.onClick("VIEW",event.target.id.split("|")[1])
    }
    else{
      const selectedIndex = selected?.indexOf(name);
    
    
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected?.slice(1));
      } else if (selectedIndex === selected?.length - 1) {
        newSelected = newSelected.concat(selected?.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      let jumlah = newSelected.length;
  
      dispatch(ChangeSelectedRow(newSelected))
      // dispatch(kirimuserselected(jumlah,newSelected))
      setSelected(newSelected);
    }
    
  };
  const onComboChange = (event)=>{
    if(event.target.innerHTML.trim()=="Change Combo Row"){
      console.log("hay")
    }
  }
  const onCombo = (event)=>{
    event.target.children[1].style.cursor="pointer";
    event.target.children[1].innerHTML = "Change Combo Row"
  }
  const leaveCombo = (event)=>{
    event.target.children[1].innerHTML = "Rows per page:"; 
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(kirimurowperpage(rowsPerPage, newPage+1))
    
   
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElu, setAnchorElu] = React.useState(false);

  const handleClickCombo = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseStep =()=>{}


  const handleCloseCombo = () => {
    setAnchorEl(null);
    setComboRowPerpage(reduxComboUser);
  };
  const handleCloseCombo1 = () => {
    setAnchorElu(false);
    
  };
  const openCombo = Boolean(anchorEl);
  const openCombo1 = Boolean(anchorElu);
  useEffect(()=>{
    console.log(rowsPerPage+" "+page)
  }, [page, rowsPerPage])
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    dispatch(kirimurowperpage(event.target.value, 1))
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => {
    if(selected){
      
      return selected.findIndex(cuy=>cuy==name)!==-1;
    }
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleClickAway = ()=>{
    
    setStateStep(false)
  }
  console.log(stateOpen)
  return (
    <div className={classes.root}>
    <AlertDismiss themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover} alert={alert} open={save} onClick={handleCloseSave}></AlertDismiss>

      <Paper className={classes.paper}>
      {/* <Tabs>
        <div label="Gator">
          See ya later, <em>Alligator</em>!
        </div>
        <div label="Croc">
          After 'while, <em>Crocodile</em>!
        </div>
        <div label="Sarcosuchus">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
      </Tabs> */}
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        
        <TableContainer style={{maxHeight: 360,fontFamily:'Poppinsbold'}}>
         
          <Table
           
         
            className={classes.table}
            
            size={'small'}
            aria-label="caption table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected?.length?selected.length:0}
              order={order}
              orderBy={orderBy}
              judulSekarang={props.judulSekarang}
              tab={props.tab}
              schemaHeader={props.schemaHeader}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={(event) => handleClick(event,"orderby")}
              rowCount={props.jumlahdata}
              schema={props.schema}
              
            />
            <TableBody style={{fontFamily:'Poppinsbold'}}>
           
              {
                
                props?.data?.map((row, index) =>{
                  const isItemSelected = isSelected(row[props?.schema[0]]);
                  const labelId = `enhanced-table-checkbox-${row[props.schema[0]]}`;
                  
                  return (
                   
                    <TableRow
                    id={'rowParent'+row[props.schema[0]]}
                    hover
                    aria-describedby={row[props.schema[0]]}
                    className={classes.tableRow}
                    classes={{ hover: classes.hover, selected:classes.selected }}
                    style={{position:'relative',cursor:"pointer", background:row.pending=="yes"?"#FDFBCD":null}}
                    onMouseEnter={handleEnter}
                    // onMouseOver={handleEnter}
                    onMouseLeave={handleLeave}
                    onClick={(event) => row.pending=="yes"? props.onClick('DETAIL',row[props.schema[0]]):props.tab!="all"?handleClick1(event, row[props.schema[0]]): handleClick(event, row[props.schema[0]])}
                    
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={1}
                  
                    key={index}
                    selected={isItemSelected}
                    >
                    
                       
                        
                    
                     {props.tab=="all"?<TableCell  padding="checkbox">
                     {row.pending!="yes" ?<Checkbox style={{display:hiding}}
                          checked={isItemSelected}
                          icon={<RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>}
                          checkedIcon={<CheckCircleIcon></CheckCircleIcon>}
                          color = "primary"
                          inputProps={{ 'aria-labelledby': labelId }}
                        />: <img style={{marginLeft:'0px'}} src="/pending.png" />  }
                      </TableCell>:null}
            
                      {props?.schemaHeader?.map((field, index1)=>{
                          if(index1==0 ){
                            return(
                            <TableCell  key={index1} id={index1}>
                                <span style={{display:'block'}}>{index+1+(rowsPerPage*(page+1)-rowsPerPage)}</span> 
                                <div style={{display:"none",position:'relative',height:'100%'}}> 
                              
                                    {row.pending!="yes" && props.tab=="all"?<div style={{position:'absolute',left:-20,top:-13,display:'flex', justifyContent:'center', alignItems:'center'}}>
                                      {props.judul=="UserBranch" || props.judul=="UserRole"?null:<Tooltip placement="top" title={t("btnDelete")} aria-label="add" arrow><BiTrash aria-describedby={"cuyasasasa"} style={{fontSize:"20px"}}  id={"delete."+row[props.schema[0]]} className={classes.icon}  fontSize="default"  color="secondary" /></Tooltip>}
                                      
                                      <Tooltip placement="top" title={t("btnEdit")} arrow><RiEditLine className={classes.icon} id={"update."+row[props.schema[0]]} style={{fontSize:"20px"}} fontSize="default"  color="primary"/></Tooltip>
                                      {/* {props.judul=="MasterRole" ?<Tooltip placement="top" title={t("btnEditMapping")} aria-label="add" arrow><VscSourceControl className={classes.icon} style={{fontSize:"20px"}} color="default" id={"detail."+row[props.schema[0]]} fontSize="default" /></Tooltip>:null} */}
                                     
                                    </div>:index+1}

                                   

                                </div>
                             </TableCell>
                             
                           
                            )
                          }
                        
                          else if(index1==2 && props?.tab!="all"){
                            return(
                              <TableCell style={{position:'relative'}} key={index1} >
                              {row[field]}
                              {stateOpen[index]?<div style={{position:'absolute', top:10, background:"transparent"}}>
                                <div style={{position:"absolute",boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',zIndex:100,left:-22,width:"0px", height:'0px'}}>
                                  <Icon icon="arrow-left" style={{color:'#3498ff', fontSize:"30px"}}></Icon>
                                </div>
                                <div style={{position:"fixed",boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',top:200,width:'300px',zIndex:100, padding:'10px',background:"white", borderRadius:'10px'}}>
                              {/* <div style={{position:'absolute', top:0,right:5}}>
                              <Icon icon="close" style={{color:'blue', fontSize:"12px"}}></Icon>
                              </div> */}
                              <Step data={row.workflowStep}></Step>
</div>
                                </div>
:null}
                            {/* {row[field].length>15 && !isItemSelected?row[field].slice(0, 15).concat('...'):row[field].length>50?row[field].slice(0, 50).concat('...'):row[field]} */}
                            </TableCell>

                            )
                          }
                          else if(field!="workflowStep"){
                           
                           return(
                            
                            <TableCell style={{position:'relative'}} key={index1} >
                              {row[field]}
                            
                            {/* {row[field].length>15 && !isItemSelected?row[field].slice(0, 15).concat('...'):row[field].length>50?row[field].slice(0, 50).concat('...'):row[field]} */}
                            </TableCell>

                           );
                          } 
                      })}
                      {props.tab=="workflow"?(
  <TableCell ><ButtonTable id={"view"} onClick={e=>handleClick1(e, row[props.schema[0]])} >{t('btnView')}</ButtonTable></TableCell>
                      ):props.tab=="todolist"?(
                        <TableCell ><ButtonTable id={"action"} onClick={e=>handleClick1(e, row[props.schema[0]])}>{t('btnAction')}</ButtonTable></TableCell>
                      ):null}
                      {/* <TableCell  >{row.name}</TableCell>
                      
                      <TableCell >{row.password}</TableCell>
                      <TableCell  >{row.role}</TableCell>
                      <TableCell >{row.nik}</TableCell>
                      
                      <TableCell  >{row.dept}</TableCell>
                   
                      <TableCell >{row.group}</TableCell> */}
                      {/* <div style={{position:"absolute", left:'200px', zIndex:200}}>
                          <span>bhayy</span>
                      </div> */}
                    </TableRow>
                  
                  );
                })}
           
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",position:'relative'}}
          rowsPerPageOptions={comboRowperpage}
          component="div"
          count={props.jumlahdata}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        
       
       <Popover
        id={"changeCombo"}
        open={openCombo}
        anchorEl={anchorEl}
        style={{textAlign:'center'}}
        onClose={handleCloseCombo}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
          <TextField name="combo1" onChange={onChangeComboUser} style={{margin:10,width:'80px',}} value={comboRowperpage[0]}  size="small" id="outlined-basic" label="" variant="outlined"
          InputProps={{ className: classes.someTextField } } fullWidth />
          <TextField style={{margin:10,width:'80px'}} name="combo2" onChange={onChangeComboUser} value={comboRowperpage[1]}  InputProps={{ className: classes.someTextField } }  size="small" id="outlined-basic" label="" variant="outlined" />
          <TextField style={{margin:10,width:'80px'}} name="combo3" onChange={onChangeComboUser} value={comboRowperpage[2]}  InputProps={{ className: classes.someTextField } }  size="small" id="outlined-basic" label="" variant="outlined" />
          <br></br>
          <Button onClick={onResetComboUser} className={classes.changeRowButton}  >
          reset
      </Button>
      <Button className={classes.changeRowButton} onClick={onSaveComboUser}  >
          save
      </Button>
 
         
 
      </Popover>
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}

<div>
                                      <Dialog
                                     
                                      open={anchorElu}
                                    
                                   
                                      onClose={handleCloseCombo1}
                                      aria-labelledby="alert-dialog-slide-title"
                                      aria-describedby="alert-dialog-slide-description"
                                    >
                                   
                                      <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                          {'Are You Sure To Delete User ID '+ deleteArray[0]+' ?'}
                                        </DialogContentText>
                                      </DialogContent>
                                      <DialogActions style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                                        <Button onClick={handleCloseCombo1} color="primary">
                                          No
                                        </Button>
                                        <Button onClick={handleyesDelete} color="primary">
                                          Yes
                                        </Button>
                                      </DialogActions>
                                    </Dialog>
                                    </div>
    </div>
  );
}