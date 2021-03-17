export default function PickColor(props){
    const handleClick=(id, name)=>{
        props.onClick(id, name)
    }
    console.log(props.lala)
    return (
        <div className="flex justify-center items-center" style={{background:'white',position:'absolute',zIndex:'5',top:'40px', border:'1px solid rgba(0,0,0,0.3)', borderRadius:'10px'}}>
            <div className="row p-2">
                {props.data.map((cuy,index)=>(
                    <div className="col-md-4 text-center">
                        <div key={index} onClick={e=>handleClick(cuy.colorId,cuy.colorName)} style={{border:cuy.colorName==props.lala?`4px solid ${props.bg}`:'',background:cuy.colorName.toLowerCase(),margin:'auto',borderRadius:'50%', height:'20px', width:'20px'}}></div>
                    </div>

                ))}
                
              
            </div>
            
        </div>
    )
}