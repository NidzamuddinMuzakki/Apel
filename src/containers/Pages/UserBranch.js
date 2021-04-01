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
               
                for(const aff of hmm.branches){
                   
                    if(coba==hmm.branches.length-1){
                      cuy= cuy+aff.branchId+"-"+aff.branchName

                    }else{
                        cuy= cuy+aff.branchId+"-"+aff.branchName+", "

                    }
                    coba++;
                }
                
                hmm.branches = cuy
                delete hmm.roles
            }
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
            <Page1 data={data} judul={'UserBranch'} onClick={handleCuy} filter={filter} info={info}></Page1>
            <span style={{display:'none'}}>{cuyu}</span>
        </div>
    )
}