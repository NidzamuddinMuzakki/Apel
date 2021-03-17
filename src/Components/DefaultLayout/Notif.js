import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import './../../style/Notif.css'
import ReactNotification from 'react-notifications-component'
import axios from 'axios';
import Api from './../../ApiSetting'
import PercentageClear from './Notif/PercentageClear'
import RangeClearNotif from './Notif/RangeClearNotif'
import PopUpClearNotif from './Notif/PopUpClearNotif'
import './../../style/Notif.css';
import Color from './../../Theme.json'
import {useSelector} from 'react-redux'
import {Icon} from 'rsuite'
function SidebarItem({ depthStep = 10, jumlah,depth = 0,expanded,onClick: onClickProp, item,hover ,hideLabel,...rest }) {
  const [collapsed, setCollapsed] = React.useState(true);
  const { label, items,status,Icon1,url, datetime } = item;
  const [loading, setLoading] = useState(false)
 
  function toggleCollapse() {
    if(hideLabel){

    }else{
      setCollapsed(prevValue => !prevValue);

    }
  }

  function onClick(e) {
  
     
      
      if(e.target.id=="trash"){
        
        onClickProp(e, item.id,"trash");
       }else{
         onClickProp(e, item.id);

       }
     

   
  }


  const cuyData = "New Generated Metadata";
  let dataTampil = cuyData.split(" ");
  let last = dataTampil[dataTampil.length-1]
  let tampil = "";
  for(let i=0;i<dataTampil.length-1;i++){
      tampil+=dataTampil[i]+" ";
  }
  return (
    <>
      
      <ListItem
      
        className={"sidebar-item1"}
       style={{padding:'0px',width:"100%"}}
        onClick={onClick}
        button
        dense
        {...rest}
      >
        <div
        
          style={{background:'red',width:'500px'}}
        >
            
            <div   style={{display:"flex",justifyContent:'space-between', padding:'5px',alignItems:'center',margin:'auto',background:jumlah>0 && status=="unread"?'#e5f4f8':'white'}}>
               
                <div >
                    <div>
                        <span className="judulNotif">{tampil}<span style={{fontWeight:'bold'}}>{last}</span></span>
                    </div>
                    <div>
                        <span className="keteranganNotif">11 Metadata</span>
                    </div>
                </div>
                <div style={{marginLeft:'5px'}}>
                    <span className="waktuNotif">{jumlah>0?status:'read'}</span>
                    <br></br>
                    <span className="waktuNotif">{datetime}</span>
                </div>
                <div style={{marginLeft:'0px'}}>
                    <Icon id="trash" className={"icon_trash"} icon={loading?"spin":"trash"}></Icon>
                </div>
            </div>
        </div>
        
      </ListItem>
      <Collapse in={!collapsed && !hideLabel }  timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List disablePadding dense    > 
            {items.map((subItem, index) => (
              <React.Fragment  key={`${subItem.name}${index}`}>
                {subItem === "divider" ? (
                  <Divider  style={{ margin: "6px 0", }} />
                ) : (
                  <SidebarItem
                    collapses={collapsed}
                    className="hover"
                    depth={depth + 1}
                   
                    depthStep={depthStep}
                    item={subItem}
                  />
                )}
              </React.Fragment>
            ))}
          </List>
        ): null}
      </Collapse>
    </>
  );
}

