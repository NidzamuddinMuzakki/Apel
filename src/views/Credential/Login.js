import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import Api from './../../ApiSetting'

import useSWR from 'swr'
import Alert from '../../Components/Login/Alert';
import FloatLoading from './../../Components/Login/FloatLoading'
import Input from './../../Components/Login/Input'
import Corousel from './../../Components/Login/CorouselLogin'
import Capthca from '../../Components/Login/Capthca'
import FooterLogin from './../../Components/Login/FooterLogin'
import {ChangeLoginAttempt} from './../../Redux/Login/Action'
import {Param} from './../../Redux/Profile/Action'

const Login1 = ()=>{
    const dispatch = useDispatch();
    const [RouterPage] = useState(localStorage.getItem('Route'));
    const [capcha, setCapcha] = useState(false);
    const [width, setWidht]  = useState(window.innerWidth);
    const [offline, setOffline] = useState(false);
    const {data:dataParam, error:dataParamError} = useSWR(Api()+'/general/system/param',url=>{
      axios.get(url, {
        timeout: 5000
      }).then(res=>{
       dispatch(Param(res.data.data[0]))
       setOffline(false)
      }).catch(error=>{
          setOffline(true)
      })
    },{revalidateOnFocus:false,refreshInterval:5000})

   
   console.log(dataParamError)
  
  
   useEffect(()=>{
     const updatewindow = ()=>{
       const newWidth = window.innerWidth;
       setWidht(newWidth)
       
     }
     window.addEventListener('resize', updatewindow)

     return () => window.removeEventListener('resize', updatewindow)
  },[])
    // const {data:dataParam , error:dataParamError} = useSWR(Api()+'/general/system/param', url=>axios.get(url),{revalidateOnFocus:false, loadingTimeout:3000});
    const LOGINWRONG = useSelector(state=>state.LoginAttempt);
    const [LoginWrong,setLoginWrong1] = useState(dataParam?.data.data[0].maxLoginAttempt);
   
    useEffect(()=>{
        setLoginWrong1(dataParam?.data.data[0].maxLoginAttempt)
    },[dataParam])
    useEffect(()=>{
        if(LOGINWRONG==LoginWrong){
          dispatch(ChangeLoginAttempt(0))
          setCapcha(true);
        }
        
        
      },[LOGINWRONG, capcha])
   
    const [token, setToken] = useState(localStorage.getItem('token'))
    const history = useHistory();
    
    useEffect(()=>{
        if(token!=null){
            history.replace(RouterPage?RouterPage.toString():'/module')
        }
    },[token])
    const [Loading, setLoading] = useState(false);
    const [state, setState] = useState({
        username:'',password:'', open:false, error:'', loading:false
    })
    function onHandleClose(data){
        setState({
          ...state,
          open:false
        })
      }
    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const handleClick = ()=>{
        setState({
           
            loading:true,
           
          })
        
        axios.post(Api()+'/master/auth/login',{username:state.username,password:state.password}).then((res)=>{
            setLoading(false)
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('refresh_token',res.data.refresh_token)
    
            history.replace(RouterPage?RouterPage.toString():'/module')
        }).catch(error=>{
            // console.log(error)
            if(error?.response?.data?.data){
              if(error?.response?.data?.responseCode==400){
                setState({
                    error:error.response.data.errorMessage,
                    loading:false,
                    open:true,
                  })
                dispatch(ChangeLoginAttempt(LOGINWRONG+1))

              }

            }else{
              setState({
                error:"Offline",
                loading:false,
                open:true,
              })
            }
            setLoading(false)
        })
    }
    console.log(width)
    const Handchange=(data)=>{
  
        if(data==true){
    
          dispatch(ChangeLoginAttempt(0))
        }
        
      }
   
    return (
    
     
     
        <div className="h-screen w-screen bg-gray-200 ">
     
            <Alert message={state.error} open={state.open} onClose={onHandleClose}></Alert>
     
     
       
      <div className=" flex relative items-center justify-center  h-screen w-3/4 m-auto">
          <div className="relative outline-none overflow-hidden p-10 w-full md:w-3/4 lg:w-1/2 pt-10   md:p-10 h-5/6  md:h-5/6 border-none bg-white shadow-md">
      {state.loading?
        
     
            <FloatLoading></FloatLoading>

   
      
      :''}
         
              <div >
                  <h1 style={{fontFamily:'Poppinsbold'}} className="text-gray text-4xl  font-bold text-gray-800">Login</h1>
                  <p style={{fontFamily:'Poppinsbold'}} className="pt-1  text-gray-500" >Sign In To Your Account</p>
              </div>
              <div className="w-full mt-16 md:mt-16 ">
                <div className="flex items-center h-12 w-full p-0 border-4 shadow-md rounded-lg focus:border">
                  <div className="w-1/6     h-full bg-gray-200">
                    
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-full  h-full p-2 m-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                        
      
                    
                    
                    
                  </div>
                
             
                  <Input style={{fontFamily:'Poppinsbold'}} name='username' onChange={handleChange} value={state.username || ''} type="text" placeholder="Username"></Input>
              
      
                </div>
              </div>
              <div className="w-full py-4">
                <div className="flex items-center h-12 w-full p-0 border-4 border-gray-390 shadow-md rounded-lg focus:border">
                  <div className="w-1/6 m-0  h-full bg-gray-200">
                    
                   
                        
      
                      <svg xmlns="http://www.w3.org/2000/svg"  className="w-full  h-full p-2 m-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      
                    
                    
                  </div>
             
                  <Input style={{fontFamily:'Poppinsbold'}} name="password" value={state.password || ''} onChange={handleChange} type="password" placeholder="Password"></Input>
               
    
                </div>
              </div>
              {capcha?   
        <Capthca onChange={Handchange}></Capthca>:''}
              <div className="w-full py-8 text-center">
            
              <button style={{fontFamily:'Poppinsbold'}} onClick={LOGINWRONG>2 ||state.loading?null:handleClick}  className="loginButton h-8 text-white shadow-xl font-bold py-0 px-4 rounded">
               Login
              </button>
              </div>
          </div>
          <div style={{backgroundColor:'#3BBAD6'}} className={width>1124?"block p-10 w-0 md:w-1/2 h-0 md:h-5/6  py-10  shadow-md":"hidden p-10 w-0 md:w-1/2 h-0 md:h-5/6  py-10  shadow-md"}>
            <div className="flex justify-center ">  
              <h1 style={{fontFamily:'Poppinsbold'}} className="text-4xl font-bold text-white  text-center">APEL</h1>
              {/* <span  className="ml-10 p-2 text-gray-400">LOGO</span> */}
            </div>
                <div className="flex justify-center">
                  <span style={{fontFamily:'Poppinsbold'}}  className="italic text-white text-center w-full">Complience and Regulatory, Simplified</span>
      
                </div>
                <div style={{marginTop:'30px'}} className="relative md-3 ">
          
        <Corousel  ></Corousel>
              
                   
  
                </div>
          </div>
         
        
         <FooterLogin style={{fontFamily:'Poppinsbold'}}></FooterLogin>
        {offline?<div style={{position:'absolute',width:'100vw',height:'40px',display:'flex',justifyContent:'center',alignItems:"center" ,textAlign:'center' ,bottom:0,background:"red",paddingLeft:'20px', paddingRight:'20px', paddingTop:'5px', fontWeight:'bold',paddingBottom:'5px',zIndex:100, borderRadius:'5px', color:'white', fontFamily:'Poppinsbold'}}>
                You Are Offline
        </div>:null}
       
      </div>
      </div>  
         
   

           
     
     
    )
}
export default Login1