import { useEffect } from "react";

export default function List(props){

    const handleSelected = (id)=>{
        props.onClick(id)
    }
    const handleDragTask = (ev)=>{
       
        if(ev.target.draggable==true){
            
            
            if(!ev.target.id){
            
                ev.dataTransfer.setData("srcId", ev.target.parentNode.id);
    
            }else{
               
                ev.dataTransfer.setData("srcId", ev.target.id);
            }
        }else{
    
           
        }
    }
    return(
        <div style={{width:'100%', fontSize:'12px'}} className={"dragboxList"} >
            <div>
                {props.data.map((row, index)=>{
                   
                    return(
                        <div onClick={e=>props?.selected?.findIndex(cuy=>cuy[props.schema[0]]==row[props.schema[0]])==-1?handleSelected(row[props.schema[0]]):null} onDragStart={handleDragTask} onDragEnd={props.onDragEnd} id={"list|"+row[props.schema[0]]} draggable={props?.selected?.findIndex(cuy=>cuy[props.schema[0]]==row[props.schema[0]])==-1?"true":"false"} key={index} style={{background:props?.selectedList?.findIndex(cuy=>cuy==row[props.schema[0]])!=-1?'black':props?.selected?.findIndex(cuy=>cuy[props.schema[0]]==row[props.schema[0]])==-1?'white':'#ebebeb',color:props?.selected?.findIndex(cuy=>cuy[props.schema[0]]==row[props.schema[0]])==-1?props.themeColor:'#c4c4c4',cursor:'pointer',display:'flex', justifyContent:'center', alignItems:'center',border:"2px solid "+props?.selected?.findIndex(cuy=>cuy[props.schema[0]]==row[props.schema[0]])==-1?'blue':'#c4c4c4', marginTop:'2px'}}>
                            <span  style={{textAlign:'center', fontSize:'12px',fontFamily:'Poppinsbold'}}>{row[props.schema[1]]}</span>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}