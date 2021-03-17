import Dialog from '@material-ui/core/Dialog'

import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Icon} from 'rsuite'
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import AlertSave from './../Alert/AlertSave'
import AlertSuccess from './../Alert/AlertSucces'
import PickColor from './../PickerColor/PickerColor'
import {UserSetting, ChangeColorTheme} from './../../Redux/Profile/Action'
import {ChangeRowPageTable} from './../../Redux/Table/Action'
import Loading from './../Loading'
import Radio from '@material-ui/core/Radio';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
// const {t} = useTranslation();
import Api from './../../ApiSetting'
import axios from 'axios'
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
  
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 15,
    height:'20px',
    padding:'10px',
    background:'black',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Poppinsbold'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      
     
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function PopUpClearNotif(props){
    const classes = useStyles();
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    const UserSetting11 = useSelector(state=>state.UserSetting);
    const [alertSave, setAlertSave] = useState(false);
    const moduleId = useSelector(state=>state.ModuleSelected)
    const [alertSuccess, setAlertSucces] = useState(false);
    const [Themapallte, setThemaPallate] = useState(false);
    const [loading, setLoading] = useState(false)
    const [stateRadio, setstateRadio] = useState({
      state1:false,state2:false, state3:false
    })
    const [state, setState] = useState({
      language:'',
      theme:'',
      color:'',
      pilihanLanguage:[],
      pilihanTheme:[],
      rowOfPage:[]

    })
    const onMouseOver=(e)=>{
        let id= ""
        if(e.target.id=='parentRowOfPage'){
          id = e.target.id
          console.log(id)
        }else{
          
          id = e.target.closest("#parentRowOfPage")
          e.target.closest("#parentRowOfPage").children[0].children[2].children[0].style.display="block"
          e.target.closest("#parentRowOfPage").children[1].children[2].children[0].style.display="block"
          e.target.closest("#parentRowOfPage").children[2].children[2].children[0].style.display="block"
         
        
        }
    }
    const onMouseOut=(e)=>{
      let id= ""
        if(e.target.id=='parentRowOfPage'){
          id = e.target.id
          console.log(id)
        }else{
          
          id = e.target.closest("#parentRowOfPage")
          if(stateRadio.state1==true){
            e.target.closest("#parentRowOfPage").children[0].children[2].children[0].style.display="block"
            e.target.closest("#parentRowOfPage").children[1].children[2].children[0].style.display="none"
            e.target.closest("#parentRowOfPage").children[2].children[2].children[0].style.display="none"

          }else if(stateRadio.state2==true){
            e.target.closest("#parentRowOfPage").children[0].children[2].children[0].style.display="none"
            e.target.closest("#parentRowOfPage").children[1].children[2].children[0].style.display="block"
            e.target.closest("#parentRowOfPage").children[2].children[2].children[0].style.display="none"
          }else{
            e.target.closest("#parentRowOfPage").children[0].children[2].children[0].style.display="none"
            e.target.closest("#parentRowOfPage").children[1].children[2].children[0].style.display="none"
            e.target.closest("#parentRowOfPage").children[2].children[2].children[0].style.display="block"
          }
         
          
        }
    }
    const onChangeRadio=(e, data)=>{
      if(data==0){
        setstateRadio({
          state1:true,
          state2:false,
          state3:false
        })
      }else if(data==1){
        setstateRadio({
          state1:false,
          state2:true,
          state3:false
        })
      }else if(data==2){
        setstateRadio({
          state1:false,
          state2:false,
          state3:true
        })
      }
      
    }
    const themaOnClick=()=>{
      setThemaPallate(!Themapallte)
    }
    const handleSaveSetting= (data)=>{
        if(data=="no"){
          setAlertSave(false)
        }else{
          setAlertSave(false)
          setLoading(true)
          for(const lang of UserSetting11.language){
            lang.selected="no";
            if(lang.id==state.language){
              lang.selected="yes"
              i18n.changeLanguage(lang.id.toLowerCase());
            }
          }
          for(const theme of UserSetting11.theme){
            theme.selected="no";
            if(theme.colorId==state.theme){
              theme.selected="yes"
              
            }
          }
          let sasa = 1;
          for(const rowppage of state.rowOfPage){
            rowppage.selected = "no"
            if(stateRadio['state'+sasa] == true){
              rowppage.selected = "yes"
              dispatch(ChangeRowPageTable(parseInt(rowppage.value)))
            }
            sasa++;
          }
         
          UserSetting11.rowOfPage = state.rowOfPage
 
         
          axios.post(Api()+'/general/user/profile',{
            "moduleId": "ANT",
            "userSetting": {
                "rowOfPage": [
                    {
                        "order": "1",
                        "value": "20",
                        "selected": "yes"
                    },
                    {
                        "order": "2",
                        "value": "50",
                        "selected": "no"				
                    },
                    {
                        "order": "3",
                        "value": "100",
                        "selected": "no"				
                    }
                ],
                "language": {
                    "id": "ID"
                },
                "theme": {
                    "colorId": "02"
                }
              }
          
          },{
            headers: {
                'Content-Type': 'application/json',
                "x-mock-match-request-body":'true'
            }
          }).then((res)=>{
            setLoading(false)
            setAlertSucces(true);
            setAlertSucces(false);
          
            setThemaPallate(false)
            dispatch(ChangeColorTheme(state.theme))
            dispatch(UserSetting(UserSetting11))
            props.onClick(res.data);
          }).catch(err=>{
            setLoading(false)
            setAlertSucces(true);
            setAlertSucces(false);
            dispatch(ChangeColorTheme(state.theme))
            dispatch(UserSetting(UserSetting11))
            setThemaPallate(false)
            props.onClick(err.response.data);
          })
         
        }
    }
    const handlepilih = (id, nama)=>{
      setState({
        ...state,
        color:nama,
        theme:id
      })
    }
    const handleSuccesOke = ()=>{
      setAlertSucces(false);
      setAlertSave(false)
      props.onClick();
    }
    useEffect(()=>{
        if(UserSetting11!=""){
            let themeBaru =""
            let langBaru = ""
            let colorBaru = ''
            let selectedRow = [];
            
            for(const lang of UserSetting11.language){
              if(lang.selected=="yes"){
                langBaru=lang.id;
              }
            }
            for(const them of UserSetting11.theme){
              if(them.selected=="yes"){
                themeBaru=them.colorId;
                colorBaru=them.colorName
              }
            }
            for(const row of UserSetting11.rowOfPage){
              if(row.selected=="yes"){
                  selectedRow.push(true)
              }else{
                selectedRow.push(false)
              } 
            }
            setstateRadio({
              state1:selectedRow[0],
              state2:selectedRow[1],
              state3:selectedRow[2]
            })
            setState({
              ...state,
              pilihanLanguage:UserSetting11.language,
              pilihanTheme:UserSetting11.theme,
              language:langBaru,
              theme:themeBaru,
              color:colorBaru,
              rowOfPage:UserSetting11.rowOfPage
            })
        }
    }, [UserSetting11])
    const handleChange = (e) => {
      if(e.target.name==0){
        
        let cuy = JSON.parse(JSON.stringify(state.rowOfPage))
        cuy[0].value = e.target.value
        setState({
          ...state,
          rowOfPage:cuy
        })
      }else if(e.target.name==1){
        let cuy = JSON.parse(JSON.stringify(state.rowOfPage))
        cuy[1].value = e.target.value
        setState({
          ...state,
          rowOfPage:cuy
        })
      }else if(e.target.name==2){
        let cuy = JSON.parse(JSON.stringify(state.rowOfPage))
        cuy[2].value = e.target.value
        setState({
          ...state,
          rowOfPage:cuy
        })
      }else{
        setState({
          ...state,
          [e.target.name]:e.target.value
        })

      }
    };
    const handleClick=()=>{
      setAlertSave(true)
    }
    const handleClose = ()=>{
      let themeBaru =""
      let langBaru = ""
      let colorBaru = ''
      for(const lang of UserSetting11.language){
        if(lang.selected=="yes"){
          langBaru=lang.id;
        }
      }
      for(const them of UserSetting11.theme){
        if(them.selected=="yes"){
          themeBaru=them.colorId;
          colorBaru=them.colorName
        }
      }
      
      setState({
        ...state,
        pilihanLanguage:UserSetting11.language,
        pilihanTheme:UserSetting11.theme,
        language:langBaru,
        theme:themeBaru,
        color:colorBaru
      })
        props.onClick();
    }
    return (
        <Dialog style={{}} onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
           {loading?<Loading color={props.themeColorBgHover}></Loading>:null}
          <AlertSave themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover}  open={alertSave} onClick={handleSaveSetting}></AlertSave>
          {/* <AlertSuccess open={alertSuccess} onClick={handleSuccesOke}></AlertSuccess> */}
            <div style={{width:'600px',height:'430px' ,padding:'20px',background:'#E5F4F8', position:'relative'}}>
            <div className="XClose" style={{'--colorBgHover':props.themeColorBgHover}} onClick={handleClose}>X</div>
            <style jsx>{`
                input[type='number'] {
                    -moz-appearance:textfield;
                }
                
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
            `}
            </style>
                <div style={{textAlign:'left', marginLeft:'80px',marginBottom:'30px' ,fontFamily:'Poppinsbold', fontWeight:'bold', fontSize:'25px'}}>
                    <span style={{textAlign:'left',color:'gray'}}>{t("A003M.LA01")}</span>
                </div>
                <div style={{display:'flex',justifyContent:'center', position:'relative'}}> 
                   
                </div>
               <div style={{marginLeft:'80px', fontFamily:'Poppinsbold', fontSize:'18px'}}>
                    <label htmlFor="oldpassword">{t("A003M.LA02")}</label>
               </div>
                <div id="parentRowOfPage" onMouseOver={onMouseOver} onMouseOut={onMouseOut} style={{display:'flex', position:'relative', justifyContent:'center',width:'400px',marginLeft:'-39px' }}>
                    {state.rowOfPage?state.rowOfPage.map((data, index)=>(
                      <div key={index} style={{display:'block'}}>
                        <input key={index} pattern="^-?[0-9]\d*\.?\d*$" required onChange={handleChange} style={{paddingLeft:"5px",borderRadius:'5px', border:'1px solid rgba(59, 186, 214, 0.5)',width:'50px',background:stateRadio["state"+(index+1)]==true?props.themeColor:"white", fontFamily:'Poppinsbold'}} type="number" name={index} value={data.value}></input>
                        <br></br>
                        <div style={{textAlign:'center', marginTop:'10px'}}>
                            <div name={"state"+(index+1)} onClick={e=>onChangeRadio(e,index)} style={{borderRadius:'50%', width:'10px', height:'10px',background:stateRadio["state"+(index+1)]==true?props.themeColor:"white" ,cursor:'pointer',border:"1px solid "+props.themeColor, margin:'auto', display:stateRadio["state"+(index+1)]==true?'block':'none'}}></div>
                        </div>
                      </div>
                    )):''}
                    
                    
                </div>
                <div style={{marginLeft:'80px',marginTop:'10px' ,fontFamily:'Poppinsbold', fontSize:'18px'}}>
                    <label htmlFor="oldpassword">{t("A003M.LA03")}</label>
               </div>
                <div style={{display:'flex', position:'relative', justifyContent:'center',width:'400px',margin:'auto' }}>
                
                   
                    <NativeSelect
                    style={{borderRadius:'5px',fontFamily:'Poppinsbold' ,width:'100%', }}
                    id="demo-customized-select-native"
                    name="language"
                    value={state.language}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    >
                    {state?.pilihanLanguage?state.pilihanLanguage.map((data, index)=>(
                      <option style={{fontFamily:'Poppinsbold'}} key={index} value={data.id}>{data.name}</option>

                    )):''}  
                    {/* <option value={"English"}>English</option> */}
                   
                    </NativeSelect>
                
                    {/* <input style={{paddingLeft:"5px",borderRadius:'5px', border:'1px solid rgba(59, 186, 214, 0.5)',width:'100%'}} type="password" name="oldpassword"></input>
                    <div></div> */}
                </div>
                <div style={{marginLeft:'80px',marginTop:'10px', fontFamily:'Poppinsbold', fontSize:'18px'}}>
                    <label htmlFor="oldpassword">{t("A003M.LA04")}</label>
               </div>
                <div onClick={themaOnClick} style={{position:'relative',cursor:'pointer' ,justifyContent:'center',width:'400px',margin:'auto' }}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'white',border:'1px solid rgba(0,0,0,0.3)', padding:'2px', borderRadius:'4px', height:'37px'}}>
                        <span style={{marginLeft:'5px',fontFamily:'Poppinsbold'}}>{state.color}</span>
                        <Icon icon="arrow-down" style={{color:'gray', fontSize:'10px', marginRight:'3px'}}></Icon>
                    </div>
                    {Themapallte && state.pilihanTheme?<PickColor open={Themapallte} onClick={handlepilih} lala={state.color} bg={props.themeColor} data={state.pilihanTheme}></PickColor>:''}
                {/* <NativeSelect
                    style={{borderRadius:'5px',fontFamily:'Poppins' ,width:'100%', }}
                    id="demo-customized-select-native"
                    value={state.theme}
                    name="theme"
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    >
                  {state.pilihanTheme?state.pilihanTheme.map((data, index)=>(
                    <option key={index} value={data.colorId}>{data.colorName}</option>

                  )):''} */}
                    {/* <option value={"English"}>English</option> */}
                   
                    {/* </NativeSelect> */}
                    
                    {/* <input style={{paddingLeft:"5px",borderRadius:'5px', border:'1px solid rgba(59, 186, 214, 0.5)',width:'100%'}} type="password" name="oldpassword"></input>
                    <div></div> */}
                </div>
                <div style={{marginTop:'30px'}}>
 
                    <button onClick={handleClick} className="editButtonSave" style={{'--colorBgHover':props.themeColorBgHover, '--color':props.themeColor,fontFamily:'Poppinsbold',color:'white',marginLeft:'410px',borderRadius:'10px' ,border: '1px solid '+props.themeColor, padding:'5px',width: '70px'}}>{t("Global.BT01")}</button>
                    
                </div>
            </div>
        </Dialog>
    )
}