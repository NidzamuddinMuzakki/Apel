import Popover from '@material-ui/core/Popover';
import {useDispatch, useSelector} from 'react-redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Avatar from '@material-ui/core/Avatar';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import FormControl from '@material-ui/core/FormControl';
import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import {ChangeModuleSelected, ChangePeriodSelected, ChangeRoleSelected, PeriodData} from './../../Redux/Profile/Action'
import Loading from './../Loading'
import Color from './../../Theme.json';
import CustomCheckbox from './../Header/CustomCheckbox'
import CustomCalender from './../Header/CustomCalender'
import PopUpProfile from './../Header/PopUpProfile'
import PopUpChangePassword from './../Header/PopUpChangePassword'
import PopUpAppSetting from './../Header/PopUpAppSetting'
import axios from 'axios';
import Api from './../../ApiSetting';

import { useTranslation } from 'react-i18next';

export default function Header(props) {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const PilihanbranchRedux = useSelector(state=>state.BranchData)
    const PilihandateRedux = useSelector(state=>state.DateData)
    const [widthW, setwidthW] = useState(window.innerWidth)
    const [token] = useState(localStorage.getItem('token'))
    const moduleSelected = useSelector(state=>state.ModuleSelected)
    const RoleSelected = useSelector(state=>state.RoleSelected)
    const BranchSelected = useSelector(state=>state.BranchSelected)
    const PeriodSelected = useSelector(state=>state.PeriodSelected)
   
    const UserSetting11  = useSelector(state=>state.UserSetting);
    const ColorTheme = useSelector(state=>state.ColorTheme)
    const DateSelected = useSelector(state=>state.DateSelected)
    const [SelectDisable,setSelectDisable] = useState(BranchSelected.branchName=="bankwide"?false:true)
    const [theme, setTheme] = useState('');
    const [valueDate,setValueDate] = useState(""); 
    const [systemApp, SetSystemApp] = useState('');
    const [state, setState] = React.useState({
        role: '',
        name: '',
        periode:PeriodSelected.periodName,
        branch:'',
        periode1:'',
        
      });
      const Month = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"]
      const MonthIndo = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"]
      
      const dispatch = useDispatch(); 
      useEffect(()=>{
        setwidthW(window.innerWidth)
       
        
        SetSelectPeriode(false)
        
      },[window.innerWidth])
       useEffect(()=>{
         if(props.systemDate){
          let lala = JSON.parse(JSON.stringify(props.systemDate))
          let hay = lala[0].systemdatetime.split(" ");
          let nowSystemDate = hay[0];
          let datetimeSystemDate = hay[1];
          let tahun = nowSystemDate.split("-")[0];
          let bulan = nowSystemDate.split("-")[1];
          let tanggal = nowSystemDate.split("-")[2];
          nowSystemDate  = tanggal+" "+Month[parseInt(bulan)-1]+" "+tahun;

          var timestamp = new Date(parseInt(tahun), parseInt(bulan)-1, parseInt(tanggal),
          parseInt(datetimeSystemDate.split(":")[0]), parseInt(datetimeSystemDate.split(":")[1]), parseInt(datetimeSystemDate.split(":")[2])); 
        var interval = 1;
var IntervalLLA = setInterval(function () {
    timestamp = new Date(timestamp.getTime() + interval * 1000);
   
    SetSystemApp(`${nowSystemDate} ${timestamp.getHours()} : ${timestamp.getMinutes()} : ${timestamp.getSeconds()<10?'0'+timestamp.getSeconds():timestamp.getSeconds()}`)
},Math.abs(interval) * 1000)
return () => {
 clearInterval(IntervalLLA);
};
         }

        

         
         
       },[props.systemDate])

      useEffect(()=>{
        if(UserSetting11!=""){
          for(const theme of UserSetting11.theme){
            if(theme.selected=="yes"){
              setTheme(theme.colorId)
              
             
            }
          }
        }
       
      },[UserSetting11,ColorTheme])
      
      const [PopUpProfiles, SetPopUpProfile] = useState(false);
      const [PopUpChangePass, SetPopUpChangePass] = useState(false);
      const [PopUpAppSet, SetPopUpAppSet] = useState(false);
      const [anchorEl, setAnchorEl] = React.useState(null);
      const PilihanRoleRedux = useSelector(state=>state.RoleData)
      const PilihanPeriodRedux = useSelector(state=>state.PeriodData)
  
      
      const open = Boolean(anchorEl);
      const handleCloseProfile = (data)=>{
        props.onClick('','dataNotifikasi', data)
        SetPopUpProfile(false);
      }
      const handleCloseChangePass = ()=>{
        SetPopUpChangePass(false);
      }
      const handleOpenChangePass = ()=>{
        SetPopUpChangePass(true);
        setAnchorEl(null);
        
      }
      const handleOpenProfile = ()=>{
        SetPopUpProfile(true);
        setAnchorEl(null);
      }
      const handleOpenAppSet = ()=>{
        SetPopUpAppSet(true);
        setAnchorEl(null);
      }
      const handleCloseAppSet = (data)=>{
        props.onClick('','dataNotifikasi', data)
        SetPopUpAppSet(false);
      }
      const [roleClick, setRoleClick] = useState(false);
      const [periodeClick, setPeriodeClick] = useState(false);
      const [branchClick, setBranchClick] = useState(false);
    
      const [statesearchbranch,Setstatesearchbranch] = useState('')
      const [pilihanBranch,SetPilihanBranch] = useState(PilihanbranchRedux.branch)
      const [pilihanBranchSearch,SetPilihanBranchSearch] = useState([])
      useEffect(()=>{
        SetPilihanBranchSearch(PilihanbranchRedux.branch)
      },[PilihanbranchRedux.branch])
      const router = useHistory();
      let  cobaaja = 1
      let dateNowCuy = new Date();
      let Day = dateNowCuy.getDay();
      let DateNow = dateNowCuy.getDate();
      let MonthNow = dateNowCuy.getMonth();
      let YearNow = dateNowCuy.getFullYear();
    

    
      const [SelectPeriode, SetSelectPeriode] = useState(false); 
      const [SelectPeriodeMonth, SetSelectPeriodeMonth] = useState(false);
      const [SelectPeriodeDaily, SetSelectPeriodeDaily] = useState(false);
      const [SelectPeriodeYear, SetSelectPeriodeYear] = useState(false);
      const [SelectPeriodeYear1, SetSelectPeriodeYear1] = useState(YearNow);
      const [SelectWeekly, SetSelectWeekly] = useState("");
      const [SelectQuarterly, SetSelectQuarterly] = useState("");
      const [ SelectSemesterly ,SetSelectSemesterly] = useState("");
      const [SelectDaily ,SetSelectDaily] = useState(DateNow);
      const[showMenu, setShowMenu] = useState("menu");
      const [SelectPeriodeMonth1, SetSelectPeriodeMonth1] = useState(Month[MonthNow]);
      
      function SetValue(data){
        
       
        setLoading(true)
        axios.post(Api()+"/general/user/profile",{
          key:token,
          "moduleId": moduleSelected,
          "dateData": {
            "dateType": "I",
            "dateValue": "20210218"
          }
        }).then(res=> {
         setLoading(false)
          setValueDate(data)
          setState({
            ...state, periode1:data
          })
      
        })
        .catch(err=> {
          setLoading(false)
          setValueDate(data)
          setState({
            ...state, periode1:data
          })
        
         
        })
      }
  
    useEffect(()=>{
     
        let format=DateSelected?.dateValue?.split("");
        let tahunformat = "";
        let bulanformat = "";
        let tanggalformat = "";
        if(format){

          if(PeriodSelected?.periodName?.toLowerCase()=="intraday"){
            tahunformat = format[0]+format[1]+format[2]+format[3];
            bulanformat = format[4]+format[5];
            tanggalformat = format[6]+format[7];
            format = tanggalformat+"-"+(Month[parseInt(bulanformat)-1]).slice(0,3)+"-"+tahunformat
          }else if(PeriodSelected?.periodName?.toLowerCase()=="daily"){
            tahunformat = format[0]+format[1]+format[2]+format[3];
            bulanformat = format[4]+format[5];
            tanggalformat = format[6]+format[7];
            format = tanggalformat+"-"+(Month[parseInt(bulanformat)-1]).slice(0,3)+"-"+tahunformat
          }else if(PeriodSelected?.periodName?.toLowerCase()=="weekly"){
            tahunformat = format[0]+format[1]+format[2]+format[3];
            bulanformat = format[4]+format[5];
            tanggalformat = format[6]+format[7];
            format = tanggalformat+"-"+(Month[parseInt(bulanformat)-1]).slice(0,3)+"-"+tahunformat
          }else if(PeriodSelected?.periodName?.toLowerCase()=="monthly"){
            tahunformat = format[0]+format[1]+format[2]+format[3];
            bulanformat = format[4]+format[5];
            
            format = (Month[parseInt(bulanformat)-1]).slice(0,3)+"-"+tahunformat
          }else if(PeriodSelected?.periodName?.toLowerCase()=="quarterly"){
            tahunformat = format[0]+format[1]+format[2]+format[3];
            bulanformat = format[4]+format[5];
            
            format = bulanformat+"-"+tahunformat
          }else if(PeriodSelected?.periodName?.toLowerCase()=="haly-yearly"){
            tahunformat = format[0]+format[1]+format[2]+format[3];
            bulanformat = format[4]+format[5];
            
            format = bulanformat+"-"+tahunformat
          }else{
            tahunformat = format[0]+format[1]+format[2]+format[3];
            
            
            format = tahunformat
          }
          setValueDate(format)
      
          setState({
              ...state,
              periode:PeriodSelected.periodName,
              role:RoleSelected.roleName,
              branch:BranchSelected.branchId+" - "+BranchSelected.branchName,
              periode1:format
          })
        }
    },[PeriodSelected,RoleSelected,BranchSelected])
      const handleChange = (event) => {
        const name = event.target.name;
        // setState({
        //   ...state,
        //   [name]: event.target.value,
        // });
       
        if(name=="periode"){
         
          if(event.target.value=="Monthly"){
            setState({
              ...state,
              ['periode1']: SelectPeriodeMonth1+" "+SelectPeriodeYear1,
              [name]:event.target.value
            });
    
          }else if(event.target.value=="Yearly"){
            setState({
              ...state,
              ['periode1']: SelectPeriodeYear1,
              [name]:event.target.value
            });
    
          }
          else{
            setState({
              ...state,
              ['periode1']: "",
              [name]:event.target.value
            });
          }
          SetSelectPeriode(false)
          
          SetSelectWeekly('')
          SetSelectQuarterly('')
          SetSelectSemesterly('')
        }
        // if(name=="role"){
        //   dispatch(ChangeHRole(event.target.value))
        // }
      };
      
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null)
        }
        const id = open ? 'simple-popover' : undefined;

        function PindahHome(){
          router.replace('/dashboard')
        }
        function handleCheck(e){
          setLoading(true)
          axios.post(Api()+"/general/user/profile",{
            key:token,
            "moduleId": moduleSelected,
            "branchData": {
              "bankwide": "no"
            }
          }).then(res=> {
            setLoading(false)
          setSelectDisable(!e.target.checked)
           
        
          })
          .catch(err=> {
           setLoading(false)
           setSelectDisable(!e.target.checked)


            })

        }
        function handleClickPeriode1(e){
          if(state.periode == "Daily" || state.periode == "Intraday"){
            if(SelectPeriodeMonth==true || SelectPeriodeYear==true){
        
            }
            else{
              SetSelectPeriodeDaily(!SelectPeriodeDaily)
        
            }
            SetSelectPeriodeMonth(false)
            SetSelectPeriodeYear(false)
            
          }
          SetSelectPeriode(!SelectPeriode)
        }
        function click(e){
            
            if(e.target.closest('#menu')||e.target.id=="menu"){
                if(showMenu=='menu'){
                  setShowMenu('')
                }else{
                  setShowMenu('menu')
                }
                props.onClick(e,"menuHideShow") 
        
            }else if( e.target.closest('#module') || e.target.id=="module"){
                if(showMenu=='module'){
                  setShowMenu('')
                }else{
                  setShowMenu('module')
                }
                props.onClick(e,"moduleHideShow") 
        
            }
            else if( e.target.closest('#notif') || e.target.id=="notif"){
                props.onClick(e,"notifHideShow") 
        
            }
            else if(e.target.closest('#logout') || e.target.id=="logout"){
              props.onClick(e,"logout") 
             
        
            }
        }
        const roleOnclick = ()=>{
          setRoleClick(!roleClick)
        }
        const handleClickAwayRole =()=>{
          setRoleClick(false)
        }
        const roleOnclickSelected=(e)=>{
          setLoading(true)
          setState({
            ...state,
            role:e.target.innerHTML.toString()
          })
          axios.post(Api()+"/general/user/profile",{
            key:token,
            "moduleId": moduleSelected,
            "roleData": {
                "roleId": "MKR01"
            }
          }).then(res=> {
            setLoading(false)
            dispatch(ChangeRoleSelected({roleId:e.target.id,roleName:e.target.innerHTML.toString()}))
            setRoleClick(false)
          })
          .catch(err=> {
            setLoading(false)
            dispatch(ChangeRoleSelected({roleId:e.target.id,roleName:e.target.innerHTML.toString()}))
            setRoleClick(false)
          })
         
        }
      
        const periodeOnclick = ()=>{
          setPeriodeClick(!periodeClick)
        }
        const handleClickAwayPeriode =()=>{
          setPeriodeClick(false)
        }
        const periodeOnclickSelected=(e,name, iddd)=>{
          let id='';
          // setLoading(true)
        //  let hmm = PilihanPeriodRedux
        //   for(const lala of hmm){
        //     lala.selected = "no"
            
        //     if(lala.periodName==name){
        //       lala.selected = "yes";
             
        //       dispatch(ChangePeriodSelected({periodeId:lala.periodId, periodeName:lala.periodName}))
        //     }
        //   }
        //   dispatch(PeriodData(hmm))
         
          if(!(e.target.id)){
            id = e.target.closest("#pilihPeriode").children[0].innerHTML;
          }else{
            id = e.target.children[0].innerHTML;
          }
        let hasilFormat = ''
         for(const lala of PilihandateRedux){
           let format=lala.dateValue;
             if(iddd==lala.dateType){
              let tahunformat = "";
              let bulanformat = "";
              let tanggalformat = "";
              if(id.toLowerCase()=="intraday"){
                tahunformat = format[0]+format[1]+format[2]+format[3];
                bulanformat = format[4]+format[5];
                tanggalformat = format[6]+format[7];
                hasilFormat = tanggalformat+"-"+(Month[parseInt(bulanformat)-1]).slice(0,3)+"-"+tahunformat
              }else if(id.toLowerCase()=="daily"){
                tahunformat = format[0]+format[1]+format[2]+format[3];
                bulanformat = format[4]+format[5];
                tanggalformat = format[6]+format[7];
                hasilFormat = tanggalformat+"-"+(Month[parseInt(bulanformat)-1]).slice(0,3)+"-"+tahunformat
              }else if(id.toLowerCase()=="weekly"){
                tahunformat = format[0]+format[1]+format[2]+format[3];
                bulanformat = format[4]+format[5];
                tanggalformat = format[6]+format[7];
                hasilFormat = tanggalformat+"-"+(Month[parseInt(bulanformat)-1]).slice(0,3)+"-"+tahunformat
              }else if(id.toLowerCase()=="monthly"){
                tahunformat = format[0]+format[1]+format[2]+format[3];
                bulanformat = format[4]+format[5];
                
                hasilFormat = (Month[parseInt(bulanformat)-1]).slice(0,3)+"-"+tahunformat
              }else if(id.toLowerCase()=="quarterly"){
                tahunformat = format[0]+format[1]+format[2]+format[3];
                bulanformat = format[4]+format[5];
                
                hasilFormat = bulanformat+"-"+tahunformat
              }else if(id.toLowerCase()=="haly-yearly"){
                tahunformat = format[0]+format[1]+format[2]+format[3];
                bulanformat = format[4]+format[5];
                
                hasilFormat = bulanformat+"-"+tahunformat
              }else{
                tahunformat = format[0]+format[1]+format[2]+format[3];
                
                
                hasilFormat = tahunformat
              }
               
              
            }
            
           
         }
         setLoading(true)
         axios.post(Api()+"/general/user/profile",{
          key:token,
         "moduleId": moduleSelected,
          "periodData": {
           "periodId": id.toString()
         }
         
        }).then(res=> {
          setLoading(false)
         
          // SetValue(hasilFormat)
          // dispatch(ChangePeriodSelected({periodId:iddd, periodName:name}))
          setValueDate(hasilFormat)
          setState({
           ...state,
           periode1:hasilFormat,
           periode:id.toString(),
           
          })
     
        
        })
      .catch(err=> {
         setLoading(false)
         SetValue(hasilFormat)
         setState({
           ...state,periode1:hasilFormat,
           periode:id.toString(),
           
       })
       
      })
      setPeriodeClick(false)
        
        }
        
        const branchOnclick = (e)=>{
          setBranchClick(!branchClick)
          window.setTimeout(()=>{
            e.target.closest("#branchClick").nextSibling.children[0].children[0].focus()
          },0)
        }
        const handleClickAwayBranch =()=>{
          setBranchClick(false)
        }
        const handleClickAwayPeriode1 =()=>{
          
          SetSelectPeriode(false)
        }
        const changeSearchBranch= (e)=>{
          
          Setstatesearchbranch(e.target.value)
          if(e.target.value!=""){
            let items = PilihanbranchRedux.branch?.filter(item => (item.branchId+" - "+item.branchName).toLowerCase().includes(e.target.value.toLowerCase()));
            SetPilihanBranchSearch(items)
        
          }else{
            SetPilihanBranchSearch(PilihanbranchRedux.branch)
          }
          
        }
        const branchOnclickSelected=(e)=>{
          setLoading(true)

          axios.post(Api()+"/general/user/profile",{
            key:token,
            "moduleId": moduleSelected,
            "branchData": {
              "branchId":"002"
            }
            
          }).then(res=> {
            setLoading(false)
            setState({
              ...state,
              branch:e.target.innerHTML.toString()
            })
            setBranchClick(false)
            SetPilihanBranchSearch(PilihanbranchRedux.branch)
            Setstatesearchbranch('')
           
          })
          .catch(err=> {
            setLoading(false)
            setState({
              ...state,
              branch:e.target.innerHTML.toString()
            })
            setBranchClick(false)
            SetPilihanBranchSearch(PilihanbranchRedux.branch)
            Setstatesearchbranch('')
            
          })


        }
        const cuyHandle = (e)=>{
          if(pilihanBranchSearch.length>0){
              if (e.keyCode == 40) {
                let i = 0;
                for(let cuy of e.target.parentNode.nextElementSibling.children){
                  if(cuy.classList.contains('DropdownBranchHeaderLight')){
                    if(i==e.target.parentNode.nextElementSibling.children.length-1){
                      cuy.classList.toggle('DropdownBranchHeaderLight');
                      e.target.parentNode.nextElementSibling.children[0].classList.add('DropdownBranchHeaderLight')
                      break
            
                    }else{
                      cuy.classList.toggle('DropdownBranchHeaderLight');
                      e.target.parentNode.nextElementSibling.children[i+1].classList.add('DropdownBranchHeaderLight')
                      break
                    }
                    
                  }else if(!cuy.classList.contains('DropdownBranchHeaderLight') && i+1==e.target.parentNode.nextElementSibling.children.length){
                    e.target.parentNode.nextElementSibling.children[0].classList.add('DropdownBranchHeaderLight')
                    break
                  }
                  i++;
                }
              } else if (e.keyCode === 38) {
                let i = 0;
                for(let cuy of e.target.parentNode.nextElementSibling.children){
                  if(cuy.classList.contains('DropdownBranchHeaderLight')){
                    if(i==0){
                      cuy.classList.toggle('DropdownBranchHeaderLight');
                      e.target.parentNode.nextElementSibling.children[e.target.parentNode.nextElementSibling.children.length-1].classList.add('DropdownBranchHeaderLight')
                      break
            
                    }else{
                      cuy.classList.toggle('DropdownBranchHeaderLight');
                      e.target.parentNode.nextElementSibling.children[i-1].classList.add('DropdownBranchHeaderLight')
                      break
                    }
                    
                  }else if(!cuy.classList.contains('DropdownBranchHeaderLight') && i-1==e.target.parentNode.nextElementSibling.children.length){
                    e.target.parentNode.nextElementSibling.children[0].classList.add('DropdownBranchHeaderLight')
                    break
                  }
                  i++;
                } 
              }else if(e.keyCode==13){
                for(let cuy of e.target.parentNode.nextElementSibling.children){
                  if(cuy.classList.contains('DropdownBranchHeaderLight')){
                    setState({
                      ...state,
                      branch:cuy.innerHTML.toString()
                    })
                    cuy.classList.toggle('DropdownBranchHeaderLight');
                    setBranchClick(false)
                    SetPilihanBranchSearch(PilihanbranchRedux.branch)
                    Setstatesearchbranch('')
                    break
                  }
                }
              }else{
                e.target.parentNode.nextElementSibling.children[0].classList.add('DropdownBranchHeaderLight')
              }
        
          }
          
        }
        console.log(state.periode)
    return (
        <div style={{marginBottom:'2px',boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}} className="flex justify-between bg-white  rounded-t-xl py-3 px-2 items-center  ">
   {loading?<Loading color={theme?Color[theme][4]:''}></Loading>:null}
    <div  className="flex items-center">
    <div  id="module"  onClick={click}  style={{'--color': theme?Color[theme][0]:''}} className="headerModuleMenu">
      <img src={showMenu=='module'?'/menu-selected.png':"/menu.png"} width="20"></img>
    </div>
  
    <div  id="menu" onClick={click} style={{cursor:'pointer', marginLeft:'10px'}} >
      <img src={showMenu=='menu'?"/list-selected.png":"/list.png"} width="20"></img>
    </div>
        <div  style={{'--color': theme?Color[theme][0]:'',marginLeft:'60px'}} className="headerApel">Apel</div>
        <div onClick={PindahHome} style={{'--color': theme?Color[theme][0]:'', marginLeft:'50px'}} className="headerModule" >{moduleSelected.moduleName}</div>
    </div>
    <div className="flex  items-center  ">
        
        <div className="block mr-4 ">
            <div style={{position:'relative',marginLeft:widthW>1152?'400px':widthW>400?'-200px':widthW>200?'0px':'0px',marginBottom:'-32px' ,fontFamily:'Poppinsbold', marginTop:'-15px',width:'200px', fontSize:'10px'}}>
            
           
            <span style={{ position:'absolute',fontFamily:'Poppinsbold',top:widthW<1152?'-8px':'-38px',right:widthW<1152?'-253px':'-123px' ,marginTop:'20px',fontSize:'13px',width:'200px' ,fontWeight:600}}>{systemApp}</span>

            </div>
            <br></br>
            <br></br>
            <div style={{marginRight:'200px'}} className="flex justify-center">
            {/* <FormControl className="pr-4">
<label htmlFor="role" style={{fontSize:'10px',height:'10px',marginBottom:'-10px', color:'gray', fontWeight:'bold'}}>Role</label>
<Select
style={{height:'15px'}}
margin="dense"
  native
  value={state.role}
  onChange={handleChange}
  inputProps={{
    name: 'role',
    id: 'role',
  }}
>
 
  <option style={{background:'white',fontFamily: 'Poppins',fontStyle:'normal',
fontWeight: '600',fontSize: '20px',textAlign: 'center', margin:'auto', padding:'10px'}} value={'admin'}>Admin</option>
  <option value={'checker'}>Checker</option>
 
</Select>
</FormControl> */}
{widthW>1152?
<>
<ClickAwayListener
      
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAwayRole}
    >
      
<div style={{position:'absolute',top:'25px',width:'100px',right:"580px"}}>
  <div onClick={roleOnclick}  style={{'--color': theme?Color[theme][0]:''}} className="RoleHeader"> 
      <span className="judulRole" style={{fontWeight: 'bold'}}>{t("A003G.LA01")}</span>
      <div className="valueRole">
          <span className="valueRoleSelected">{state.role} </span> 
          <div className="iconvalueselected">
                <ArrowDropDownIcon></ArrowDropDownIcon>
          </div> 
      </div>
  </div>

 
      <div style={{display:roleClick?'block':'none'}} className="pilihanRoleHeader">
          {PilihanRoleRedux?PilihanRoleRedux.map((cuy,index)=>(
            <div onClick={roleOnclickSelected} key={index} id={cuy.roleId} style={{'--color': theme?Color[theme][0]:'','--colorBgHover': theme?Color[theme][3]:''}}  className={state.role==cuy.roleName?"DropdownRoleHeaderSelected":"DropdownRoleHeader"}>{cuy.roleName}</div>

          )):''}



      </div>
          
          {/* <div onClick={roleOnclickSelected} className={state.role=="Checker"?"DropdownRoleHeaderSelected":"DropdownRoleHeader"}>Checker</div> */}
    



</div>
</ClickAwayListener>




<div style={{position:'absolute',top:'25px',width:'90px',right:"430px"}} >
  <div onClick={periodeOnclick} style={{'--color': theme?Color[theme][0]:''}} className="RoleHeader"> 
      <span className="judulRole" style={{fontWeight: 'bold'}}>{t("A003G.LA02")}</span>
      <div className="valueRole">
          <span className="valueRoleSelected">{state.periode}</span> 
          <div className="iconvalueselected">
                <ArrowDropDownIcon></ArrowDropDownIcon>
          </div> 
      </div>
  </div>
  <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAwayPeriode}
    >
    <div style={{display:periodeClick?'block':'none'}} className="pilihanRoleHeader">
        {PilihanPeriodRedux?PilihanPeriodRedux.map((cuy,index)=>(
            <div key={index} id="pilihPeriode" onClick={e=>periodeOnclickSelected(e,cuy.periodName,cuy.periodId)} style={{'--color': theme?Color[theme][0]:'','--colorBgHover': theme?Color[theme][3]:''}} className={state.periode==cuy.periodName?"DropdownRoleHeaderSelected":"DropdownRoleHeader"}> <span>{cuy.periodName}</span></div>

        )):''}
        
    </div>

