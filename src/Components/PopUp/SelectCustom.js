import { useEffect, useState } from 'react'
import {RiArrowDownSFill} from 'react-icons/ri'
import styled from 'styled-components'
export default function SelectCustom(props){
    const [data, setData] = useState();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState()
    useEffect(()=>{
        if(props?.data){
            setData(props.data)
            setSelected(props.selected)
        }
    },[props])
    const handleClick = ()=>{
        setVisible(!visible)
    }
    const handleChange = (id)=>{
        props.onChange(id)
        setVisible(!visible)
        setSelected(id)
    }
    const Options = styled.div`
       
        &:hover{
            background:${props.themeColor};
            color:white;
        }

    `
    return(
        <div style={{position:"relative"}}>

        <div onClick={handleClick} style={{background:"white" ,borderRadius:'3px',width:"120px", display:'flex', alignItems:'center',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
            <div style={{width:"130px", cursor:'pointer'}}>

            <span readOnly type="text" style={{height:'30px',cursor:'pointer', fontFamily:'Poppinsbold',paddingLeft:"5px", color:props.themeColor}}>{data?.filter(cuy=>cuy.actionId==selected)[0].actionName}</span>
            </div>
            <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                <RiArrowDownSFill style={{margin:'auto', cursor:'pointer', color:props.themeColor}}></RiArrowDownSFill>

            </div>
            
        </div>
            <div style={{display:visible?"block":'none',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', cursor:'pointer', position:"absolute", top:24, width:'100%'}}>
                {data?data.map((row, index)=>(

                    <Options style={{background:row.actionId==selected?props.themeColor:"white",color:row.actionId==selected?"white":"#575757"}} onClick={e=>handleChange(row.actionId)} key={index}>
                        <span>{row.actionName}</span>
                    </Options>
                )):null}

            </div>
        </div>
    )
}