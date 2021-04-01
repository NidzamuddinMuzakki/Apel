import React,{useEffect, useState, Suspense, lazy} from 'react'

import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import Header from './../Components/DefaultLayout/Header'
import Aside from './../Components/DefaultLayout/Aside'
import Notif from './../Components/DefaultLayout/Notif'
import News from './../Components/DefaultLayout/News'
import axios from 'axios';
import useSWR from 'swr'
import AsideModule from './../Components/DefaultLayout/AsideModule'
import {useSelector, useDispatch} from 'react-redux'
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import Api from './../ApiSetting';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
import {ChangeColorTheme,Param,ChangeModuleSelected,ChangeDateSelected,ChangeBranchSelected,ChangePeriodSelected ,ChangeRoleSelected,BranchData, DateData, MenuData,PeriodData,RoleData,UserData,UserSetting} from './../Redux/Profile/Action'
import { useTranslation } from 'react-i18next';

import AlertTunggu from './../Components/Alert/AlertTunggu'

const Role = lazy(() => import('./Pages/Role'));
const Branch = lazy(() => import('./Pages/Branch'));
const UserRole = lazy(() => import('./Pages/UserRole'));
const UserBranch = lazy(() => import('./Pages/UserBranch'));
// const BranchMaping = React.lazy(() => import('./../views/Pages/BrancMapping'));