</ClickAwayListener>

</div>



<ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAwayBranch}
    >
<div style={{position:'absolute',top:'21px',right:"250px"}}>

  <CustomCheckbox checked={SelectDisable} themeColor={theme?Color[theme][0]:''} name="checkBranch" before={t("A003G.SW01.No")} after={t("A003G.SW01.Yes")} onClick={handleCheck}></CustomCheckbox>
  <div id="branchClick" onClick={SelectDisable?branchOnclick:null} style={{'--color': theme?Color[theme][0]:''}} className={SelectDisable?"RoleHeader":"RoleHeaderDisable"}> 
      <div className="valueRole">
          <span className="valueRoleSelected">{state.branch}</span> 
          <div className="iconvalueselected">
                <ArrowDropDownIcon></ArrowDropDownIcon>
          </div> 
      </div>
  </div>
 
    <div style={{display:branchClick?'block':'none'}} className="pilihanBranchHeader">
    <div className="pencarian">
      <input autoComplete="off" id="pencarianBranch" onKeyDown={cuyHandle}  type="search" placeholder="Search..." value={statesearchbranch} onChange={changeSearchBranch}></input>
    </div>
    <div>
        {pilihanBranchSearch?.map((cuy,index)=>(
          <div id="pilihanBranch" key={index}  onClick={branchOnclickSelected} style={{'--color': theme?Color[theme][0]:'','--colorBgHover': theme?Color[theme][3]:''}}  className={state.branch==""+cuy.branchId+" - "+cuy.branchName?"DropdownBranchHeaderSelected":"DropdownBranchHeader"}>{""+cuy.branchId+" - "+cuy.branchName}</div>

        ))}

    </div>
    </div>


