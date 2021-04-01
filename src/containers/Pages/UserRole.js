import { useEffect, useState } from 'react'
import Api from '../../ApiSetting';
import Page1 from './../../Components/Page/Page1'
import axios from 'axios'
export default function UserRole(props){
    const [data, setData] = useState();
    const [info, setInfo] = useState();
    const [filter, setFilter] = useState();
    const [cuyu, setCuyu] = useState(0)
    const handleCuy = (handle, name="")=>{
        if(name=='filter'){
            handleCuyu()
            
        }else{

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
            url: Api()+'/credential/user?moduleId=ANT&ordertype=asc&orderby=roleName&perpage=10&page=1&filter=username like \'%01\'',
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            
            for(const hmm of response.data.data){
                let cuy = "";
                let coba = 0;
               
                for(const aff of hmm.roles){
                   
                    if(coba==hmm.roles.length-1){
                      cuy= cuy+aff.roleName

                    }else{
                      cuy= cuy+aff.roleName+", "

                    }
                    coba++;
                }
                
                hmm.roles = cuy
                delete hmm.branches
            }
            setData(response.data.data)
            setInfo(response.data.info)
            setFilter(response.data.filter)
          })
          .catch(function (error) {
            console.log(error);
          });
    },[cuyu])
    return (
        <div>

            <Page1 data={data} judul={'UserRole'} filter={filter} info={info} onClick={handleCuy}></Page1>
            <span style={{display:'none'}}>{cuyu}</span>
        </div>
    )
}