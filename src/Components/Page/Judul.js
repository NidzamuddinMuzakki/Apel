import {useTranslation} from 'react-i18next'
export default function Judul(props){
    
    const {t} = useTranslation()
    return (
        <div style={{paddingTop:'20px', paddingBottom:"20px"}}>
            <span style={{fontSize:"25px", marginLeft:'20px'}}>
               {props.judulSekarang=="003"?t("lblA004M"):props.judulSekarang=="004"?t("lblA007M"):props.judulSekarang=="005"?t("lblA011M"):props.judulSekarang=="006"?t("lblA010M"):""}
            </span>     
        </div>
    )
}