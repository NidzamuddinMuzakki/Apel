import { useEffect, useState } from 'react'
import Api from '../../ApiSetting';
import Page1 from './../../Components/Page/Page1'
import axios from 'axios'
export default function UserRole(props){
    const [data, setData] = useState();
    const [info, setInfo] = useState();
    const [filter, setFilter] = useState();
    const [cuyu, setCuyu] = useState(0)
    const handleCuy =(handle, name)=>{
        if(name=='filter'){
            handleCuyu()
            
        }else if(handle=="order"){
            handleCuyu()
            var config = {
                method: 'get',
                url: Api()+'/credential/role?moduleId=ANT&ordertype=asc&orderby=roleName&perpage=10&page=1&filter=roleName like \'%01\'',
                headers: { 
                  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg'
                }
              };
              
              axios(config)
              .then(function (response) {
                
                setData(response.data.data)
                setInfo(response.data.info)
                setFilter(response.data.filter)
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        else{

            props.onClick(handle)
        }
    }
    const handleCuyu = ()=>{
        setCuyu(cuyu=>cuyu+1)
        setData([])
    }
    useEffect(()=>{
        var config = {
            method: 'get',
            url: Api()+'/credential/role?moduleId=ANT&ordertype=asc&orderby=roleName&perpage=10&page=1&filter=roleName like \'%01\'',
            headers: { 
              'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg'
            }
          };
          
          axios(config)
          .then(function (response) {
            
            setData(response.data.data)
            setInfo(response.data.info)
            setFilter(response.data.filter)
          })
          .catch(function (error) {
            console.log(error);
          });
    },[])
    return (
        <div>
            <Page1 data={data} judul={'MasterRole'} onClick={handleCuy} filter={filter} info={info}></Page1>
            <span style={{display:'none'}}>{cuyu}</span>
        </div>
    )
}