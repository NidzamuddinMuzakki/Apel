import {useState, useEffect} from 'react'

export default function PopUpCap(props){
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    const [c, setC] = useState(0)
    const [d, setD] = useState(0)
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    useEffect(()=>{
        let cuyA = getRandomInt(0,100);
        let cuyB = getRandomInt(0,100);
        setA(cuyA)
        setB(cuyB)
        setD(cuyA+cuyB)
       
    },[props.value])
    const Handchange=(e)=>{
        setC(e.target.value)

        if(e.target.value==d){
            props.onChange(true)
        }
    }
    return (
        <div className="popCap">
            <div className="divPopCap">
                <div className="soal">
                    <span>{a}</span>
                    <span>{"+"}</span>
                    <span>{b}</span>
                    <span>{"="}</span>
                    <span>{"?"}</span>
                </div>
                <div className="jawaban">
                    <label className="labeljawabanCapPop">Jawaban</label>
                    <input value={c} onChange={Handchange} className="jawabanCapPop" type="number"></input>
                </div>

            </div>
        </div>
    )
}