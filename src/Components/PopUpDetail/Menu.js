import React,{useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ArrowRight";
import ExpandLessIcon from "@material-ui/icons/ArrowDropDown";
import Collapse from "@material-ui/core/Collapse";
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import styles  from './../../style/Aside.module.css'
import  './../../style/overflow.css'
import {Icon} from 'rsuite'
import { FaPlusSquare } from "react-icons/fa";
import Color from './../../Theme.json'
import {MenuData, ChangeRoleSelected, ChangeLove} from './../../Redux/Profile/Action'
import {useHistory} from 'react-router-dom'
import Loading from './../Loading'
import axios from 'axios'
import Api from './../../ApiSetting'
function SidebarItem({ depthStep = 10, depth = 0,selected, dataSelected,expanded,onClick, item, theme,...rest}) {
  const [collapsed, setCollapsed] = React.useState(false);
  const ColorTheme = useSelector(state=>state.ColorTheme)
  expanded=true
  const [dataCuya, setDataCuya]= useState();
  useEffect(()=>{
    setDataCuya(dataSelected)
  },[dataSelected])
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

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const LoveMenu = useSelector(state=>state.LoveMenu);
  const MenuData1 = useSelector(state=>state.MenuData);
  const dispatch = useDispatch();
  const RoleSelected = useSelector(state=>state.RoleSelected);
  const { menuDesc:label, menuUrl,menuId,menuChildren:items, fav,menuIcon:Icon1,menuType, menuParent } = item;

  function getFlat(array){
    var out = []
    for(let i in array){
      out.push(array[i])
      var children = getFlat(array[i].menuChildren)
      for(let cuy of children){
        out.push(cuy)
      }
    }
    for(let k in out){
      if(out[k].menuChildren){
        out[k].menuChildren="";
      }
    }
    return out
  }
  function getNestedChildren(arr, parent){
    var out =[];
    for(let i in arr){
      if(arr[i].menuParent==parent){
        var children = getNestedChildren(arr, arr[i].menuId)
        if(children.length){
          arr[i].menuChildren = children
          out.push(arr[i])
        }else{
          out.push(arr[i])
  
        }
      }
    }
    return out
  }
  const handleClickLove = (e,id)=>{
    let haha = MenuData1;
    let cuy = []
    let ok = []
    setLoading(true)
      for(const lala of haha){
        if(lala.roleId==RoleSelected.roleId){
          cuy = lala.menu
          ok = getFlat(cuy)
          for(const coba of ok){
            if(coba.menuId==id){
              if(coba.fav=="yes"){
                coba.fav="no"
              }else{
                coba.fav="yes"
              }
            }
          }
          cuy = getNestedChildren(ok,'')
          haha.menu = cuy
         
        }
      }
    
  }
  
  function toggleCollapse() {
    setCollapsed(prevValue => !prevValue);
  }

  function handleClick(e) {
    
    if(menuUrl!="" && selected.findIndex(cuy=>cuy.menuId==menuId)==-1){
      onClick(menuId)
    }
    
  }

  let expandIcon;
console.log(menuId,dataSelected.findIndex(cuy=>cuy==menuId)!==-1)
  if (Array.isArray(items) && items.length) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon
      style={{color:'white !important'}}
        className={
          `${styles.sidebar_item_expand_arrow} ${styles.sidebar_item_expand_arrow_expanded}`
        }
      />
    ) : (
      <ExpandMoreIcon style={{color:'white'}} className={styles.sidebar_item_expand_arrow} />
    );
  }else{
    expandIcon = <div style={{width:'55px', height:'100%'}}></div>
  }

  return (
    <>
      {/* {loading?<Loading color={theme} ></Loading>:null} */}
      {/* {menuType=="parent" && menuParent!="" && items!=""?<Divider style={{ margin: "6px 0" }} />:''} */}
      <ListItem
        className={`${styles.sidebar_item}`}
        onClick={handleClick}
        button
        id={menuId}
        draggable={menuUrl!=""?"true":"false"}
        onDragStart={menuUrl!=""?handleDragTask:null}
        {...rest}
      >
        <div
          style={{ paddingLeft: depth * depthStep,background:selected.findIndex(cuy=>cuy.menuId==menuId)!==-1?'gray':dataCuya?.findIndex(cuy=>cuy==menuId)!==-1?'blue':null,color:selected.findIndex(cuy=>cuy.menuId==menuId)!==-1?'#c4c4c4':null }}
          className={styles.sidebar_item_content}
        >
          {/* {Icon1 && <Icon icon={Icon1} className={styles.sidebar_item_icon} fontSize="small" />} */}
          {items && menuParent==""?<Icon icon={"dashboard"} style={{fontSize:'25px'}} className={styles.sidebar_item_icon} />:null}
          {items && menuParent!=""?<div style={{width:'30px', height:'100%'}}></div>:null}
          {expandIcon}
         
          <div className={styles.sidebar_item_text}>{label}</div>
        </div>
      
  
      </ListItem>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List disablePadding dense >
            

            {items.map((subItem, index) => (
              <React.Fragment key={`${subItem.name}${index}`}>
                {subItem === "divider" ? (
                  <Divider style={{ margin: "6px 0" }} />
                ) : (
                  <div style={{marginLeft:'15px'}}> 

                    
                    
                    <SidebarItem
                    dataSelected={dataSelected}
                     onClick={onClick}
                         style={{color:'white','--color':ColorTheme?Color[ColorTheme][0]:'','--colorSelected':ColorTheme?Color[ColorTheme][2]:'','--colorBgHover':ColorTheme?Color[ColorTheme][3]:'','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:''}}
                         className={styles.hover}
                         selected={selected}
                        //  className={history.location.pathname==subItem.menuUrl?"class":"hover"}
                     
                      item={subItem}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </List>
        ) : null}
      </Collapse>
      {/* {menuType=="child" && menuParent!="" && items!=""?<Divider style={{ margin: "6px 0" }} />:''} */}
    </>
  );
}

function Sidebar({ expanded,option, selected,dataSelected, onClick }) {
 
  
  const [hide, setHide] = useState(false);
  const ColorTheme = useSelector(state=>state.ColorTheme)
  const MenuData = useSelector(state=>state.MenuData);
  const RoleSelected = useSelector(state=>state.RoleSelected)
  const [cuyaSelected,setCuyaSelected] = useState()
  useEffect(()=>{
    setCuyaSelected(dataSelected)
  },[dataSelected])
  const [Menu, SetMenu] = useState([]);
  const [love, setLove] = useState(false);
  const LoveMenu = useSelector(state=>state.LoveMenu);

  const history = useHistory();
  


function getNestedChildren(arr, parent){
  var out =[];
  for(let i in arr){
    if(arr[i].menuParent==parent){
      var children = getNestedChildren(arr, arr[i].menuId)
      if(children.length){
        arr[i].menuChildren = children
        out.push(arr[i])
      }else{
        out.push(arr[i])

      }
    }
  }
  return out
}


    
    
  const handleHide = ()=>{
    setHide(!hide)
  }
  const handleLoveMenuHeader = (e)=>{
    setLove(true)
  }
  const handleAllMenuHeader = (e)=>{
    setLove(false)
  }
  
  return (
    <>
  
   
    <div style={{height:'240px',overflow:hide?null:'auto',minWidth:hide?'40px':'300px',maxWidth:hide?'40px':'450px','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:'','--color':ColorTheme?Color[ColorTheme][0]:'',width:hide?"40px":"300px",}} className={`${styles.sidebar}`+' drag_box2'}>
    
    <div style={{display:hide?"block":'none'}}>
        <div style={{textAlign:"center"}}>
          <div onClick={handleAllMenuHeader}  style={{color:love?ColorTheme?Color[ColorTheme][2]:'':'white',cursor:'pointer',margin:'auto',marginTop:'5px',marginBottom:'5px',width:'50%','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:'','--color':ColorTheme?Color[ColorTheme][0]:'','--colorBgMenuAll':ColorTheme?Color[ColorTheme][2]:''}}>
            <span >All</span>
          </div>
          <div onClick={handleLoveMenuHeader}  style={{cursor:'pointer',margin:'auto',marginTop:'5px',marginBottom:'5px',width:'50%','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:'','--color':ColorTheme?Color[ColorTheme][0]:'','--colorBgMenuAll':ColorTheme?Color[ColorTheme][2]:''}}>
            {/* <Icon   icon={love?"heart":"heart-o"}></Icon> */}
        
              <Icon classname={styles.heart} style={{color:'red', fontSize:'20px'}} icon={love?'heart':'heart-o'}></Icon>
              {/* <div className={love?"heart is_animating":"heart"}></div> */}
            
          </div>
        </div>
        <div>
          <ul>
            <li><Icon style={{fontSize:"25px"}} icon="dashboard"></Icon></li>
            <li><Icon style={{fontSize:"25px"}} icon="dashboard"></Icon></li>
            <li><Icon style={{fontSize:"25px"}} icon="dashboard"></Icon></li>
          </ul>
        </div>

    </div>
    
    <div style={{display:hide?"none":"block"}}>

   
      <List disablePadding dense>
        {option.map((sidebarItem, index) => (
          <React.Fragment key={`${sidebarItem.menuDesc}${index}`}>
            {sidebarItem === "divider" ? (
              // <Divider style={{ margin: "6px 0" }} />
              null
            ) : (
              <SidebarItem
                onClick={onClick}
                dataSelected ={cuyaSelected}
                style={{'--color':ColorTheme?Color[ColorTheme][0]:'','--colorBgHover':ColorTheme?Color[ColorTheme][3]:'','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:''}}
                selected={selected}
                className={styles.hover}
                theme={ColorTheme?Color[ColorTheme][4]:''}
                expanded={expanded}
                item={sidebarItem}
              />
            )}
          </React.Fragment>
        ))}
      </List>
      
    </div>
    
    
    </div>
  </>
  );
  
}

export default Sidebar;