</div>
  </ClickAwayListener>

{/* <FormControl className="pr-4">
<label htmlFor="periode" style={{fontSize:'10px',height:'10px',marginBottom:'-10px', color:'gray', fontWeight:'bold'}}>Periode</label>
<Select
style={{height:'15px'}}
margin="dense"
  native
  value={state.periode}
  onChange={handleChange}
  inputProps={{
    name: 'periode',
    id: 'periode',
  }}
>
 
  <option value={"Daily"}>Daily</option>
  <option value={"Weekly"}>Weekly</option>
  <option value={"Monthly"}>Monthly</option>
  <option value={"Quarterly"}>Quarterly</option>
  <option value={"Semesterly"}>Semesterly</option>
  <option value={"Yearly"}>Yearly</option>
</Select>
</FormControl > */}

{/* <FormControl className="pr-4">
<CustomCheckbox checked={SelectDisable} name="checkBranch" onClick={handleCheck}></CustomCheckbox>
<Select
disabled={!SelectDisable}
style={{height:'15px',width:'100px',marginTop:'6px'}}
margin="dense"
  native
  value={state.periode}
  onChange={handleChange}
  inputProps={{
    name: 'age',
    id: 'age-native-simple',
  }}
>
  
  <option  value={10}>Ten</option>
  <option value={20}>Twenty</option>
  <option value={30}>Thirty</option>
</Select>
</FormControl> */}