function Sidebar({ items,onClick, depthStep, depth, expanded, onChange,name,role, collapsed}) {
    const [hideLabel, setHideLabel] = React.useState(false); 
    const [percentage, SetPercentage] = React.useState(0);
    const [popUp, SetpopUp] = React.useState(false);
    const [Jumlah, SetJumlah] = useState(0)
    const themeColor = useSelector(state=>state.ColorTheme)
    const [dataNotif, setdataNotif] = useState([]);
    const [loading, setLoading] = useState(false)
    const moduleId = useSelector(state=>state.ModuleSelected)
    const [disableMore,setDisableMore] = useState(false);
    useEffect(()=>{
      axios.get(Api()+'/general/user/notification?lastId=3&moduleId=ANT',{headers:{
        key:localStorage.getItem('token'),
        
      }}).then(res=>{
        res.data.data.loading = false
        setdataNotif(res.data.data)
        onChange(res.data.data.length-1)
        SetJumlah(res.data.data.length-1)
        console.log(res)
      })
    },[])
    const onChangeRange = (data)=>{
        SetPercentage(data)
    }
    const handleClick=(e,id1,name="update")=>{
      // var myHeaders = new Headers();
      // // myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("x-mock-match-request-body", "true");
      
      // var raw = JSON.stringify({"moduleId":"ANT","id":"3"});
      
      // var requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: 'follow'
      // };
      
      // fetch(Api()+"/general/user/notification", requestOptions)
      //   .then(response => {return response.json()}).then(data=>{
      //     console.log(data)
      //       onClick('','dataNotifikasi',data)
      //       onChange(Jumlah-1)
      //       SetJumlah(Jumlah-1)
      //   })
      //   .catch(error => console.log('error', error));
    
     if(name=="trash"){
      setLoading(true)
      var config = {
        method: 'delete',
        url: Api()+'/general/user/notification?moduleId=ANT&id=3',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        
      };
      
      axios(config)
      .then(function (response) {
        setLoading(false)
        onClick('','dataNotifikasi',response.data)
      })
      .catch(function (error) {
        setLoading(false)
        onClick('','dataNotifikasi',error.response.data)
      });
     }else{
       
       axios({
         method: 'post',
         url:Api()+"/general/user/notification" ,
         headers: {"Content-Type":"application/json","x-mock-match-request-body": "true"}, 
         data: {
           "moduleId":"ANT","id":"3"// This is the body part
         }
       }).then(res=>{
         if(Jumlah>0 && id1==3){
           onClick('','dataNotifikasi',res.data)
           onChange(Jumlah-1)
           SetJumlah(Jumlah-1)
 
         }
       }).catch(err=>{
  onClick('','dataNotifikasi',err.response.data)
          onChange(Jumlah-1)
          SetJumlah(Jumlah-1)
       });

     } 


      // axios.post(Api()+"/general/user/notification",{
      
      //   data:{moduleId:"ANT",
      //   id:3},
      //   headers:{'x-mock-match-request-body':'true',"Content-Type": "application/json"}
      // }).then(res=>{
      //   alert("yes")
      //   // onClick('','dataNotifikasi',res.data)
      //   // onChange(Jumlah-1)
      //   // SetJumlah(Jumlah-1)
      // }).catch(err=>{
      //   alert("no")
      //   // onClick('','dataNotifikasi',err.response.data)
      //   // onChange(Jumlah-1)
      //   // SetJumlah(Jumlah-1)
      // })
    }
    const onClickClear = (data)=>{
        if(percentage>0){
            SetpopUp(true)

        }
    }
    const handleMore=()=>{
      var config = {
        method: 'get',
        url: Api()+'/general/user/notification?moduleId=ANT&lastId=1',
        headers: { 
          'x-mock-match-request-headers': 'key', 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTE2NTIyNjksImRhdGEiOnsiaWQiOnsiZGVwdElkIjoiREVQVDAxIiwiZ3JvdXBJZCI6IkZJTiIsInJvbGVJZCI6Ik1LUjAxIn0sInN0YXR1cyI6eyJzdGF0dXNJbmZvcm1hdGlvbiI6ImFjdGl2ZSIsInBlcmlvZFVzYWdlIjoxfSwidXNlcm5hbWUiOiIyMDIwIiwiZXhwaXJlZEluZm9ybWF0aW9uIjp7InVzZXIiOiIyMDIyLTEyLTMwVDAwOjAwOjAwLjAwMFoiLCJwYXNzd29yZCI6IjIwMjEtMDEtMjBUMjI6MzY6NDEuMDAwWiJ9LCJhY2Nlc3NJbmZvcm1hdGlvbiI6eyJ2aWV3IjoidHJ1ZSIsImNyZWF0ZSI6InRydWUiLCJ1cGRhdGUiOiJ0cnVlIiwiZGVsZXRlIjoidHJ1ZSJ9fSwiaWF0IjoxNjExNjQ4NjY5fQ.8TZ96Iy15T5fvvXmNr8NWcF_qJsoIHuSHld3oInRL-k'
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setDisableMore(true)
      })
      .catch(function (error) {
        setDisableMore(true)
        console.log(error);
      });
    }
    const handleClose = (data)=>{
        if('clear'){
          var data = '';

          var config = {
            method: 'delete',
            url: Api()+'/general/user/notification?moduleId=ANT&id=3',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTE2NTIyNjksImRhdGEiOnsiaWQiOnsiZGVwdElkIjoiREVQVDAxIiwiZ3JvdXBJZCI6IkZJTiIsInJvbGVJZCI6Ik1LUjAxIn0sInN0YXR1cyI6eyJzdGF0dXNJbmZvcm1hdGlvbiI6ImFjdGl2ZSIsInBlcmlvZFVzYWdlIjoxfSwidXNlcm5hbWUiOiIyMDIwIiwiZXhwaXJlZEluZm9ybWF0aW9uIjp7InVzZXIiOiIyMDIyLTEyLTMwVDAwOjAwOjAwLjAwMFoiLCJwYXNzd29yZCI6IjIwMjEtMDEtMjBUMjI6MzY6NDEuMDAwWiJ9LCJhY2Nlc3NJbmZvcm1hdGlvbiI6eyJ2aWV3IjoidHJ1ZSIsImNyZWF0ZSI6InRydWUiLCJ1cGRhdGUiOiJ0cnVlIiwiZGVsZXRlIjoidHJ1ZSJ9fSwiaWF0IjoxNjExNjQ4NjY5fQ.8TZ96Iy15T5fvvXmNr8NWcF_qJsoIHuSHld3oInRL-k'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            onClick('','dataNotifikasi',response.data)
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
            onClick('','dataNotifikasi',error.response.data)
          });
        }
        SetpopUp(false)
    }
    function onClickcuy(e){
        if(hideLabel==true){
            setHideLabel(false)
        }else{
            setHideLabel(true)
        }
      }
 
    return (
   
    <div className={hideLabel?"sidebar-hide":"sidebarNotif"}>
       
        <div className="rotate">
        
      <div className="resizeAside1"> 

      </div>
    <PopUpClearNotif value={percentage} open={popUp} onClick={handleClose}></PopUpClearNotif> 
    <RangeClearNotif themeColor={themeColor?Color[themeColor][0]:''} value={percentage}></RangeClearNotif>
    <PercentageClear themeColor={themeColor?Color[themeColor][0]:''} themeColorBgHover={themeColor?Color[themeColor][3]:''} onClick={onClickClear} onChange={onChangeRange}></PercentageClear>
    <h5 style={{background: '#F7F7F7'}} className="NotifLabel">NOTIFICATION</h5>
      <List  disablePadding dense>
        {dataNotif?dataNotif.map((sidebarItem, index) => (
          <React.Fragment 
           key={`${sidebarItem.label}${index}`}>
            {sidebarItem === "divider" ? (
              <Divider style={{ margin: "6px 0" }} />
            ) : (
              <SidebarItem
                loading={loading}
                className="class"
                depthStep={depthStep}
                depth={depth}
                jumlah={Jumlah}
                onClick={handleClick}
                hideLabel = {hideLabel}
                expanded={expanded}
                item={sidebarItem}
              />
            )}
          </React.Fragment>
        )):""}
      </List>
      </div>
      <br></br>
      <button onClick={handleMore} className="NotifLabel" style={{display:disableMore?'none':'flex', fontFamily:"Poppinsbold",margin:'auto',justifyContent:'center', transform:'rotateY(180deg)'}}>See More</button>
    </div>
  );
}

export default Sidebar;