export default function DefaultLayout(props){
    const {t, i18n} = useTranslation();
   const [notif, setNotif] = useState(0)
    const router = useHistory();
    const dispatch = useDispatch();
    const [token] = useState(localStorage.getItem('token'));
    const [dataJudul] = useState(localStorage.getItem('judul'))
    
    const Param1 = useSelector(state=>state.Param)
    const [SelectedLocal] = useState(localStorage.getItem('moduleSelected'))
    const [dataTunggu, setDataTunggu] = useState(false);
    const handleSaveSetting = (data)=>{
      if(data=='yes'){
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token')
          router.replace('/login')
      }else{
          setDataTunggu(false)
      }
  }
    const OnClickRetry = ()=>{
      // router.replace('/')
      window.location.reload();
    }
    useEffect(()=>{
      var timeout;
      function nidzam(data){
        clearTimeout(timeout);
        
        timeout = setTimeout(function(){
           setDataTunggu(true)
           },data?data:600*1000);
      }
     if(Param1!="" ){
      localStorage.setItem('Route', router.location.pathname)
      let cuy = (Param1[0]?.sessionTimeout-60)
      document.addEventListener('onmousemove', nidzam(cuy*1000))

  // cuy?cuy*1000:3540000
}
return ()=>{clearTimeout(timeout) }
  },[Param1, dataTunggu])
    // const [dataMenu, SetDataMenu] = useState([]);
    // const RoleSelected = useSelector(state=>state.RoleSelected);
    // const DataM = useSelector(state=>state.MenuData);
    // useEffect(()=>{
    //     if(DataM!=""){
    //       for(const cuy of DataM){
    //         if(cuy.roleId==RoleSelected.roleId){
    //             SetDataMenu(cuy.menu)
    //         }
    //       }
    //     }
    // },[RoleSelected])
    
    useEffect(()=>{
        dispatch(ChangeModuleSelected(JSON.parse(SelectedLocal)))
        if(!SelectedLocal){
            router.replace('/module')
        }else  if(token==null){
            router.push('/login');
        }
    },[SelectedLocal,token])
    const [hideShowMenu, setHideShowMenu] = useState(true);
    const [hideShowNotif, setHideShowNotif] = useState(false);
    const [hideShowModule, setHideShowModule] = useState(false);
    const [nameAside, setNameAside] = useState('menuHideShow');
    const [items, setItems] = useState([]);
    const SelectedModuleNow  = useSelector(state=>state.ModuleSelected)
    const [offline, setOffline] = useState(false);
    const UserSetting11  = useSelector(state=>state.UserSetting);
    const [systemDate, setSystemdate] = useState('');
   const {data:DataProfile, error:DataProfileError} = useSWR(Api()+'/general/user/profile?moduleId='+JSON.parse(SelectedLocal)?.moduleId,
   url=>axios.get(url,{headers:{'Authorization':"Bearer "+token}})
   ,{revalidateOnFocus:false})
   const {data:dataParam} = useSWR(Api()+'/general/system/param',url=>{
    axios.get(url, {
      timeout: 5000
    }).then(res=>{
    
     dispatch(Param(res.data.data))
    
    
     setSystemdate(res.data.data)
    }).catch(error=>{
      
    })
  },{revalidateOnFocus:false})
  useEffect(()=>{
    if(UserSetting11!=""){
      for(const data of UserSetting11.language){
        if(data.selected=="yes"){
          if(data.id.toLowerCase()=="en"){
            i18n.changeLanguage("lang_glo");

          }else{
            i18n.changeLanguage("lang_loc");

          }
        }
      }
      for(const cuy of UserSetting11.theme){
        if(cuy.selected=='yes'){
          dispatch(ChangeColorTheme(cuy.colorId))
        }
      }

    }
  },[UserSetting11])
  
    if(DataProfileError){
      return <div style={{display:'flex',justifyContent:'center',fontFamily:'Poppinsbold', alignItems:'center', width:'100vw',height:'100vh'}}>
        <span onClick={OnClickRetry} className="retry">Retry</span>
    </div>
    }
    if(!DataProfile){
      return <div style={{display:'flex',justifyContent:'center',fontFamily:'Poppinsbold', alignItems:'center', width:'100vw',height:'100vh'}}>
      <span style={{fontFamily:'Poppinsbold'}}>Loading....</span>
  </div>
    }
 
    if(DataProfile){
        const cuy = DataProfile.data.data
        for(const roleaja of cuy.roleData){
            for(const menuAja of cuy.menuData){
                if(roleaja.roleId==menuAja.roleId && roleaja.selected=="yes"){
                 
                 dispatch(ChangeRoleSelected({roleId:roleaja.roleId,roleName:roleaja.roleName}))
                }
            }
        }
        if(cuy.branchData.bankwide=="no"){
            for(const branch of cuy.branchData.branch){
                if(branch.selected=="yes"){
                     dispatch(ChangeBranchSelected({branchId:branch.branchId,branchName:branch.branchName}))
                     break
                }
            }
        }else{
         dispatch(ChangeBranchSelected({branchId:cuy.branchData.bankwide,branchName:cuy.branchData.bankwide}))
        }

        for(const periode of cuy.periodData){
            if(periode.selected=="yes"){
             dispatch(ChangePeriodSelected({periodId:periode.periodId,periodName:periode.periodName}))
             for(const date of cuy.dateData){
                 if(periode.periodId==date.dateType){
                     dispatch(ChangeDateSelected({dateType:date.dateType, dateValue:date.dateValue}))
                     
                 }
             }
             break
            }
        }
        dispatch(BranchData(cuy.branchData))
        dispatch(DateData(cuy.dateData))
        dispatch(MenuData(cuy.menuData))
        dispatch(PeriodData(cuy.periodData))
        dispatch(RoleData(cuy.roleData))
        dispatch(UserData(cuy.userData))
        dispatch(UserSetting(cuy.userSetting))
     
    }









   
    

    const handleModule = (data)=>{
       console.log(data)
    //    dispatch(ChangeModuleSelected(data))
    }

    function headerClick(e, name, data){
        if(name=="dataNotifikasi"){
         
          if(data?.responseCode==200 && data){
           
            store.addNotification({
              title: "Success",
              message: data.data,
              type: "success",
              insert: "bottom",
              container: "bottom-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true
              }
            });
          }else if(data && data?.responseCode!=200 ){
            store.addNotification({
              title: "Failed",
              message: data.data,
              type: "danger",
              insert: "bottom",
              container: "bottom-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true
              }
            });
          }
        }
        if(name=="menuHideShow"){
          if(hideShowMenu==true && nameAside=="menuHideShow"){
            setHideShowMenu(false)
            setNameAside('menuHideShow');
          }else if(hideShowMenu==true || nameAside!="menuHideShow" ){
            setHideShowMenu(true)
            setNameAside('menuHideShow');
          }
          else if(hideShowMenu==false || nameAside!="menuHideShow"){
            setHideShowMenu(true)
            setNameAside('menuHideShow');
          }
        }
        if(name=="moduleHideShow"){
          
          
          if(hideShowModule==true && nameAside=="moduleHideShow"){
            setHideShowModule(false)
            setNameAside('moduleHideShow');
          }else if(hideShowModule==true || nameAside!="moduleHideShow" ){
            setHideShowModule(true)
            setNameAside('moduleHideShow');
          }
          else if(hideShowModule==false || nameAside!="moduleHideShow"){
            setHideShowModule(true)
            setNameAside('moduleHideShow');
          }
        }
        if(name=="notifHideShow"){
          
          
          if(hideShowNotif==true){
            setHideShowNotif(false)
           
          }else{
            setHideShowNotif(true)
           
          }
         
          
        }
        if(name=="logout"){
          
          localStorage.removeItem('token');
          
          router.replace('/login')
        
          
        }
       
    }
    const handleNotif =(data)=>{
      setNotif(data)
    }
    function onClick(e, item) {
      console.log(item)
      router.replace(item.menuUrl,null, { shallow: false })
      
    }
  
    // const itemsModule = [
    //   { name: "Antasena", label: "Antasena",Icon:'antasena', url:'/antasena' },
    // ]
    const itemsNotif = [
      { name: "Cuy", label: "Cuy" },
    ]
    // const items1 = [
    //   { name: "home", label: "Home", Icon: HomeIcon },
    //   {
    //     name: "billing",
    //     label: "Billing",
    //     Icon: ReceiptIcon,
    //     items: [
    //       { name: "statements", url:'statemant',label: "Statements", onClick },
    //       { name: "reports",  url:'report',label: "Reports", onClick }
    //     ]
    //   },
    //   "divider",
    //   {
    //     name: "settings",
    //     label: "Settings",
    //     Icon: SettingsIcon,
    //     items: [
    //       { name: "profile", label: "Profile" },
    //       { name: "insurance", url:'incsurence' ,label: "Insurance", onClick },
    //       "divider",
    //       {
    //         name: "notifications",
    //         label: "Notifications",
    //         Icon: NotificationsIcon,
    //         items: [
    //           { name: "email", url:'email' ,label: "Email", onClick },
    //           {
    //             name: "desktop",
    //             label: "Desktop",
    //             Icon: DesktopWindowsIcon,
    //             items: [
    //               { name: "schedule", label: "Schedule" },
    //               { name: "frequency", label: "Frequency" }
    //             ]
    //           },
    //           { name: "sms", label: "SMS" }
    //         ]
    //       }
    //     ]
    //   }
    // ]; 
    const handleOffline = (data)=>{
      setOffline(data)
    }
    const loading = () => <div className="">Loading...</div>
    const handleShowNotif = (data)=>{
      
      
      if(data.responseCode==200){
        store.addNotification({
            title: "Success",
            showIcon:"true",
            message: data.data,
            type: "success",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true,
              click:true,
              showIcon:true,
            }
          });

    }else{
        store.addNotification({
            title: "Failed",
            message: data.data,
           
            type: "success",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true,
              click:true,
              showIcon:true,
            }
          });
    }
    }
    return (
        <>
            <AlertTunggu   open={dataTunggu} onClick={handleSaveSetting}></AlertTunggu>
             <div className="h-screen flex flex-col bg-gray-300">
             <ReactNotification />
            {props.name=="login"?'':
                 <Header systemDate={systemDate} data={notif} onClick={headerClick}></Header>
              }
              <div className="flex-grow flex flex-row overflow-hidden justify-center">
          
              {props.name=="login" || props.tampil==false?'':<div className="flex-shrink-0 w-auto border-t-2 border-b-2">
                  {nameAside=="moduleHideShow"?hideShowModule?<AsideModule ModuleSelected={SelectedModuleNow}   ></AsideModule>:'':''}
                  {nameAside=="menuHideShow"?hideShowMenu?<Aside  ></Aside>:'':''}
                </div>}
                {offline?<div style={{position:'absolute',width:'100vw',height:'40px',display:'flex',justifyContent:'center',alignItems:"center" ,textAlign:'center' ,bottom:0,background:"red",paddingLeft:'20px', paddingRight:'20px', paddingTop:'5px', fontWeight:'bold',paddingBottom:'5px',zIndex:100, borderRadius:'5px', color:'white', fontFamily:'Poppinsbold'}}>
                    You Are Offline
                  </div>:null}
                <div className="flex-1 flex flex-col overflow-auto bg-white">
                 
                  <div className="flex-1 bg-gray-200">
                    <div className="relative">
                      {/* <DataGrid></DataGrid> */}
                      {/* <User></User> */}
                      <Suspense fallback={<div>Loading...</div>}>
                        <section>
                         
                          {router.location.pathname=="/cred/branch"?
                          <Branch onClick={handleShowNotif}></Branch>:router.location.pathname=="/cred/role"?
                          <Role onClick={handleShowNotif}></Role>:
                          router.location.pathname=="/cred/usermap/role"?
                          <UserRole onClick={handleShowNotif}></UserRole>:router.location.pathname=="/cred/usermap/branch"?
                          <UserBranch onClick={handleShowNotif}></UserBranch>:
                          <div style={{position:'relative',textAlign:'center', display:'flex', justifyContent:'center',alignItems:'center',height:"500px",fontFamily:'Poppinsbold',fontSize:"20px"}}>Not Found
                          <div style={{position:'absolute', bottom:'-10px',left:5, fontFamily:'Poppinsbold', color:'#c4c4c4'}}>
                            {dataJudul=="User Role Mapping"?"A004M":dataJudul=="User Branch Mapping"?"A007M":''}
                          </div>
                          </div>}
                        </section>
                      </Suspense>

                      
                      
                    </div>
                  </div>
               
                </div>
              
                {props.name=="login"?'':<div className="relative flex-shrink-0 w-auto   bg-white border-t-2 border-b-2">
                  <div style={{position:"absolute",display:hideShowNotif?"block":"none", zIndex:200, right:0, height:'100%'}}>
                      <Notif  onClick={headerClick} onChange={handleNotif} items={itemsNotif} ></Notif>

                  </div>
                  </div>}
                </div>
             
                {props.name=="login"?'':<div style={{height:'30px'}} className="relative flex bg-white rounded-b-xl">
                  <div  className=" border-r-2" style={{width:"300px", paddingLeft:'5px'}}>
                    <span style={{fontFamily: 'Poppinsbold',fontStyle: 'normal',fontWeight: 'normal',fontSize: '18px',}} className="text-center m-auto">&copy; 2021 
                      <span style={{textAlign: 'center',color: '#3BBAD6'}}>Adapro Nusa Data</span>
                    </span>
                  </div>
                  <div style={{fontFamily:'Poppinsbold'}} className="text-center  w-full">
                      <News onChange={handleOffline}></News>    
                  </div>
              </div>}
            </div>
  
        </>
    )
}