<FormControl  style={{position:'absolute',width:'100px',top:'25px',right:"100px"}}>
<span style={{fontSize:'10px',height:'10px',fontWeight: 'bold',marginBottom:'4px', color:'rgba(0,0,0,0.7)',marginTop:'-2px', fontFamily:'Poppinsbold'}}>{state.periode}</span>
{/* <Select
style={{height:'15px'}}
margin="dense"
  native
  value={state.periode1}
  onChange={handleChange}
  onClick={handlePeriode1}
  inputProps={{
    name: 'periode1',
    id: 'periode1',
  }}
>
  <option style={{display:"block"}} value={'1'}>Select {state.periode.toLowerCase()=="daily"?'Date':state.periode.split('ly')[0]}</option>
  
    
  </Select> */}
  <div   style={{position:'relative',zIndex:99,height:'15px',width:'100px', cursor:'pointer',fontFamily: 'Poppinsbold', marginRight:'-20px'}}> 

     <div   style={{position:'absolute',top:4,height:'100%',width:'100%',cursor:'pointer',appearance:'none',paddingRight:'5px',outline:'none',fontFamily: 'Poppinsbold','--color': theme?Color[theme][0]:'' }}  className="RoleHeader" name="periode1" onClick={handleClickPeriode1}  onChange={handleChange} ><span className="mt-10">{state.periode1}</span> </div>
     <div style={{marginTop:'1px'}} className="iconvalueselected">
                <ArrowDropDownIcon></ArrowDropDownIcon>
          </div> 
    {/*<div onClick={handleClickPeriode1} style={{position:'absolute', top:-6, right:'-7px', fontSize:'10px', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <ArrowDropDownIcon></ArrowDropDownIcon>
    </div>
   <div style={{width:'400px', left:-150, display:state.periode=="Weekly" && SelectPeriode==true?'block':'none'}} className="absolute top-10 bg-white rounded-xl shadow-md  ">
      <div id="weeklyParent" className="flex justify-center mt-2" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <ArrowLeftIcon onClick={WeeklyPrev}></ArrowLeftIcon>
        <span onClick={MonthWeekly} style={{fontFamily:'Verdana'}} className="font-bold">{SelectPeriodeMonth1+' '+SelectPeriodeYear1}</span>
        <ArrowRightIcon onClick={WeeklyNext}></ArrowRightIcon>
      </div>
     
      <div className=" m-3 p-2 flex justify-center" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <div onClick={handleClickSelectWeekly} style={{border:'2px solid #3bbad6', fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:SelectWeekly=="WEEK 1"?"#3bbad6":"#fff"}} className="mr-4 p-3 rounded-xl shadow-md">WEEK 1</div>
        <div onClick={handleClickSelectWeekly} style={{border:'2px solid #3bbad6', fontFamily:'Verdana', fontWeight:'700',color:'#575757',background:SelectWeekly=="WEEK 2"?"#3bbad6":"#fff"}} className="mr-4 p-3 rounded-xl shadow-md">WEEK 2</div>
      </div>
      <div className=" m-3 p-2 flex justify-center" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <div onClick={handleClickSelectWeekly} style={{border:'2px solid #3bbad6', fontFamily:'Verdana', fontWeight:'700',color:'#575757',background:SelectWeekly=="WEEK 3"?"#3bbad6":"#fff"}} className="mr-4 p-3 rounded-xl shadow-md">WEEK 3</div>
        <div onClick={handleClickSelectWeekly} style={{border:'2px solid #3bbad6', fontFamily:'Verdana', fontWeight:'700',color:'#575757',background:SelectWeekly=="WEEK 4"?"#3bbad6":"#fff"}} className="mr-4 p-3 rounded-xl shadow-md">WEEK 4</div>
      </div>
      <div id="YearMontWeekly" className="flex justify-center mt-2" style={{display:SelectPeriodeMonth?'flex':'None'}}>
        <ArrowLeftIcon onClick={YearPrev}></ArrowLeftIcon>
        <span   style={{fontFamily:'Verdana'}} className="font-bold">{SelectPeriodeYear1}</span>
        <ArrowRightIcon onClick={YearNext}></ArrowRightIcon>
      </div>
      <div className=" m-3 p-2 grid grid-cols-3 gap-2" style={{display:SelectPeriodeMonth?'grid':'none'}}>
        {Month.map(cuy=>(

        <div key={cuy} onClick={MonthWeeklySelect} style={{border:'2px solid #3bbad6', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:cuy==SelectPeriodeMonth1?'#3bbad6':'#fff'}} className="w-auto p-3 text-center rounded-xl shadow-md">{cuy}</div>
        ))}
        
      </div>
      
    </div>

    <div style={{width:'400px', left:-150, display:state.periode=="Monthly" && SelectPeriode==true?'block':'none'}} className="absolute top-10 bg-white rounded-xl shadow-md  ">
      <div id="YearMontWeekly" className="flex justify-center mt-2" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <ArrowLeftIcon onClick={YearPrev}></ArrowLeftIcon>
        <span  style={{fontFamily:'Verdana'}} className="font-bold">{SelectPeriodeYear1}</span>
        <ArrowRightIcon onClick={YearNext}></ArrowRightIcon>
      </div>
     
      
      <div className=" m-3 p-2 grid grid-cols-3 gap-2" style={{display:'grid'}}>
        {Month.map(cuy=>(

        <div key={cuy} onClick={MonthWeeklySelect} style={{border:'2px solid #3bbad6', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:cuy==SelectPeriodeMonth1?'#3bbad6':'#fff'}} className="w-auto p-3 text-center rounded-xl shadow-md">{cuy}</div>
        ))}
        
      </div>
      
    </div>
    
    <div style={{width:'400px', left:-150, display:state.periode=="Quarterly" && SelectPeriode==true?'block':'none'}} className="absolute top-10 bg-white rounded-xl shadow-md  ">
      <div id="YearMontWeekly" className="flex justify-center mt-2" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <ArrowLeftIcon onClick={YearPrev}></ArrowLeftIcon>
        <span   style={{fontFamily:'Verdana'}} className="font-bold">{SelectPeriodeYear1}</span>
        <ArrowRightIcon onClick={YearNext}></ArrowRightIcon>
      </div>
     
      
      <div className=" m-3 p-2 grid grid-cols-2 gap-2" style={{display:'grid'}}>
        {Quarter.map(cuy=>(

        <div key={cuy} onClick={QuarterlySelect} style={{border:'2px solid #3bbad6', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:cuy==SelectQuarterly?'#3bbad6':'#fff'}} className="w-auto p-3 text-center rounded-xl shadow-md">{cuy}</div>
        ))}
        
      </div>
      
    </div>          

    <div style={{width:'400px', left:-150, display:state.periode=="Semesterly" && SelectPeriode==true?'block':'none'}} className="absolute top-10 bg-white rounded-xl shadow-md  ">
      <div id="YearMontWeekly" className="flex justify-center mt-2" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <ArrowLeftIcon onClick={YearPrev}></ArrowLeftIcon>
        <span  style={{fontFamily:'Verdana'}} className="font-bold">{SelectPeriodeYear1}</span>
        <ArrowRightIcon onClick={YearNext}></ArrowRightIcon>
      </div>
     
      
      <div className=" m-3 p-2 grid grid-cols-2 gap-2" style={{display:'grid'}}>
        {Semester.map(cuy=>(

        <div key={cuy} onClick={SemesterlySelect} style={{border:'2px solid #3bbad6', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:cuy==SelectSemesterly?'#3bbad6':'#fff'}} className="w-auto p-3 text-center rounded-xl shadow-md">{cuy}</div>
        ))}
        
      </div>
      
      
    </div>  

    <div style={{width:'400px', left:-150, display:state.periode=="Yearly" && SelectPeriode==true?'block':'none'}} className="absolute top-10 bg-white rounded-xl shadow-md  ">
      <div id="YearMontWeekly" className="flex justify-center mt-2" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <ArrowLeftIcon onClick={YearLyPrev}></ArrowLeftIcon>
        <span  style={{fontFamily:'Verdana'}} className="font-bold">{Year[0]+"-"+Year[Year.length-1]}</span>
        <ArrowRightIcon onClick={YearLyNext}></ArrowRightIcon>
      </div>
     
      
      <div className=" m-3 p-2 grid grid-cols-3 gap-2" style={{display:'grid'}}>
      <div   style={{border:'2px solid #575757', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700', background:'#ccc', color:"#575757"}} className="w-auto p-3 text-center rounded-xl shadow-md">{Year[0]}</div>
        {Year.map(cuy=>(

        <div key={cuy} onClick={YearlySelect} style={{border:'2px solid #3bbad6', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:cuy==SelectPeriodeYear1?'#3bbad6':'#fff'}} className="w-auto p-3 text-center rounded-xl shadow-md">{cuy}</div>
        ))}
      <div   style={{border:'2px solid #575757', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:'#ccc', color:"#575757"}} className="w-auto p-3 text-center rounded-xl shadow-md">{Year[Year.length-1]}</div>
        
      </div>
      
      
    </div>    */}
    

