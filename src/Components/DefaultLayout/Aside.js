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
import { useTranslation } from 'react-i18next';
import { Tooltip } from "@material-ui/core";
import styled from 'styled-components';
function SidebarItem({ depthStep = 40, depth, expanded, item, theme,...rest}) {
  const [collapsed, setCollapsed] = React.useState(true);
  const ColorTheme = useSelector(state=>state.ColorTheme)
  const [deptItem,setDeptItem] = useState(depth);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const LoveMenu = useSelector(state=>state.LoveMenu);
  const MenuData1 = useSelector(state=>state.MenuData);
  const Iicon = styled.div`
    color:white;
    &:hover{
      color:red
    }
  `
  const dispatch = useDispatch();
  useEffect(()=>{
    setDeptItem(deptItem=>deptItem+0.5)
  },[])
  const RoleSelected = useSelector(state=>state.RoleSelected);
  const { menuDesc:label, menuUrl,menuId,menuChildren:items, fav,menuIcon:Icon1,menuType, menuParent, onClick: onClickProp } = item;
  console.log(menuId, deptItem)
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
  
  function toggleCollapse() {
    setCollapsed(prevValue => !prevValue);
  }

  function onClick(e) {
    if(e.target.id.includes("love")){
        handleClickLove(e, e.target.id.split("|")[1])
        
    }else{

      if (Array.isArray(items)) {
        toggleCollapse();
      }
      else{
        localStorage.setItem("Route",menuUrl)
        localStorage.setItem("judul",label)
        history.replace(menuUrl)
      }
    }
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
    expandIcon = <div style={{width:'43px', height:'100%'}}></div>
  }
  
  return (
    <>
      {/* {loading?<Loading color={theme} ></Loading>:null} */}
      {/* {menuType=="parent" && menuParent!="" && items!=""?<Divider style={{ margin: "6px 0" }} />:''} */}
      <ListItem
        className={`${styles.sidebar_item}`}
        onClick={onClick}
        button
        
        {...rest}
      >
        <div
          style={{ paddingLeft: deptItem * depthStep }}
          className={styles.sidebar_item_content}
        >
          {/* {Icon1 && <Icon icon={Icon1} className={styles.sidebar_item_icon} fontSize="small" />} */}
          {items && menuParent==""?<Icon icon={"dashboard"} style={{fontSize:'25px'}} className={styles.sidebar_item_icon} />:null}
          {/* {items && menuParent!=""?<div style={{width:deptItem * depthStep+"px", height:'30px', background:'red'}}></div>:null} */}
          {menuType=="parent" && menuParent!=""?<div style={{width:deptItem*depthStep, height:'100%'}}></div>:null}
          {expandIcon}
        
          <div className={styles.sidebar_item_text}>{label}</div>
        </div>
        <Iicon><Icon id={"love|"+menuId}  className={`${styles.sidebar_item_icon} ${styles.cuy}`} icon={loading?'spinner':fav=="yes"?"heart":"heart-o"} spin={loading?true:false}></Icon></Iicon>
        {/* {menuType=="child" || (!items)?<Icon id={"love|"+menuId} style={{color:'red'}}  className={`${styles.sidebar_item_icon} ${styles.cuy}`} icon={loading?'spinner':fav=="yes"?"heart":"heart-o"} spin={loading?true:false}></Icon>:""} */}
        {/* {expandIcon} */}
      </ListItem>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          
          
          
          <List disablePadding dense  >
            
            

            {items.map((subItem, index) => (
              <React.Fragment key={`${subItem.name}${index}`}>
                {subItem === "divider" ? (
                  <Divider style={{ margin: "6px 0" }} />
                ) : (
                  
                 
                 
                      
                 
                    <SidebarItem
                         style={{color:'white','--color':ColorTheme?Color[ColorTheme][0]:'','--colorSelected':ColorTheme?Color[ColorTheme][2]:'','--colorBgHover':ColorTheme?Color[ColorTheme][3]:'','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:''}}
                         className={subItem.menuUrl==history.location.pathname?styles.class:styles.hover}
                        //  className={history.location.pathname==subItem.menuUrl?"class":"hover"}
                        depth={deptItem}
                        item={subItem}
                    />

                  
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

function Sidebar({ expanded }) {
  function onClick(e, item) {
    window.alert(JSON.stringify(item, null, 2));
  }
  const {t}  = useTranslation()
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
  const Iicon = styled.div`
    color:white;
    font-size:20px;
    &:hover{
      color:red
    }
  `
  return (
    <>
  
   
    <div style={{overflow:hide?null:'auto',minWidth:hide?'40px':'300px',maxWidth:hide?'40px':'450px','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:'','--color':ColorTheme?Color[ColorTheme][0]:'',width:hide?"40px":"300px",}} className={`${styles.sidebar}`}>
    <div onClick={handleHide} className={`${styles.hamburger}`}>
      <div className={`${styles.inner_hamburger}`}>
          <span className={`${styles.arrow}`}>
            <Icon icon={hide?"long-arrow-right":"long-arrow-left"}></Icon>
          </span>
      </div>

    </div>
    <div style={{display:hide?"block":'none'}}>
        <div style={{textAlign:"center"}}>
          <div onClick={handleAllMenuHeader}  style={{color:love?ColorTheme?Color[ColorTheme][2]:'':'white',cursor:'pointer',margin:'auto',marginTop:'5px',marginBottom:'5px',width:'50%','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:'','--color':ColorTheme?Color[ColorTheme][0]:'','--colorBgMenuAll':ColorTheme?Color[ColorTheme][2]:''}}>
            <span >{t("btnAll")}</span>
          </div>
          <Tooltip placement="top" title={t("btnFav")} aria-label="add">
          <div onClick={handleLoveMenuHeader}  style={{cursor:'pointer',margin:'auto',marginTop:'5px',marginBottom:'5px',width:'50%','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:'','--color':ColorTheme?Color[ColorTheme][0]:'','--colorBgMenuAll':ColorTheme?Color[ColorTheme][2]:''}}>
            {/* <Icon   icon={love?"heart":"heart-o"}></Icon> */}
        
             <Iicon>
              <Icon classname={styles.heart} style={{fontSize:'20px'}}  icon={love?'heart':'heart-o'}></Icon>
               
            </Iicon> 
              {/* <div className={love?"heart is_animating":"heart"}></div> */}
            
          </div>
        </Tooltip>
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
<div  className={`${styles.sideHeaderLover}`} style={{'--colorBgMenu':ColorTheme?Color[ColorTheme][4]:'','--color':ColorTheme?Color[ColorTheme][0]:'',fontFamily:'Poppinsbold',display:'flex', justifyContent:'space-around',alignItems:'center', height:'30px'}}> 
        <div onClick={handleAllMenuHeader} className={love?styles.sideHeaderLoverItem:styles.sideHeaderLoverItemSelected} style={{marginTop:'5px',marginBottom:'5px',width:'50%','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:'','--color':ColorTheme?Color[ColorTheme][0]:'','--colorBgMenuAll':ColorTheme?Color[ColorTheme][2]:''}}>
          <span >{t("btnAll")}</span>
        </div>
        <Tooltip placement="top" title={t("btnFav")}  arrow>
        <div onClick={handleLoveMenuHeader} className={love?styles.sideHeaderLoverItemSelected:styles.sideHeaderLoverItem} style={{marginTop:'5px',marginBottom:'5px',width:'50%','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:'','--color':ColorTheme?Color[ColorTheme][0]:'','--colorBgMenuAll':ColorTheme?Color[ColorTheme][2]:''}}>
          {/* <Icon   icon={love?"heart":"heart-o"}></Icon> */}
      <Iicon>

            <Icon classname={styles.heart}  style={{fontSize:'20px'}}   icon={love?'heart':'heart-o'}></Icon>

      </Iicon>
            {/* <div className={love?"heart is_animating":"heart"}></div> */}
          
        </div>
        </Tooltip>
    </div>
   
      <List disablePadding dense>
        {Menu?Menu.map((sidebarItem, index) => (
          <React.Fragment key={`${sidebarItem.menuDesc}${index}`}>
            {sidebarItem === "divider" ? (
              // <Divider style={{ margin: "6px 0" }} />
              null
            ) : (
              <SidebarItem
                depth ={-(0.5)}
                style={{'--color':ColorTheme?Color[ColorTheme][0]:'','--colorBgHover':ColorTheme?Color[ColorTheme][3]:'','--colorBgMenu':ColorTheme?Color[ColorTheme][4]:''}}

                className={sidebarItem.menuUrl==history.location.pathname?styles.class:styles.hover}
                theme={ColorTheme?Color[ColorTheme][4]:''}
                expanded={expanded}
                item={sidebarItem}
              />
            )}
          </React.Fragment>
        )):''}
      </List>
      
    </div>
    
    
    </div>
  </>
  );
  
}

export default Sidebar;




// // import Sidebar from './../Aside/Sidebar'
// // export default function Aside(){
// //   return (
// //     <div >
// //         <Sidebar></Sidebar>
// //     </div>
// //   )
// // }





// // import React from "react";
// // import { BrowserRouter as Router } from "react-router-dom";
// // import {
// //   MDBInput,
// //   MDBNavbar,
// //   MDBNavbarNav,
// //   MDBNavItem,
// //   MDBNavLink,
// //   MDBDropdown,
// //   MDBDropdownToggle,
// //   MDBDropdownMenu,
// //   MDBDropdownItem,
// //   MDBIcon,
// //   MDBSideNavItem,
// //   MDBSideNavCat,
// //   MDBSideNavNav,
// //   MDBSideNav,
// //   MDBContainer
// // } from "mdbreact";
// // import "./App.css";

// // class DoubleNavigationPage extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       toggleStateA: false,
// //       breakWidth: 1300,
// //       windowWidth: 0
// //     };
// //   }

// //   componentDidMount() {
// //     this.handleResize();
// //     window.addEventListener("resize", this.handleResize);
// //   }

// //   componentWillUnmount() {
// //     window.removeEventListener("resize", this.handleResize);
// //   }

// //   handleResize = () =>
// //     this.setState({
// //       windowWidth: window.innerWidth
// //     });

// //   handleToggleClickA = () => {
// //     this.setState({
// //       toggleStateA: !this.state.toggleStateA
// //     });
// //   };

// //   render() {
// //     const navStyle = {
// //       paddingLeft:
// //         this.state.windowWidth > this.state.breakWidth ? "210px" : "16px"
// //     };

// //     const mainStyle = {
// //       margin: "0 6%",
// //       paddingTop: "5.5rem",
// //       paddingLeft:
// //         this.state.windowWidth > this.state.breakWidth ? "240px" : "0"
// //     };

// //     const specialCaseNavbarStyles = {
// //       WebkitBoxOrient: "horizontal",
// //       flexDirection: "row"
// //     };

// //     return (
// //       <Router>
// //         <div className="fixed-sn light-blue-skin">
// //           <MDBSideNav
// //             slim
// //             logo="https://mdbootstrap.com/img/logo/mdb-transparent.png"
// //             triggerOpening={this.state.toggleStateA}
// //             breakWidth={this.state.breakWidth}
// //             bg="https://mdbootstrap.com/img/Photos/Others/sidenav4.jpg"
// //             mask="strong"
// //             fixed
// //           >
// //             <MDBInput
// //               type="text"
// //               default="Search"
// //               style={{
// //                 color: "#fff",
// //                 padding: "0 10px 8px 30px",
// //                 boxSizing: "border-box"
// //               }}
// //             />
// //             <MDBSideNavNav className="slim-items">
// //               <MDBSideNavCat
// //                 name="Submit blog"
// //                 id="submit-blog-cat"
// //                 icon="chevron-right"
// //               >
// //                 <MDBSideNavItem>Submit listing</MDBSideNavItem>
// //                 <MDBSideNavItem>Registration form</MDBSideNavItem>
// //               </MDBSideNavCat>
// //               <MDBSideNavCat
// //                 iconRegular
// //                 name="Instruction"
// //                 id="instruction-cat"
// //                 icon="hand-pointer"
// //               >
// //                 <MDBSideNavItem>For bloggers</MDBSideNavItem>
// //                 <MDBSideNavItem>For authors</MDBSideNavItem>
// //               </MDBSideNavCat>
// //               <MDBSideNavCat name="About" id="about-cat" icon="eye">
// //                 <MDBSideNavItem>Instruction</MDBSideNavItem>
// //                 <MDBSideNavItem>Monthly meetings</MDBSideNavItem>
// //               </MDBSideNavCat>
// //               <MDBSideNavCat
// //                 name="Contact me"
// //                 id="contact-me-cat"
// //                 icon="envelope"
// //               >
// //                 <MDBSideNavItem>FAQ</MDBSideNavItem>
// //                 <MDBSideNavItem>Write a message</MDBSideNavItem>
// //               </MDBSideNavCat>
// //             </MDBSideNavNav>
// //           </MDBSideNav>
// //           <MDBNavbar style={navStyle} double expand="md" fixed="top" scrolling>
// //             <MDBNavbarNav left>
// //               <MDBNavItem>
// //                 <div
// //                   onClick={this.handleToggleClickA}
// //                   key="sideNavToggleA"
// //                   style={{
// //                     lineHeight: "32px",
// //                     marginRight: "1em",
// //                     verticalAlign: "middle",
// //                     display: window.innerWidth >= 1301 ? "none" : ""
// //                   }}
// //                 >
// //                   <MDBIcon icon="bars" color="white" size="2x" />
// //                 </div>
// //               </MDBNavItem>
// //               <MDBNavItem
// //                 className="d-none d-md-inline"
// //                 style={{ paddingTop: 5 }}
// //               >
// //                 Material Design for Bootstrap
// //               </MDBNavItem>
// //             </MDBNavbarNav>
// //             <MDBNavbarNav right style={specialCaseNavbarStyles}>
// //               <MDBNavItem active>
// //                 <MDBNavLink to="#!">
// //                   <MDBIcon icon="envelope" className="d-inline-inline" />{" "}
// //                   <div className="d-none d-md-inline">Contact</div>
// //                 </MDBNavLink>
// //               </MDBNavItem>
// //               <MDBNavItem>
// //                 <MDBNavLink to="#!">
// //                   <MDBIcon far icon="comments" className="d-inline-inline" />{" "}
// //                   <div className="d-none d-md-inline">Support</div>
// //                 </MDBNavLink>
// //               </MDBNavItem>
// //               <MDBNavItem>
// //                 <MDBNavLink to="#!">
// //                   <MDBIcon icon="user" className="d-inline-inline" />{" "}
// //                   <div className="d-none d-md-inline">Account</div>
// //                 </MDBNavLink>
// //               </MDBNavItem>
// //               <MDBNavItem>
// //                 <MDBDropdown>
// //                   <MDBDropdownToggle nav caret>
// //                     <div className="d-none d-md-inline">Dropdown</div>
// //                   </MDBDropdownToggle>
// //                   <MDBDropdownMenu right>
// //                     <MDBDropdownItem href="#!">Action</MDBDropdownItem>
// //                     <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
// //                     <MDBDropdownItem href="#!">
// //                       Something else here
// //                     </MDBDropdownItem>
// //                     <MDBDropdownItem href="#!">
// //                       Something else here
// //                     </MDBDropdownItem>
// //                   </MDBDropdownMenu>
// //                 </MDBDropdown>
// //               </MDBNavItem>
// //             </MDBNavbarNav>
// //           </MDBNavbar>
// //           <main style={mainStyle}>
// //             <MDBContainer fluid style={{ height: 2000 }} className="mt-5">
// //               <h2>
// //                 Advanced Double Navigation with fixed SideNav & fixed Navbar:
// //               </h2>
// //               <br />
// //               <h5>1. Fixed side menu, hidden on small devices.</h5>
// //               <h5>
// //                 2. Fixed Navbar. It will always stay visible on the top, even
// //                 when you scroll down.
// //               </h5>
// //             </MDBContainer>
// //           </main>
// //         </div>
// //       </Router>
// //     );
// //   }
// // }

// // export default DoubleNavigationPage;

// import React, { useEffect, useState } from "react";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import Divider from "@material-ui/core/Divider";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ExpandLessIcon from "@material-ui/icons/ExpandLess";
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import Collapse from "@material-ui/core/Collapse";
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import {useHistory} from 'react-router-dom';
// import Color from './../../Theme.json'
// import Api from './../../ApiSetting'
// import {useSelector} from 'react-redux'
// function SidebarItem({ depthStep = 10, depth = 0, expanded, item,hover ,hideLabel,...rest }) {
//   const [collapsed, setCollapsed] = React.useState(true);
//   const router = useHistory();
//   const [love, setLove] = React.useState(item.love=="yes"?true:false);
//   const { menuDesc, menuChildren, menuIcon,menuUrl, onClick: onClickProp } = item;
//   const [parent, SetParent] =React.useState([]);
//   const [hoverItem, setHoverItem] = React.useState(false);
//   const [hoverItemName, setHoverItemName] = React.useState('');
//   let Icon1;
 
//   function getFavorite(array){
   
//     if(Array.isArray(array.menuChildren)){
//       let berapa = 0;
//       for(const cek of array.menuChildren){
//         if(cek.love=="yes" || cek.love=="love"){
//           berapa++;
//         }
//       }
//       if(berapa==array.jumlahChild){
//         array.love="yes"
//       }else if(berapa>0){
//         array.love="semi"
//       }else{
//         array.love="no"
//       }
//       getFavorite(array.menuChildren)
//     }
//   }
 
//  getFavorite(item)
 
//   function toggleCollapse() {
//     if(hideLabel){

//     }else{
//       setCollapsed(prevValue => !prevValue);

//     }
//   }

//   if(menuIcon){
//     Icon1 = ()=>{
//       return (
//         <img width="20" src={'/'+menuIcon+'.png'}></img>
//       )
//   }
// }
// function setChildLove(item,value){
//     console.log(item)
//     if(Array.isArray(item.items)){
//       for(const set of item.items){
//         set.love = value;
//         if(Array.isArray(set.items)){
//           setChildLove(set.items, value)

//         }
      
//       }
      
//     }else if(Array.isArray(item)){
//       for( const lala of item){
//         lala.love = value
//       }
//     }
// }
//   function onClick(e) {
//    if(e.target.id.includes("heartMenu")){
//       setLove(!love)
//       if(item.love=="yes"){
//         item.love="no";
//         setChildLove(item, "no")
//       }else{
//         item.love="yes";
//         setChildLove(item, "yes")
//       }
      

//    }else{
//      if (Array.isArray(menuChildren)) {
//        toggleCollapse();
 
//      }
//      if (onClickProp) {
     
//        onClickProp(e, item);
//      }

//    }
//   }

//   let expandIcon;

//   if (Array.isArray(menuChildren) && menuChildren.length) {
//     expandIcon = !collapsed  ? (
//       <ArrowDropDownIcon
     
//         className={
//           "sidebar-item-expand-arrow" + " sidebar-item-expand-arrow-expanded"
//         }
//       />
//     ) : hideLabel==true?(<ExpandMoreIcon className="sidebar-item-expand-arrow-hide" />) : (
//       <ArrowRightIcon style={{marginLeft:'10px',marginRight:'5px'}} className="sidebar-item-expand-arrow" />
//     );
//   }else{
//     expandIcon = <div style={{width:'5px', height:'5px',marginLeft:'30px'}}></div>
//   }

//   return (
//     <>
//       <div>
//       <ListItem
//         className={"sidebar-item"}
//         style={{overflow:'auto !important'}}
//         onClick={onClick}
//         onMouseOver={e=>{setHoverItem(true);setHoverItemName(menuDesc)}}
//         onMouseOut={e=>{setHoverItem(false); setHoverItemName('')}}
//         button
//         dense
//         {...rest}
//       >
//         <div
//           style={{ paddingLeft: depth * depthStep }}
//           className={"sidebar-item-content"}
          
//         >
//           {menuIcon && <Icon1 className="sidebar-item-icon" fontSize="small" />}
//           {expandIcon}
//           {hideLabel? <div className="sidebar-item-text-hide">{menuDesc}</div>: <div className="sidebar-item-text">{menuDesc}</div>}
//         <img id={`heartMenu|${menuDesc}`} style={{marginLeft:'6px', display:hoverItem?'block':'none'}} src={item.love=="yes"?"/heart-selected.png":"/heart-hover.png"} width="17px"></img> 
//         </div>
        
//       </ListItem>
//       </div>
//       <Collapse in={!collapsed && !hideLabel }  timeout="auto" unmountOnExit>
//         {Array.isArray(menuChildren) ? (
//           <List disablePadding dense    > 
//             {menuChildren.map((subItem, index) => (
//               <React.Fragment  key={`${subItem.menuDesc}${index}`}>
//                 {subItem === "divider" ? (
//                   <Divider  style={{ margin: "6px 0", }} />
//                 ) : (
//                   <SidebarItem
//                     collapses={collapsed}
//                     style={{marginLeft:'40x',marginRight:'5px'}}
//                     className={router.pathname==subItem?.menuUrl.split("/")[1]?"class":"hover"}
//                     depth={depth + 1}
                   
//                     depthStep={depthStep}
//                     item={subItem}
//                   />
//                 )}
//               </React.Fragment>
//             ))}
//           </List>
//         ): null}
//       </Collapse>
//     </>
//   );
// }

// function Sidebar({ depthStep, depth, expanded ,name,role, collapsed}) {
//     const roleSelected = useSelector(state=>state.RoleSelected)
//     const Menu = useSelector(state=>state.MenuData)
//     const themeColor = useSelector(state=>state.ColorTheme)
//     const [items, setItems] = useState([]);
//     useEffect(()=>{
//         for(const menu of Menu){
//             if(menu.roleId==roleSelected.roleId){
//                 setItems(menu.menu)
//             }
//         } 
//     },[roleSelected])
    
//     const [hideLabel, setHideLabel] = React.useState(false); 
//     const [love, setLove] = React.useState(false);
//     const [loveHover, setLoveHover] = React.useState(false);
//     const [loveItem, setLoveItem] = React.useState([]);
//     console.log(name)
//     React.useEffect(()=>{
//         setLoveItem(items);
//     }, [items])
//     function setItem(item){
//       let cuy =[];
//       let lala = JSON.parse(JSON.stringify(item));
//         for(const cuylala of lala){
//           if(cuylala.love=="yes"){
//             cuy.push(cuylala)
//           }else if(cuylala.love=="semi"){
//             let com =[];
//             for(const lala of cuylala.items){
//               if(lala.love=="yes" || lala.love=="semi"){
//                 com.push(lala);
//               }
//             }
//             cuylala.items = com;
//             cuy.push(cuylala)
//             // if(Array.isArray(cuylala.items)){
//             //   setItem(cuylala.items)
//             // }
//           }
//         }
//         return cuy
//     }
//     const handleAll = ()=>{
//       setLoveItem(items)
//       setLove(false)
//     }
//    const router = useHistory();
//     function FavoriteFunction(){
        
//         if(love==true){
//             setLove(false)
//             setLoveItem(items)
//         }else{
//             setLoveItem(setItem(items))
//             setLove(true)
//         }
//     }
//     function onClickcuy(e){
//       if(hideLabel==true){
//           setHideLabel(false)
//       }else{
//           setHideLabel(true)
//       }
//     }


 
//     return (
//     <div className={hideLabel?"sidebar-hide":"sidebar"} style={{ '--colorBgMenu':themeColor?Color[themeColor][4]:'' }}>
     
//       {/* {role?role:''} */}
//        {<div style={{position:'relative',height:hideLabel?'55px':'30px',background:'#3BBAD6',}}><div style={{position:'absolute',right:hideLabel?'5px':0, top:0,display:hideLabel?'block':'flex',padding:'3px'}}><span onClick={handleAll} className="all">All</span><span  style={{cursor:'pointer', marginLeft:'10px'}} ></span><img onMouseOver={e=>{setLoveHover(true)}} onMouseOut={e=>{setLoveHover(false)}} onClick={FavoriteFunction} width='20px' style={{cursor:'pointer'}}  src={love?"/heart-selected.png":loveHover?"/heart-hover.png":"/heart.png"}></img></div></div>}
//       <List   disablePadding dense>
//         {loveItem?.map((sidebarItem, index) => (
//           <React.Fragment 
//            key={`${sidebarItem.label}${index}`}>
//             {sidebarItem === "divider" ? (
//               <Divider style={{ margin: "6px 0" }} />
//             ) : (
//               <SidebarItem
             
//                 className={router.pathname==sidebarItem && name!="notif"?.url.split("/")[1]?"class":"hover"}
//                 depthStep={depthStep}
//                 depth={depth}
               
//                 hideLabel = {hideLabel}
//                 expanded={expanded}
//                 item={sidebarItem}
//               />
//             )}
//           </React.Fragment>
//         ))}
//       </List>
//       {/* {name=="notif"?"":<div onClick={onClickcuy} style={{position:'absolute', bottom:'10px', right:10,cursor:'pointer'}}>
//           {hideLabel?<ArrowForwardIosIcon/>:<ArrowBackIosIcon/>}</div>} */}
//     </div>
//   );
// }

// export default Sidebar;





// // // // import React, { useEffect, useState } from 'react'
// // // // import {useSelector, useDispatch, connect} from 'react-redux'
// // // // import './../../style/overflow.css'
// // // // import { Dropdown,Toggle,Sidenav, Nav, Icon ,Popover} from 'rsuite';
// // // // import { render } from '@testing-library/react';
// // // // import Color from './../../Theme.json'


// // // // // const roleSelected = useSelector(state=>state.RoleSelected)
// // // // // const menu = useSelector(state=>state.MenuData)
// // // // const Lala = ()=>{
// // // //   return (
// // // //   <div>
// // // //     <Nav>
// // // //     <Dropdown
// // // //     style={{
// // // //       width: 200,
// // // //       marginLeft:10,
// // // //       border: '1px solid #ddd'
// // // //     }}
// // // //   >
   
// // // //     <Dropdown.Item style={{
// // // //       width: 200,
// // // //       marginLeft:10,
// // // //       border: '1px solid #ddd'
// // // //     }}>New File with Current Profile</Dropdown.Item>
// // // //     <Dropdown.Item>Download As...</Dropdown.Item>
// // // //     <Dropdown.Item>Export PDF</Dropdown.Item>
// // // //     <Dropdown.Item>Export HTML</Dropdown.Item>
// // // //     <Dropdown.Item>Settings</Dropdown.Item>
// // // //     <Dropdown.Item>About</Dropdown.Item>
// // // //   </Dropdown>
// // // //     </Nav>
    
   
// // // //   </div>  
// // // //   )
// // // // }
// // // // class Demo extends React.Component{
// // // //   constructor() {
// // // //     super();
// // // //     this.state = {
// // // //       expanded: true,
// // // //       activeKey: '1',
// // // //       MenuSelected:[],
// // // //       RoleSelected:{},
// // // //     };
// // // //     this.handleToggle = this.handleToggle.bind(this);
// // // //     this.handleSelect = this.handleSelect.bind(this);
// // // //   }
// // // //   componentWillMount(){
// // // //     for(const menu of this.props.Menu){
// // // //       if(this.props.RoleSelected.roleId==menu.roleId){
// // // //         this.setState({
// // // //           ...this.state,
// // // //           MenuSelected:menu.menu,
// // // //           RoleSelected:this.props.RoleSelected
// // // //         })
// // // //       }
// // // //     }
// // // //   }
// // // //   componentDidUpdate(prev1,prev){
    
// // // //     if(this.state.RoleSelected!=this.props.RoleSelected)
// // // //       for(const menu of this.props.Menu){
// // // //         if(this.props.RoleSelected.roleId==menu.roleId){
// // // //           this.setState({
// // // //             ...this.state,
// // // //             MenuSelected:menu.menu,
// // // //             RoleSelected:this.props.RoleSelected
// // // //           })
// // // //         }
// // // //       }
     

    
   
// // // //   }
// // // //   handleToggle() {
// // // //     this.setState({
// // // //       expanded: !this.state.expanded
// // // //     });
// // // //   }
 
// // // //   handleSelect(eventKey) {
// // // //     this.setState({
// // // //       activeKey: eventKey
// // // //     });
// // // //   }
  
// // // //   render() {
// // // //     const { expanded } = this.state;
// // // //     return (
// // // //       <div style={{ width: expanded?250:60,overflow:expanded?'auto':'none','--colorBgMenu':this.props.themeColor?Color[this.props.themeColor][4]:'' }} className="divParant">
// // // //         {/* <Toggle onChange={this.handleToggle} checked={expanded} /> */}
// // // //        <div onClick={this.handleToggle} style={{left:expanded?230:40,'--colorBgMenu':this.props.themeColor?Color[this.props.themeColor][4]:'','--color':this.props.themeColor?Color[this.props.themeColor][0]:'','--colorBgHover':this.props.themeColor?Color[this.props.themeColor][3]:''}} className="slimNav">
// // // //          {expanded?<Icon icon="arrow-left" />:<Icon icon="arrow-right" />}
// // // //        </div>
// // // //         <div style={{display:expanded?'flex':'block'}}>
// // // //           <div style={{width:expanded?'50%':'100%',textAlign:'center',padding:'5px'}}>
// // // //             <span style={{textAlign:'center', fontSize:'20px', fontFamily:'Apple-System'}}>All</span>
// // // //           </div>
      
// // // //           <div style={{width:expanded?'50%':'100%',textAlign:'center',padding:'5px'}}>
// // // //             <Icon style={{fontSize:'20px'}} icon="heart-o"></Icon>

// // // //           </div>
// // // //         </div>
// // // //         <Sidenav
// // // //           expanded={expanded}
// // // //           // defaultOpenKeys={['3', '4']}
// // // //           style={{position:!expanded?'absolute':'',zIndex:!expanded?'10':'1', width:!expanded?55:'inherit',background:'inherit', color:'white !important'}}
// // // //           activeKey={this.state.activeKey}
// // // //           onSelect={this.handleSelect}
// // // //         >
     
          
// // // //           <Sidenav.Body style={{color:'white'}}>
// // // //             <Nav >
           
// // // //             {this.state.MenuSelected.map((data, index)=>{
// // // //               if(data.menuParent=="" && !data.menuChildren){
// // // //                 return  <Nav.Item eventKey={index+1}  icon={<Icon style={{color:'white'}} icon="dashboard" />}>
// // // //                           <span style={{color:'white'}}>{data.menuDesc} <Icon icon="heart"></Icon></span>
// // // //                         </Nav.Item>
                        
// // // //               }else if(data.menuParent=="" && data.menuChildren){
              
// // // //               return(
// // // //                 <Dropdown
// // // //                   placement="rightStart"
// // // //                   eventKey={index+1}
// // // //                   className="liApa"
// // // //                   style={{paddingTop:'-10px',}}
// // // //                   title={<span>{data.menuDesc+" "}<Icon icon="heart"></Icon></span>}
// // // //                   icon={<Icon style={{color:'white'}} icon="magic" />}
// // // //                 >
                 
// // // //                 <Lala></Lala>

// // // //                   {/* <NestedMenu array={data.menuChildren} kode={index+1}></NestedMenu> */}
// // // //                 </Dropdown>)
// // // //               }
// // // //             })} 
            
               

// // // //               {/* <Dropdown
// // // //                 placement="rightStart"
// // // //                 eventKey="4"
// // // //                 title="Settings"
// // // //                 icon={<Icon icon="gear-circle" />}
// // // //               >
                 
// // // //                 <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
// // // //                 <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
// // // //                 <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
// // // //                 <Dropdown.Menu eventKey="4-4" title="Custom Action">
                
// // // //                   <Dropdown.Item eventKey="4-4-2">Action Name</Dropdown.Item>
// // // //                   <Dropdown.Item eventKey="4-4-3">Action Params</Dropdown.Item>
// // // //                 </Dropdown.Menu>
// // // //               </Dropdown>  */}
// // // //                 {/* <Nav.Item eventKey="1"  icon={<Icon style={{color:'white'}} icon="dashboard" />}>
// // // //                   <span style={{color:'white'}}>Dashboard <Icon icon="heart"></Icon></span>
// // // //                 </Nav.Item>
// // // //               {/* <Nav.Item  style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'0px', marginBottom:'0px',height:'30px',paddingTop:'-10px'}} eventKey="2"  icon={<Icon icon="group" />}>
// // // //                <span>
// // // //                 User Group
// // // //                 </span>              
// // // //             </Nav.Item> */}
// // // //              {/* <Nav.Item eventKey="2"   icon={<Icon style={{color:'white'}} icon="dashboard" />}>
// // // //                 <span style={{color:'white', paddingTop:'-10px'}}>Dashboard</span>
// // // //               </Nav.Item>
// // // //               <Dropdown
// // // //                 placement="rightStart"
// // // //                 eventKey="3"
// // // //                 className="liApa"
// // // //                 style={{paddingTop:'-10px',}}
// // // //                 title={'Advanced'}
// // // //                 icon={<Icon style={{color:'white'}} icon="magic" />}
// // // //               >
// // // //                 <Dropdown.Item style={{color:'white !important'}} eventKey="3-1">Geo</Dropdown.Item>
// // // //                 <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
// // // //                 <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
// // // //                 <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
// // // //               </Dropdown>
// // // //               <Dropdown
// // // //                 placement="rightStart"
// // // //                 eventKey="4"
// // // //                 title="Settings"
// // // //                 icon={<Icon icon="gear-circle" />}
// // // //               >
// // // //                 <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
// // // //                 <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
// // // //                 <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
// // // //                 <Dropdown.Menu eventKey="4-5" title="Custom Action">
// // // //                   <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
// // // //                   <Dropdown.Item eventKey="4-5-2">Action Params</Dropdown.Item>
// // // //                 </Dropdown.Menu>
// // // //               </Dropdown> */} 
// // // //             </Nav>
// // // //           </Sidenav.Body>
// // // //         </Sidenav>
// // // //       </div>
// // // //     );
// // // //   }
// // // // }
// // // // const mapStateToProps = state => ({
// // // //   RoleSelected: state.RoleSelected,
// // // //   Menu:state.MenuData,
// // // //   themeColor:state.ColorTheme
// // // // });
// // // // export default connect(
// // // //   mapStateToProps,
// // // //  null
// // // // )(Demo);
