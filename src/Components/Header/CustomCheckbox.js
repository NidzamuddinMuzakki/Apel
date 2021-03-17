

export default function CustomCheckbox(props){
    function handleCheck(e){
        props.onClick(e)
    }
  
    return (
           
                <input className="customCheckbox" style={{'--color':props.themeColor}} data-before-content={props.before} data-after-content={props.after} checked={props.checked} onChange={handleCheck} type="checkbox" ></input>
         
    )
}