<div className="relative mt-10"> 
<ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAwayPeriode1}
    >
      <div className="relatuve mt-10"> 

     <div style={{width:'500px',height:'300px', left:-340, display:SelectPeriode?'block':'none'}} className="absolute top-10 bg-white rounded-xl shadow-md  ">
     {valueDate?<CustomCalender open={SelectPeriode} themeColor={theme?Color[theme][0]:''} value={valueDate} type={state.periode?.toLowerCase()} onChange={SetValue}></CustomCalender>:null}

  
          </div> 
      </div>

</ClickAwayListener>

</div>

  </div>
</FormControl>
            </>
:null}
           
        </div>
        </div>
        <div onClick={click} id="notif" className="relative">

          {props.data==0?null:<div   className="headerIconNotif"  ><span style={{padding:'6px', fontSize:'8px'}} >{props.data}</span></div>}
          <NotificationsNoneIcon  fontSize="large"    style={{cursor:'pointer', marginLeft:'10px'}} className="mx-2">
          </NotificationsNoneIcon>
        </div>
        <Avatar style={{cursor:'pointer', width:'40px', height:'40px'}}  variant="circular" color="primary" onClick={handleClick} alt="Travis Howard" src="/fileName.png" />
        <Popover 
id={id}
open={open}
anchorEl={anchorEl}
onClose={handleClose}
anchorOrigin={{
  vertical: 'bottom',
  horizontal: 'center',
}}
transformOrigin={{
  vertical: 'top',
  horizontal: 'center',
}}
>
  <div className="p-4">
    <div className="flex items-center ">
        <Avatar style={{width: '90px',height: '90px', marginTop:'25px'}} src="/fileName.png" className="h-full"></Avatar>
        <div className="ml-4">
        <br></br>
            <span className="nameHeader" style={{fontWeight:'bold'}}>Selena Gomez</span>
            <br></br>
            <button onClick={handleOpenProfile}  style={{'--color': theme?Color[theme][0]:''}} className="settingHeader">Profile</button>
            <br></br>
            <button onClick={handleOpenChangePass} style={{'--color': theme?Color[theme][0]:''}} className="settingHeader">Change Passoword</button>
            <br></br>
            <button onClick={handleOpenAppSet} style={{'--color': theme?Color[theme][0]:''}} className="settingHeader">Application Setting</button>
            <br></br>
            <div   style={{'--color': theme?Color[theme][0]:''}} className="divLogout">
              <button style={{'--color': theme?Color[theme][0]:''}}  className="divLogout settingHeader" id="logout" onClick={async (e) => {
                  e.preventDefault();
                    localStorage.removeItem('token')
                 
                    dispatch(ChangeModuleSelected(''))
                  router.replace('/login')}}
                  >Logout</button>

            </div>
        </div>
    </div>
    {widthW<1152?
<>
  <ClickAwayListener
      
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAwayRole}
    >
