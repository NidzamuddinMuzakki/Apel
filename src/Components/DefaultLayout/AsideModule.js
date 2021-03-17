import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Collapse from "@material-ui/core/Collapse";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';
import useSWR from 'swr'
import Api from './../../ApiSetting'
import  styles from './../../style/AsideModule.module.css'
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {ChangeModuleSelected} from './../../Redux/Profile/Action'
import Color from './../../Theme.json'
function SidebarItem({ depthStep = 10, depth = 0, moduleSelected,expanded, item,hover ,hideLabel,...rest }) {
  const [collapsed, setCollapsed] = React.useState(true);
  const router = useHistory();
  const dispatch = useDispatch();
  const [love, setLove] = React.useState(item.love=="yes"?true:false);
  const { moduleName,moduleId, onClick: onClickProp } = item;
  const [parent, SetParent] =React.useState([]);
  const [hoverItem, setHoverItem] = React.useState(false);
  const [hoverItemName, setHoverItemName] = React.useState('');
  let Icon1;
 
  



  function onClick(e) {
  
    // dispatch(ChangeModuleSelected({moduleId:moduleId, moduleName:moduleName}))
    //  if (onClickProp) {
     
    //     dispatch(ChangeModuleSelected({moduleId:moduleId, moduleName:moduleName}))
    //  }

   
  }

  let expandIcon;


    expandIcon = <div style={{width:'5px', height:'5px',marginLeft:'30px'}}></div>
  

  return (
    <>
      
      <ListItem
        className={`${styles.sidebar_item}`}
        onClick={onClick}
        onMouseOver={e=>{setHoverItem(true);setHoverItemName(moduleName)}}
        onMouseOut={e=>{setHoverItem(false); setHoverItemName('')}}
        button
        dense
        {...rest}
      >
        <div
          style={{ paddingLeft: depth * depthStep }}
          className={styles.sidebar_item_content}
        >
          {/* {menuIcon && <Icon1 className="sidebar-item-icon" fontSize="small" />} */}
         
          {hideLabel? <div className={styles.sidebar_item_text_hide}>{moduleName}</div>: <div className={styles.sidebar_item_text}>{moduleName}</div>}
        </div>
        
      </ListItem>
     
    </>
  );
}

function Sidebar({ ModuleSelected,onClick,depthStep, depth, expanded ,name,role, collapsed}) {
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('itemsModule')))
    const themeColor = useSelector(state=>state.ColorTheme)
    const [loveItem, setLoveItem] = React.useState([]);
  
    const [hideLabel, setHideLabel] = React.useState(false); 
    const [love, setLove] = React.useState(false);
    const [loveHover, setLoveHover] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(()=>{
        setLoveItem(items);
    }, [items])
    function setItem(item){
      let cuy =[];
      let lala = JSON.parse(JSON.stringify(item));
        for(const cuylala of lala){
          if(cuylala.love=="yes"){
            cuy.push(cuylala)
          }else if(cuylala.love=="semi"){
            let com =[];
            for(const lala of cuylala.items){
              if(lala.love=="yes" || lala.love=="semi"){
                com.push(lala);
              }
            }
            cuylala.items = com;
            cuy.push(cuylala)
            // if(Array.isArray(cuylala.items)){
            //   setItem(cuylala.items)
            // }
          }
        }
        return cuy
    }
    const handleAll = ()=>{
      setLoveItem(items)
      setLove(false)
    }
    const handleClick= (e,data, id)=>{
      
  console.log('hay')
//   onClick({moduleName:data,moduleId:id})
        dispatch(ChangeModuleSelected({moduleName:data,moduleId:id}))
        localStorage.setItem('moduleSelected',JSON.stringify({moduleName:data,moduleId:id}))    
         
    }
   const router = useHistory();
    function FavoriteFunction(){
        
        if(love==true){
            setLove(false)
            setLoveItem(items)
        }else{
            setLoveItem(setItem(items))
            setLove(true)
        }
    }
    function onClickcuy(e){
      if(hideLabel==true){
          setHideLabel(false)
      }else{
          setHideLabel(true)
      }
    }


 
    return (
               
    <div  style={{'--color':themeColor?Color[themeColor][0]:'','--colorBgHover':themeColor?Color[themeColor][3]:'','--colorBgMenu':themeColor?Color[themeColor][4]:''}}  className={hideLabel?styles.sideba_hide:styles.sidebar}>
      <div className={styles.resizeAside}> 

      </div>
      {/* {role?role:''} */}
     
      <List  disablePadding dense>
        {items?items.map((sidebarItem, index) => (
          <React.Fragment 
           key={`${sidebarItem.moduleName}${index}`}>
            {sidebarItem === "divider" ? (
              <Divider style={{ margin: "6px 0" }} />
            ) : (
              <SidebarItem
                style={{'--color':themeColor?Color[themeColor][0]:'','--colorBgHover':themeColor?Color[themeColor][3]:'','--colorBgMenu':themeColor?Color[themeColor][4]:''}}
                className={sidebarItem.moduleName==ModuleSelected.moduleName?styles.class:styles.hover}
                depthStep={depthStep}
                depth={depth}
                onClick={e=>handleClick(e,sidebarItem.moduleName, sidebarItem.moduleId)}
                moduleSelected={ModuleSelected}
                hideLabel = {hideLabel}
                expanded={expanded}
                item={sidebarItem}
              />
            )}
          </React.Fragment>
        )):''}
      </List>
      {/* {name=="notif"?"":<div onClick={onClickcuy} style={{position:'absolute', bottom:'10px', right:10,cursor:'pointer'}}>
          {hideLabel?<ArrowForwardIosIcon/>:<ArrowBackIosIcon/>}</div>} */}
    </div>
  );
}

export default Sidebar;