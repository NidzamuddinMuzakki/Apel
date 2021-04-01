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
function SidebarItem({ depthStep = 10,selected,selectedList, onDragEnd,depth = 0,onClick, expanded, item, theme,...rest}) {
  const [collapsed, setCollapsed] = React.useState(false);
  const ColorTheme = useSelector(state=>state.ColorTheme)

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const LoveMenu = useSelector(state=>state.LoveMenu);
  const MenuData1 = useSelector(state=>state.MenuData);
  const dispatch = useDispatch();
  const RoleSelected = useSelector(state=>state.RoleSelected);
  const { menuDesc:label, menuUrl,menuId,menuChildren:items, fav,menuIcon:Icon1,menuType, menuParent, onClick: onClickProp } = item;
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
      axios.post(Api()+'/general/user/profile',{
        "key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTE2NTIyNjksImRhdGEiOnsiaWQiOnsiZGVwdElkIjoiREVQVDAxIiwiZ3JvdXBJZCI6IkZJTiIsInJvbGVJZCI6Ik1LUjAxIn0sInN0YXR1cyI6eyJzdGF0dXNJbmZvcm1hdGlvbiI6ImFjdGl2ZSIsInBlcmlvZFVzYWdlIjoxfSwidXNlcm5hbWUiOiIyMDIwIiwiZXhwaXJlZEluZm9ybWF0aW9uIjp7InVzZXIiOiIyMDIyLTEyLTMwVDAwOjAwOjAwLjAwMFoiLCJwYXNzd29yZCI6IjIwMjEtMDEtMjBUMjI6MzY6NDEuMDAwWiJ9LCJhY2Nlc3NJbmZvcm1hdGlvbiI6eyJ2aWV3IjoidHJ1ZSIsImNyZWF0ZSI6InRydWUiLCJ1cGRhdGUiOiJ0cnVlIiwiZGVsZXRlIjoidHJ1ZSJ9fSwiaWF0IjoxNjExNjQ4NjY5fQ.8TZ96Iy15T5fvvXmNr8NWcF_qJsoIHuSHld3oInRL-k",
    "moduleId": "ANT",
    "userData": {
        "img" : "",
        "nickname": "Selena_2"
    }
      }).then(res=>{
        setLoading(false)
        dispatch(MenuData(haha))
        dispatch(ChangeLove(!LoveMenu));
      }).catch(err=>{
        setLoading(false)
        dispatch(MenuData(haha))
        dispatch(ChangeLove(!LoveMenu));
      })
  }
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
  function toggleCollapse() {
    setCollapsed(prevValue => !prevValue);
  }

  function handleClick(id) {
    
    onClick(menuId)
  }

  let expandIcon;

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
  console.info(menuId,selectedList.findIndex(cuy=>cuy==menuId)!=-1, selectedList)

  return (
    <>
      {/* {loading?<Loading color={theme} ></Loading>:null} */}
      {/* {menuType=="parent" && menuParent!="" && items!=""?<Divider style={{ margin: "6px 0" }} />:''} */}
      <ListItem
        id={"list|"+menuId}
        className={`${styles.sidebar_item}` }
        
        onClick={e=>selected?.findIndex(cuy=>cuy.menuId==menuId)==-1 && menuUrl!=""?handleClick(menuId):null}
        onDragStart={menuUrl!=""?handleDragTask:null} 
        onDragEnd={onDragEnd}
        draggable={selected?.findIndex(cuy=>cuy.menuId==menuId)==-1 && menuUrl!=""?"true":"false"}
        button
        
        {...rest}
      >
        <div
        
          style={{paddingLeft: depth * depthStep ,background:selected?.findIndex(cuy=>cuy.menuId==menuId)!=-1?"gray":selectedList.findIndex(cuy=>cuy==menuId)!=-1?'black':null}}
          className={styles.sidebar_item_content}
        >
          {/* {Icon1 && <Icon icon={Icon1} className={styles.sidebar_item_icon} fontSize="small" />} */}
          {/* {items && menuParent==""?<Icon icon={"dashboard"} style={{fontSize:'25px'}} className={styles.sidebar_item_icon} />:null} */}
          {items && menuParent!=""?<div style={{width:'30px', height:'100%'}}></div>:null}
         
          {expandIcon}
          <div className={styles.sidebar_item_text}>{label}</div>
        </div>
      
        {/* <Icon id={"love|"+menuId} style={{color:'red'}}  className={`${styles.sidebar_item_icon} ${styles.cuy}`} icon={loading?'spinner':fav=="yes"?"heart":"heart-o"} spin={loading?true:false}></Icon> */}
        {/* {menuType=="child" || (!items)?<Icon id={"love|"+menuId} style={{color:'red'}}  className={`${styles.sidebar_item_icon} ${styles.cuy}`} icon={loading?'spinner':fav=="yes"?"heart":"heart-o"} spin={loading?true:false}></Icon>:""} */}
        {/* {expandIcon} */}
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
                        selected={selected}
                        selectedList ={selectedList}
                         style={{color:'white','--color':ColorTheme?Color[ColorTheme][0]:'','--colorSelected':ColorTheme?Color[ColorTheme][2]:'','--colorBgHover':ColorTheme?Color[ColorTheme][3]:'','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:''}}
                        className={selectedList.findIndex(cuy=>cuy==subItem.menuId)!=-1?styles.class:styles.hover}
                        //  className={history.location.pathname==subItem.menuUrl?"class":"hover"}
                        className={styles.hover}
                      onClick={onClick}
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

function Sidebar({ expanded, Data, onDragEnd, onClick, selected, selectedList }) {
 
  const [hide, setHide] = useState(false);
  const ColorTheme = useSelector(state=>state.ColorTheme)
  const MenuData = useSelector(state=>state.MenuData);
  const RoleSelected = useSelector(state=>state.RoleSelected)
  const [Menu, SetMenu] = useState([]);
  const [love, setLove] = useState(false);
  const LoveMenu = useSelector(state=>state.LoveMenu);

  const history = useHistory();
  

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

  useEffect(()=>{
    
    if(love==true && MenuData!=""){
      
      let apalah = JSON.parse(JSON.stringify(MenuData))
      for(const dataMenu1 of apalah){
        let cuy = []
        let dataL = []
        if(dataMenu1.roleId==RoleSelected.roleId){
          cuy = getFlat(dataMenu1.menu)
          for(const lala of cuy){
            if(lala.fav=="yes"){
              dataL.push(lala)
            }
          }
          SetMenu(dataL)
          // SetMenu(getNestedChildren(dataL,''))
          break
          
          
        }
      }
    }
    else if(MenuData!=""){
      for(const dataMenu of MenuData){
        let cuy = []
        if(dataMenu.roleId==RoleSelected.roleId){
         
          SetMenu(dataMenu.menu)
        }
      }
    }
    
  }, [RoleSelected,love, MenuData,LoveMenu ])
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
  
   
    <div style={{overflow:'auto',width:'220px','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:'','--color':ColorTheme?Color[ColorTheme][0]:''}} className={`${styles.sidebar}`}>
    
    
    
    
   
      <List disablePadding dense>
        {Data?.map((sidebarItem, index) => (
          <React.Fragment key={`${sidebarItem.menuDesc}${index}`}>
            {sidebarItem === "divider" ? (
              // <Divider style={{ margin: "6px 0" }} />
              null
            ) : (
              <SidebarItem
                onClick={onClick}
                id={"list|"+sidebarItem.menuId}
                selected={selected}
                selectedList={selectedList}
                style={{'--color':ColorTheme?Color[ColorTheme][0]:'','--colorBgHover':ColorTheme?Color[ColorTheme][3]:'','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:''}}
                className={styles.hover}
                onDragEnd ={onDragEnd}
                className={selectedList.findIndex(cuy=>cuy==sidebarItem.menuId)!=-1?styles.class:styles.hover}
                // className={sidebarItem.menuUrl==history.location.pathname?styles.class:styles.hover}
                theme={ColorTheme?Color[ColorTheme][4]:''}
                expanded={expanded}
                item={sidebarItem}
              />
            )}
          </React.Fragment>
        ))}
      </List>
      
    
    
    
    </div>
  </>
  );
  
}

export default Sidebar;