<div style={{marginRight:'50px'}} className="relative">
  <div onClick={roleOnclick}  style={{'--color': theme?Color[theme][0]:''}} className="RoleHeader"> 
      <span className="judulRole" style={{fontWeight: 'bold'}}>{t("A003G.LA01")}</span>
      <div className="valueRole">
          <span className="valueRoleSelected">{state.role}</span> 
          <div className="iconvalueselected">
                <ArrowDropDownIcon></ArrowDropDownIcon>
          </div> 
      </div>
  </div>

 
      <div style={{display:roleClick?'block':'none',position:'fixed',zIndex:'300', top:'100px', right:'350px',left:'100px', bottom:'100px', overflow:'auto'}} >
          {PilihanRoleRedux?PilihanRoleRedux.map((cuy,index)=>(
            <div onClick={roleOnclickSelected} key={index} id={cuy.roleId} style={{'--color': theme?Color[theme][0]:'','--colorBgHover': theme?Color[theme][3]:''}}  className={state.role==cuy.roleName?"DropdownRoleHeaderSelected":"DropdownRoleHeader"}>{cuy.roleName}</div>

          )):''}




      </div>
          
          {/* <div onClick={roleOnclickSelected} className={state.role=="Checker"?"DropdownRoleHeaderSelected":"DropdownRoleHeader"}>Checker</div> */}
    



