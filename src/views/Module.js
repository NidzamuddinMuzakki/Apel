import {useEffect, useState} from 'react'
import {Router, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import useSWR from 'swr';
import Api from './../ApiSetting';
import jwt_decode from "jwt-decode";
import {Param,ChangeBranchSelected,ChangePeriodSelected,ChangeDateSelected,BranchData,DateData, RoleData,UserData,UserSetting,PeriodData, MenuData, ChangeModuleSelected,ChangeRoleSelected} from './../Redux/Profile/Action';
// import { useTranslation } from 'react-i18next';
import Loading from './../Components/Loading';
import AlertTunggu from './../Components/Alert/AlertTunggu'
export default function Module(props) {
    // const {t, i18n} = useTranslation();

    // const changeLanguange = (Language) =>{
    //     i18n.changeLanguage(Language);
    // }

    const [loading, setLoading] = useState(false)
    const [token] = useState(localStorage.getItem('token'));
    const [systemApp, SetSystemApp] = useState('');
    const [refreshToken] = useState(localStorage.getItem('refresh_token'));
    const [moduleSelected] = useState(localStorage.getItem('moduleSelected'));
    const moduleSelectedRedux = useSelector(state=>state.ModuleSelected)
    const [offline, setOffline] = useState(false);
    const [dataTunggu, setDataTunggu] = useState(false);
    const Param1 = useSelector(state=>state.Param)
    const dispatch = useDispatch();
    const {data:dataParam} = useSWR(Api()+'/general/system/param',url=>{
        axios.get(url).then(res=>{
         dispatch(Param(res.data.data[0]))
        })
      },{revalidateOnFocus:false})
    const {data:dataModule, error:dataModuleError} = useSWR(Api()+'/general/user/module/',url=>axios.get(url,{headers:{'Authorization':"Bearer "+token}}),{revalidateOnFocus:false})
    useEffect(()=>{

        if(moduleSelectedRedux==""){
            localStorage.setItem('Route', '/module')
            dispatch(ChangeModuleSelected(JSON.parse(moduleSelected)))
        }
    },[moduleSelected])

    
    useEffect(()=>{
        let cuy = (Param1.sessionTimeout-60)
        var timeout;
document.onmousemove = function(){
    clearTimeout(timeout);
    
    timeout = setTimeout(function(){
       setDataTunggu(true)
            
    }, cuy?cuy*1000:3540000);
}
    },[])
    
    useEffect(()=>{
        console.log(Param1)
        if(Param1!="" && Param1.systemdatetime){
            let lala = Param1.systemdatetime
            let hay = lala?.split(" ");
            let nowSystemDate = hay[0];
            let datetimeSystemDate = hay[1];
            let tahun = nowSystemDate.split("-")[0];
            let bulan = nowSystemDate.split("-")[1];
            let tanggal = nowSystemDate.split("-")[2];
           
            var timestamp = new Date(parseInt(tahun), parseInt(bulan)-1, parseInt(tanggal),
            parseInt(datetimeSystemDate.split(":")[0]), parseInt(datetimeSystemDate.split(":")[1]), parseInt(datetimeSystemDate.split(":")[2])); 
            var interval = 1;
           
            setInterval(function () {
                timestamp = new Date(timestamp.getTime() + interval * 1000);
             
                SetSystemApp(timestamp)
                
            },Math.abs(interval) * 1000)
        }
          
  
           
    }, [Param1])
    const Logoout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token')
        history.replace('/login')
    }
    if(dataModule){
        localStorage.setItem('itemsModule',JSON.stringify(dataModule.data.data))
    }
    const history = useHistory();
    const FetcherModule = (data, id, token)=>{
        axios.get(Api()+'/general/user/profile', {params: {
            moduleId: id
          },headers:{
            'Authorization':"Bearer "+token
        }}).then(res=>{
            setLoading(false)
           const cuy = res.data.data;
            
          
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
           dispatch(ChangeModuleSelected({moduleName:data, moduleId:id}))
           localStorage.setItem('moduleSelected',JSON.stringify({moduleName:data, moduleId:id}))
           history.replace('/')

           

        }).catch(error=>{
            setLoading(false)
            alert(error.response.data.data)
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token')
            history.replace('/login')
        })
    }
    const handleClick= (e, data, id)=>{
        
        setLoading(true)
        let decodeToken = jwt_decode(token);

        if(systemApp?.getTime()>decodeToken.exp*1000-30000){
            axios.post(Api()+'/master/auth/refresh_token',{
                refresh_token:refreshToken,
               
            },{headers:{
                "Authorization":"Baerer "+token
            }}).then(res=>{
                
                FetcherModule(data, id, res.data.token)
                
            }).catch(error=>{
                setLoading(false)
                alert(error.response.data.data)
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token')
                history.replace('/login')
            })
        }else{
            FetcherModule(data, id, token)
            
        }
        
        // fetch('https://api.adapro.tech/general/user/profile?moduleId=ANT', {
        // method: "GET",
        // headers: {'key':token,
        //     'x-mock-match-request-headers':'key',"Content-type": "application/json"}
        // })
        // .then(response => response.json()) 
        // .then(json => console.log(json))
        // .catch(err => console.log(err));
        
    }
    const handleSaveSetting = (data)=>{
        if(data=='yes'){
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token')
            history.replace('/login')
        }else{
            setDataTunggu(false)
        }
    }
    useEffect(()=>{
        if(!token){
            history.replace('/login')
        }
    },[token])
    
    return (
        <>
         <div style={{fontFamily:'Poppinsbold', fontSize:'20px',position:'fixed',zIndex:100,bottom:'10px', left:'10px' }}>
                <span>A002G</span>
            </div>
        {/* themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover} */}
           <AlertTunggu   open={dataTunggu} onClick={handleSaveSetting}></AlertTunggu>
        {loading?<Loading></Loading>:null}
        <div    className="divParentModule">
               {/* <button onClick={()=>changeLanguange("en")}>En</button>
               <button onClick={()=>changeLanguange("id")}>Id</button> */}
               <div className="divModule">
                    <div className="bigmendung">
                        <img width="190" src="/bigmendung_putih.png"></img>
                    </div>
                    <div className="littlemendung">
                        <img width="190" src="/littlemendung_putih.png"></img>
                    </div>
                    <div className="bigmendung1">
                        <img width="190" src="/bigmendung_putih.png"></img>
                    </div>
                    <div className="littlemendung1">
                        <img width="190" src="/littlemendung_putih.png"></img>
                    </div>
                    <div>

                        <div className="chooseModule">
                            <p className="judulModule">Choose The  Module</p>
                            <p className="tanggalModule">{new Date().toJSON().slice(0,10).split('-').reverse().join('/')}</p>
                        </div>
                        <div  className="module ">
                            <div className="row m-2">
                                {dataModule?dataModule.data.data.map((cuy,index)=>(
                                    <div  onClick={e=>handleClick(e,cuy.moduleName, cuy.moduleId)} id={"module"|+cuy.moduleName} key={index} className="col-md-6 col-sm-12 mb-2">
                                        <div className={moduleSelectedRedux?.moduleName==cuy.moduleName?'pilihanModuleSelected':'pilihanModule'}> 
                                            <div className="iconPilihanModule">
                                                <img src="/antasena.png" width="50"></img>
                                            </div>
                                            <div className="keteranganPilihanModule">
                                                <p className="judulpilihanmodule">{cuy.moduleName}</p>
                                                <p className="deskpilihanmodule">{cuy.moduleDesc}</p>
                                            </div>
                                            
                                        </div>
                                    </div>

                                )):<Loading></Loading>}    


                            </div>
                          
                        </div>
                        <div onClick={Logoout} className="logoutModule"><span>Logout</span></div>
                    </div>
               </div>
            </div>
        </>
    )
}