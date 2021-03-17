import Table from './../../Components/Table/Table'
import useSWR from 'swr';
import axios from 'axios';
import Api from './../../ApiSetting'
import { useEffect, useState } from 'react';
export default function User(){
    const [data, setData] = useState();
    const [schema, setSchema] = useState();
    useEffect(()=>{
        axios.get(Api()+'/credential/user').then(res=>{
            setData(res.data.data)
            setSchema(Object.keys(res.data.data[0]))
            
        }).catch(err=>{
            
        })
    },[])


    return (
        <div>
            {data?.length>0 && schema?.length>0?<Table data={data} schema={schema}></Table>:null}
        </div>
    )
}