</div>
</ClickAwayListener>




<div style={{marginRight:'30px', marginTop:'10px'}} className="relative">
  <div onClick={periodeOnclick} style={{'--color': theme?Color[theme][0]:''}} className="RoleHeader"> 
      <span className="judulRole" style={{fontWeight: 'bold'}}>{t("A003G.LA02")}</span>
      <div className="valueRole">
          <span className="valueRoleSelected">{state.periode}</span> 
          <div className="iconvalueselected">
                <ArrowDropDownIcon></ArrowDropDownIcon>
          </div> 
      </div>
  </div>
  <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAwayPeriode}
    >
    <div style={{display:periodeClick?'block':'none', position:'fixed',zIndex:'300', top:'100px', right:'350px',left:'100px', bottom:'100px',overflow:'auto'}} >
        {PilihanPeriodRedux?PilihanPeriodRedux.map((cuy,index)=>(
            <div key={index} id="pilihPeriode" onClick={e=>periodeOnclickSelected(e,cuy.periodName,cuy.periodId)} style={{'--color': theme?Color[theme][0]:'','--colorBgHover': theme?Color[theme][3]:''}} className={state.periode==cuy.periodName?"DropdownRoleHeaderSelected":"DropdownRoleHeader"}> <span>{cuy.periodName}</span></div>

        )):''}
        
    </div>

</ClickAwayListener>

</div>



<ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAwayBranch}
    >
<div style={{marginTop:'10px', marginRight:'30px',}} className="relative">

  <CustomCheckbox checked={SelectDisable} themeColor={theme?Color[theme][0]:''} name="checkBranch" before={t("A003G.SW01.No")} after={t("A003G.SW01.Yes")} onClick={handleCheck}></CustomCheckbox>
  <div id="branchClick" onClick={SelectDisable?branchOnclick:null} style={{'--color': theme?Color[theme][0]:''}} className={SelectDisable?"RoleHeader":"RoleHeaderDisable"}> 
      <div className="valueRole">
          <span className="valueRoleSelected">{state.branch}</span> 
          <div className="iconvalueselected">
                <ArrowDropDownIcon></ArrowDropDownIcon>
          </div> 
      </div>
  </div>
 
    <div style={{display:branchClick?'block':'none', position:'fixed',zIndex:'300', top:'100px', right:'350px',left:'400px', bottom:'100px',overflow:'auto'}} className="pilihanBranchHeader">
    <div style={{position:'relative'}}>
      <div style={{width:'100%',width:'250px'}}>
        <input className="inputClass" autoComplete="off" id="pencarianBranch" onKeyDown={cuyHandle}  type="search" placeholder="Search..." value={statesearchbranch} onChange={changeSearchBranch}></input>
      </div>
      <div>
          {pilihanBranchSearch?.map((cuy,index)=>(
            <div id="pilihanBranch" key={index}  onClick={branchOnclickSelected} style={{'--color': theme?Color[theme][0]:'','--colorBgHover': theme?Color[theme][3]:''}}  className={state.branch==""+cuy.branchId+" - "+cuy.branchName?"DropdownBranchHeaderSelected":"DropdownBranchHeader"}>{""+cuy.branchId+" - "+cuy.branchName}</div>

          ))}

      </div>

    </div>
    </div>


</div>
  </ClickAwayListener>



  <FormControl  style={{marginRight:'30px', marginTop:'10px'}}  className={'relative'}>
<span style={{fontSize:'10px',height:'10px',fontWeight: 'bold',marginBottom:'4px', color:'rgba(0,0,0,0.7)',marginTop:'-2px', fontFamily:'Poppinsbold'}}>{state.periode}</span>
{/* <Select
style={{height:'15px'}}
margin="dense"
  native
  value={state.periode1}
  onChange={handleChange}
  onClick={handlePeriode1}
  inputProps={{
    name: 'periode1',
    id: 'periode1',
  }}
>
  <option style={{display:"block"}} value={'1'}>Select {state.periode.toLowerCase()=="daily"?'Date':state.periode.split('ly')[0]}</option>
  
    
  </Select> */}
  <div   style={{position:'relative',zIndex:99,height:'15px',width:'200px', cursor:'pointer',fontFamily: 'Poppinsbold', marginRight:'-20px'}}> 
    <div className="valueRole">
     <div    className="valueRoleSelected" name="periode1" onClick={handleClickPeriode1}  onChange={handleChange} ><span className="mt-10">{state.periode1}</span> </div>
     <div style={{marginTop:'1px'}} className="iconvalueselected">
                <ArrowDropDownIcon></ArrowDropDownIcon>
          </div> 

    </div>
    {/*<div onClick={handleClickPeriode1} style={{position:'absolute', top:-6, right:'-7px', fontSize:'10px', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <ArrowDropDownIcon></ArrowDropDownIcon>
    </div>
   <div style={{width:'400px', left:-150, display:state.periode=="Weekly" && SelectPeriode==true?'block':'none'}} className="absolute top-10 bg-white rounded-xl shadow-md  ">
      <div id="weeklyParent" className="flex justify-center mt-2" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <ArrowLeftIcon onClick={WeeklyPrev}></ArrowLeftIcon>
        <span onClick={MonthWeekly} style={{fontFamily:'Verdana'}} className="font-bold">{SelectPeriodeMonth1+' '+SelectPeriodeYear1}</span>
        <ArrowRightIcon onClick={WeeklyNext}></ArrowRightIcon>
      </div>
     
      <div className=" m-3 p-2 flex justify-center" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <div onClick={handleClickSelectWeekly} style={{border:'2px solid #3bbad6', fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:SelectWeekly=="WEEK 1"?"#3bbad6":"#fff"}} className="mr-4 p-3 rounded-xl shadow-md">WEEK 1</div>
        <div onClick={handleClickSelectWeekly} style={{border:'2px solid #3bbad6', fontFamily:'Verdana', fontWeight:'700',color:'#575757',background:SelectWeekly=="WEEK 2"?"#3bbad6":"#fff"}} className="mr-4 p-3 rounded-xl shadow-md">WEEK 2</div>
      </div>
      <div className=" m-3 p-2 flex justify-center" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <div onClick={handleClickSelectWeekly} style={{border:'2px solid #3bbad6', fontFamily:'Verdana', fontWeight:'700',color:'#575757',background:SelectWeekly=="WEEK 3"?"#3bbad6":"#fff"}} className="mr-4 p-3 rounded-xl shadow-md">WEEK 3</div>
        <div onClick={handleClickSelectWeekly} style={{border:'2px solid #3bbad6', fontFamily:'Verdana', fontWeight:'700',color:'#575757',background:SelectWeekly=="WEEK 4"?"#3bbad6":"#fff"}} className="mr-4 p-3 rounded-xl shadow-md">WEEK 4</div>
      </div>
      <div id="YearMontWeekly" className="flex justify-center mt-2" style={{display:SelectPeriodeMonth?'flex':'None'}}>
        <ArrowLeftIcon onClick={YearPrev}></ArrowLeftIcon>
        <span   style={{fontFamily:'Verdana'}} className="font-bold">{SelectPeriodeYear1}</span>
        <ArrowRightIcon onClick={YearNext}></ArrowRightIcon>
      </div>
      <div className=" m-3 p-2 grid grid-cols-3 gap-2" style={{display:SelectPeriodeMonth?'grid':'none'}}>
        {Month.map(cuy=>(

        <div key={cuy} onClick={MonthWeeklySelect} style={{border:'2px solid #3bbad6', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:cuy==SelectPeriodeMonth1?'#3bbad6':'#fff'}} className="w-auto p-3 text-center rounded-xl shadow-md">{cuy}</div>
        ))}
        
      </div>
      
    </div>

    <div style={{width:'400px', left:-150, display:state.periode=="Monthly" && SelectPeriode==true?'block':'none'}} className="absolute top-10 bg-white rounded-xl shadow-md  ">
      <div id="YearMontWeekly" className="flex justify-center mt-2" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <ArrowLeftIcon onClick={YearPrev}></ArrowLeftIcon>
        <span  style={{fontFamily:'Verdana'}} className="font-bold">{SelectPeriodeYear1}</span>
        <ArrowRightIcon onClick={YearNext}></ArrowRightIcon>
      </div>
     
      
      <div className=" m-3 p-2 grid grid-cols-3 gap-2" style={{display:'grid'}}>
        {Month.map(cuy=>(

        <div key={cuy} onClick={MonthWeeklySelect} style={{border:'2px solid #3bbad6', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:cuy==SelectPeriodeMonth1?'#3bbad6':'#fff'}} className="w-auto p-3 text-center rounded-xl shadow-md">{cuy}</div>
        ))}
        
      </div>
      
    </div>
    
    <div style={{width:'400px', left:-150, display:state.periode=="Quarterly" && SelectPeriode==true?'block':'none'}} className="absolute top-10 bg-white rounded-xl shadow-md  ">
      <div id="YearMontWeekly" className="flex justify-center mt-2" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <ArrowLeftIcon onClick={YearPrev}></ArrowLeftIcon>
        <span   style={{fontFamily:'Verdana'}} className="font-bold">{SelectPeriodeYear1}</span>
        <ArrowRightIcon onClick={YearNext}></ArrowRightIcon>
      </div>
     
      
      <div className=" m-3 p-2 grid grid-cols-2 gap-2" style={{display:'grid'}}>
        {Quarter.map(cuy=>(

        <div key={cuy} onClick={QuarterlySelect} style={{border:'2px solid #3bbad6', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:cuy==SelectQuarterly?'#3bbad6':'#fff'}} className="w-auto p-3 text-center rounded-xl shadow-md">{cuy}</div>
        ))}
        
      </div>
      
    </div>          

    <div style={{width:'400px', left:-150, display:state.periode=="Semesterly" && SelectPeriode==true?'block':'none'}} className="absolute top-10 bg-white rounded-xl shadow-md  ">
      <div id="YearMontWeekly" className="flex justify-center mt-2" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <ArrowLeftIcon onClick={YearPrev}></ArrowLeftIcon>
        <span  style={{fontFamily:'Verdana'}} className="font-bold">{SelectPeriodeYear1}</span>
        <ArrowRightIcon onClick={YearNext}></ArrowRightIcon>
      </div>
     
      
      <div className=" m-3 p-2 grid grid-cols-2 gap-2" style={{display:'grid'}}>
        {Semester.map(cuy=>(

        <div key={cuy} onClick={SemesterlySelect} style={{border:'2px solid #3bbad6', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:cuy==SelectSemesterly?'#3bbad6':'#fff'}} className="w-auto p-3 text-center rounded-xl shadow-md">{cuy}</div>
        ))}
        
      </div>
      
      
    </div>  

    <div style={{width:'400px', left:-150, display:state.periode=="Yearly" && SelectPeriode==true?'block':'none'}} className="absolute top-10 bg-white rounded-xl shadow-md  ">
      <div id="YearMontWeekly" className="flex justify-center mt-2" style={{display:SelectPeriodeMonth?'none':'flex'}}>
        <ArrowLeftIcon onClick={YearLyPrev}></ArrowLeftIcon>
        <span  style={{fontFamily:'Verdana'}} className="font-bold">{Year[0]+"-"+Year[Year.length-1]}</span>
        <ArrowRightIcon onClick={YearLyNext}></ArrowRightIcon>
      </div>
     
      
      <div className=" m-3 p-2 grid grid-cols-3 gap-2" style={{display:'grid'}}>
      <div   style={{border:'2px solid #575757', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700', background:'#ccc', color:"#575757"}} className="w-auto p-3 text-center rounded-xl shadow-md">{Year[0]}</div>
        {Year.map(cuy=>(

        <div key={cuy} onClick={YearlySelect} style={{border:'2px solid #3bbad6', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:cuy==SelectPeriodeYear1?'#3bbad6':'#fff'}} className="w-auto p-3 text-center rounded-xl shadow-md">{cuy}</div>
        ))}
      <div   style={{border:'2px solid #575757', fontSize:'12px',fontFamily:'Verdana', fontWeight:'700',color:'#575757', background:'#ccc', color:"#575757"}} className="w-auto p-3 text-center rounded-xl shadow-md">{Year[Year.length-1]}</div>
        
      </div>
      
      
    </div>    */}
    

<div className="relative mt-10"> 
<ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAwayPeriode1}
    >
      <div className="relative mt-10"> 

     <div style={{position:'fixed', top:'80px', left:"150px",width:'500px',height:'300px',  display:SelectPeriode?'block':'none'}} className=" bg-white rounded-xl shadow-md  ">
     {valueDate?<CustomCalender open={SelectPeriode} themeColor={theme?Color[theme][0]:''} value={valueDate} type={state.periode?.toLowerCase()} onChange={SetValue}></CustomCalender>:null}

  
          </div> 
      </div>

</ClickAwayListener>

</div>

  </div>
</FormControl>


            </>
:null}

    
      
  </div>
</Popover>
<PopUpProfile  open={PopUpProfiles} themeColor={theme?Color[theme][0]:''} themeColorBgHover={theme?Color[theme][3]:''} onClick={handleCloseProfile}></PopUpProfile>
<PopUpChangePassword  open={PopUpChangePass} themeColor={theme?Color[theme][0]:''} themeColorBgHover={theme?Color[theme][3]:''} onClick={handleCloseChangePass}></PopUpChangePassword>
<PopUpAppSetting open={PopUpAppSet} themeColor={theme?Color[theme][0]:''} themeColorBgHover={theme?Color[theme][3]:''} onClick={handleCloseAppSet}></PopUpAppSetting>
    </div>
</div>    
    )
}