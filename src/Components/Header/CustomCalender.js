import { useEffect, useState } from "react";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Color from './../../Theme.json'
export default function CustomCalender(props){
    
    const dataHoliday = [{
        
            "20200101": {
                "deskripsi": "Hari Tahun Baru",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20200125": {
                "deskripsi": "Tahun Baru Imlek",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20200322": {
                "deskripsi": "Isra Mi'raj Nabi Muhammad",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20200325": {
                "deskripsi": "Hari Suci Nyepi (Tahun Baru Saka)",
                "dibuat": "20201105T094940Z",
                "dimodifikasi": "20201105T094940Z",
                "status": "CONFIRMED"
            },
            "20200410": {
                "deskripsi": "Wafat Isa Almasih",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20200412": {
                "deskripsi": "Hari Paskah",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20200501": {
                "deskripsi": "Hari Buruh Internasional/Pekerja",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20200507": {
                "deskripsi": "Hari Raya Waisak",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20200521": {
                "deskripsi": "Kenaikan Yesus Kristus",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20200524": {
                "deskripsi": "Idul Fitri (Lebaran Mudik)",
                "dibuat": "20200317T002609Z",
                "dimodifikasi": "20200317T002609Z",
                "status": "CONFIRMED"
            },
            "20200525": {
                "deskripsi": "Idul Fitri (Lebaran Mudik)",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20200601": {
                "deskripsi": "Hari Lahir Pancasila",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20200731": {
                "deskripsi": "Idul Adha (Lebaran Haji)",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20200817": {
                "deskripsi": "Hari Proklamasi Kemerdekaan R.I.",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20200820": {
                "deskripsi": "Satu Muharam/Tahun Baru Hijriyah",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20200821": {
                "deskripsi": "Muharram / Islamic New Year Holiday",
                "dibuat": "20200317T002609Z",
                "dimodifikasi": "20200317T002609Z",
                "status": "CONFIRMED"
            },
            "20201028": {
                "deskripsi": "Cuti Bersama",
                "dibuat": "20200527T222456Z",
                "dimodifikasi": "20200527T222456Z",
                "status": "CONFIRMED"
            },
            "20201029": {
                "deskripsi": "Maulid Nabi Muhammad",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20201030": {
                "deskripsi": "The Prophet Muhammad's Birthday Holiday",
                "dibuat": "20200317T002609Z",
                "dimodifikasi": "20200317T002609Z",
                "status": "CONFIRMED"
            },
            "20201114": {
                "deskripsi": "Diwali/Deepavali",
                "dibuat": "20190221T122231Z",
                "dimodifikasi": "20190221T122231Z",
                "status": "CONFIRMED"
            },
            "20201224": {
                "deskripsi": "Cuti Bersama (Malam Natal)",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20201225": {
                "deskripsi": "Hari Natal",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20201228": {
                "deskripsi": "Cuti Bersama",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20201229": {
                "deskripsi": "Cuti Bersama",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20201230": {
                "deskripsi": "Cuti Bersama",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20201231": {
                "deskripsi": "Cuti Bersama",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210101": {
                "deskripsi": "Hari Tahun Baru",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210212": {
                "deskripsi": "Tahun Baru Imlek",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210311": {
                "deskripsi": "Isra Mi'raj Nabi Muhammad",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210312": {
                "deskripsi": "Cuti Bersama",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210314": {
                "deskripsi": "Hari Suci Nyepi (Tahun Baru Saka)",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210402": {
                "deskripsi": "Wafat Isa Almasih",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210404": {
                "deskripsi": "Hari Paskah",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210501": {
                "deskripsi": "Hari Buruh Internasional/Pekerja",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210512": {
                "deskripsi": "Cuti Bersama",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210513": {
                "deskripsi": "Idul Fitri (Lebaran Mudik)",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210514": {
                "deskripsi": "Idul Fitri (Lebaran Mudik)",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210517": {
                "deskripsi": "Cuti Bersama",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210518": {
                "deskripsi": "Cuti Bersama",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210526": {
                "deskripsi": "Hari Raya Waisak",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210601": {
                "deskripsi": "Hari Lahir Pancasila",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210720": {
                "deskripsi": "Idul Adha (Lebaran Haji)",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210810": {
                "deskripsi": "Satu Muharam/Tahun Baru Hijriyah",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20210817": {
                "deskripsi": "Hari Proklamasi Kemerdekaan R.I.",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20211019": {
                "deskripsi": "Maulid Nabi Muhammad",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20211104": {
                "deskripsi": "Diwali/Deepavali",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20211224": {
                "deskripsi": "Cuti Bersama (Malam Natal)",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20211225": {
                "deskripsi": "Hari Natal",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20211226": {
                "deskripsi": "Jumat untuk Hari Raya Natal",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20211231": {
                "deskripsi": "Malam Tahun Baru",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20220101": {
                "deskripsi": "Hari Tahun Baru",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20220201": {
                "deskripsi": "Tahun Baru Imlek",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20220301": {
                "deskripsi": "Isra Mi'raj Nabi Muhammad",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20220415": {
                "deskripsi": "Wafat Isa Almasih",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20220417": {
                "deskripsi": "Hari Paskah",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20220501": {
                "deskripsi": "Hari Buruh Internasional/Pekerja",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20220503": {
                "deskripsi": "Idul Fitri (Lebaran Mudik)",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20220504": {
                "deskripsi": "Idul Fitri (Lebaran Mudik)",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20220526": {
                "deskripsi": "Kenaikan Yesus Kristus",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20220601": {
                "deskripsi": "Hari Lahir Pancasila",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20220710": {
                "deskripsi": "Idul Adha (Lebaran Haji)",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20220730": {
                "deskripsi": "Satu Muharam/Tahun Baru Hijriyah",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20220817": {
                "deskripsi": "Hari Proklamasi Kemerdekaan R.I.",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20221008": {
                "deskripsi": "Maulid Nabi Muhammad",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20221024": {
                "deskripsi": "Diwali/Deepavali",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20221224": {
                "deskripsi": "Malam Natal",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20221225": {
                "deskripsi": "Hari Natal",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "20221231": {
                "deskripsi": "Malam Tahun Baru",
                "dibuat": "20210109T190620Z",
                "dimodifikasi": "20210109T190620Z",
                "status": "CONFIRMED"
            },
            "created-at": "2021-01-12 04:05"
        
    }]
    const [fulldatenow, setFullDateNow]  =useState(props.value!=''?props.value:new Date());
    const [SelectDateMonthYearNow,SetSelectDateMonthYearNow] = useState(props.value!=''?props.value:new Date()); 
   


    const [state, setState] = useState(
        {
            dateNow : 0,
            dayNow : 0,
            monthNow : 0,
            yearNow : 0,
            weekNow:'',
            quarterNow:'',
            semesterNow:'',
            Years:[],
            Dates:[],
            Months :["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
            Days : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
            Semesters : ['Semester 1', 'Semester 2'],
            Quarters : ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
            Weeks : ['Week 1', 'Week 2', 'Week 3', 'Week 4'],



        }
    )
        
    const [stateHideShow, setstateHideShow] = useState({
        day:false, month:false, year:false, week:false, quarter:false, semester:false
    })
    const Prev = ()=>{
        if(stateHideShow.day==true  || stateHideShow.week==true){
            
            if((state.monthNow-1)<0){
                if(stateHideShow.week==true){
                    let hmm = state.weekNow.split(" ")
                   
                    props.onChange(hmm[0].split("")[0]+hmm[hmm.length-1]+"-"+(state.Months[state.monthNow+11])?.slice(0,3)+"-"+(parseInt(state.yearNow)-1))
                }
                setState({...state, yearNow:state.yearNow-1,monthNow:state.monthNow+11,dateNow:0})
                
            }else{
                if(stateHideShow.week==true){
                    let hmm = state.weekNow.split(" ")
                   
                    props.onChange(hmm[0].split("")[0]+hmm[hmm.length-1]+"-"+(state.Months[state.monthNow-1])?.slice(0,3)+"-"+state.yearNow)
                }
                setState({...state, monthNow:state.monthNow-1,dateNow:0})
                
            }
        }else if(stateHideShow.month==true || stateHideShow.quarter==true || stateHideShow.semester==true){
            if(parseInt(state.yearNow)-1<0){
                setState({...state, yearNow:0})
                if(stateHideShow.month==true && props.type=="monthly"){
                    props.onChange(state.Months[state.monthNow]?.slice(0,3)+"-"+0)
                }
                else if(stateHideShow.quarter==true &&  props.type=="quarterly"){
                    props.onChange(state.quarterNow+"-"+0)
                }else if(stateHideShow.semester==true &&  props.type=="haly-yearly"){
                    props.onChange(state.semesterNow+"-"+0)
                }
            }else{
                setState({...state, yearNow:parseInt(state.yearNow)-1})
                if(stateHideShow.month==true &&  props.type=="monthly"){
                   
                  
                    props.onChange(state.Months[state.monthNow]?.slice(0,3)+"-"+(parseInt(state.yearNow)-1))
                }else if(stateHideShow.quarter==true &&  props.type=="quarterly"){
                    props.onChange(state.quarterNow+"-"+(parseInt(state.yearNow)-1))
                }else if(stateHideShow.semester==true &&   props.type=="haly-yearly"){
                    props.onChange(state.semesterNow+"-"+(parseInt(state.yearNow)-1))
                }
            }
        }else if(stateHideShow.year==true){
            if(state.Years[0]-10<0){
                let cuy = YearsChange(0)
                setState({...state, Years:cuy})
            }else{
                let cuy = YearsChange(state.Years[0]-10)
                setState({...state, Years:cuy})
            }
        }
    }
    const Next = ()=>{
        if(stateHideShow.day==true || stateHideShow.week==true){
            
            if((state.monthNow+1)>11){
                if(stateHideShow.week==true){
                    let hmm = state.weekNow.split(" ")
                   
                    props.onChange(hmm[0].split("")[0]+hmm[hmm.length-1]+"-"+(state.Months[0])?.slice(0,3)+"-"+(parseInt(state.yearNow)+1))
                }
                setState({...state, yearNow:state.yearNow+1,monthNow:0,dateNow:0})
            }else{
                if(stateHideShow.week==true){
                    let hmm = state.weekNow.split(" ")
                   
                    props.onChange(hmm[0].split("")[0]+hmm[hmm.length-1]+"-"+(state.Months[state.monthNow+1])?.slice(0,3)+"-"+(parseInt(state.yearNow)))
                }
                setState({...state, monthNow:state.monthNow+1,dateNow:0})
            }
           
        }else if(stateHideShow.month==true || stateHideShow.quarter==true || stateHideShow.semester==true){
            setState({...state, yearNow:parseInt(state.yearNow)+1})
            if(stateHideShow.month==true &&  props.type=="monthly"){
                   
                  
                props.onChange(state.Months[state.monthNow]?.slice(0,3)+"-"+(parseInt(state.yearNow)+1))
            }else if(stateHideShow.quarter==true &&  props.type=="quarterly"){
                props.onChange(state.quarterNow+"-"+(parseInt(state.yearNow)+1))
            }else if(stateHideShow.semester==true &&   props.type=="haly-yearly"){
                props.onChange(state.semesterNow+"-"+(parseInt(state.yearNow)+1))
            }
        }else if(stateHideShow.year==true){
            let cuy = YearsChange(state.Years[state.Years.length-1])
            setState({...state, Years:cuy})
        }
        
    }
    const labelClick =()=>{
        if(stateHideShow.day==true){
            setstateHideShow({
                day:false,
                month:true,
            })
        }else if(stateHideShow.month==true){
            setstateHideShow({
                month:false,
                year:true,
            })
        }
        else if(stateHideShow.year==true){
            if(props.type=="weekly" || props.type=="daily" || props.type=="intraday"){
                setstateHideShow({
                    month:true,
                    year:false,
                })
            }
        }else if(stateHideShow.week==true){
            setstateHideShow({
                week:false,
                month:true,
            })
        }
        else if(stateHideShow.quarter==true){
            setstateHideShow({
                quarter:false,
                year:true,

            })
        }
        else if(stateHideShow.semester==true){
            setstateHideShow({
                semester:false,
                year:true,
            })
        }
    }
    const MonthSelect = (e)=>{
        let id = e.target.id;
        if(!e.target.id){
            id = e.target.parentNode.id;
        }
        
        setState({...state, monthNow:state.Months.findIndex(cuy=>cuy==id)})
        OpenPilihType();
        
        if(props.type=="monthly"){
            props.onChange(id.slice(0,3)+"-"+state.yearNow)
        }else if(props.type=="weekly"){
            if(state.weekNow!=""){
                props.onChange(state.weekNow.split("")[0]+state.weekNow.split("")[state.weekNow.split("").length-1]+"-"+id.slice(0,3)+"-"+state.yearNow)

            }else{

            }
        }else if(props.type=="daily" || props.type=="intraday"){
            
        }
        
    }
    const SemesterSelect=(e)=>{
        let id = e.target.id;
        if(!e.target.id){
            id = e.target.parentNode.id;
        }
        id=id.split("");
        id = id[0]+""+id[id.length-1]
        setState({...state, semesterNow:id})
        OpenPilihType();
        props.onChange(id+"-"+state.yearNow)
    }
    const daySelect = (e)=>{
        let id = e.target.id;
       

        if(!e.target.id){
            id = e.target.closest("#tanggal");
        }

        SetSelectDateMonthYearNow(id.children[0].innerHTML+"-"+(state.Months[state.monthNow]).slice(0,3)+"-"+state.yearNow)
        props.onChange(id.children[0].innerHTML+"-"+(state.Months[state.monthNow]).slice(0,3)+"-"+state.yearNow)
    }
    const QuarterSelect=(e)=>{
        let id = e.target.id;
        if(!e.target.id){
            id = e.target.parentNode.id;
        }
        id=id.split("");
        id = id[0]+""+id[id.length-1]
        setState({...state, quarterNow:id})
        props.onChange(id+"-"+state.yearNow)
        OpenPilihType();
    }
    const WeekSelect = (e)=>{
        let id = e.target.id;
        if(!e.target.id){
            id = e.target.parentNode.id;
        }
        setState({...state, weekNow:id})
        id = id.split("")[0]+id.split("")[id.split("").length-1]
       
        props.onChange(id+"-"+(state.Months[state.monthNow])?.slice(0,3)+"-"+state.yearNow)
        OpenPilihType();
        
    }
    useEffect(()=>{
        OpenPilihType();
    },[props.type])
    const YearSelect=(e)=>{
        let id = e.target.id;
        if(!e.target.id){
            id = e.target.parentNode.id;
        }
        setState({...state, yearNow:id})
        if(props.type=="quarterly"){
            props.onChange(state.quarterNow+"-"+id)
            setstateHideShow({
                quarter:true,
                year:false,
            })
        }else if(props.type=="haly-yearly"){
            props.onChange(state.semesterNow+"-"+id)
            setstateHideShow({
                semester:true,
                year:false,
            })
        }else if(props.type=="weekly"){
           
            setstateHideShow({
                month:true,
                year:false,
            })
        }
        else if(props.type=="yearly"){
            props.onChange(id)
        }else if(props.type=="daily" || props.type=="intraday"){
            setstateHideShow({
                month:true,
                year:false,
            })
        }else if(props.type=="monthly"){
            
             props.onChange(state.Months[state.monthNow]?.slice(0,3)+"-"+id)
            setstateHideShow({
                month:true,
                year:false,
            })
        }
        else{
            props.onChange(props.value.split[0]+" "+id)
            setstateHideShow({
                month:true,
                year:false,
            })

        }
    }   
    const YearsChange = (yearNow)=>{
        

            let cuyYearNow = (""+yearNow).split("");
            let cuyYears = []
            
            cuyYearNow = yearNow-parseInt(cuyYearNow[cuyYearNow.length-1]) 
          
            for(let i=0;i<12;i++){
                cuyYears.push(cuyYearNow)
                cuyYearNow++;
            }    
            return cuyYears;
        
        
    }
    
    const DateChange=(yearNow, monthNow)=>{
        let cuyDates = [];
        let cuyDay = 0;
        let cuyDateNowBegin = new Date(yearNow, monthNow, 1).getDay();
        let cuyDateNowLast = new Date(yearNow, monthNow+1, 0).getDay();
        let cuyKosongAwal = 0;
        let lastPerulangan = new Date(yearNow, monthNow+1, 0).getDate();
        
        if(cuyDateNowBegin!=0){
            let kurang = 7-cuyDateNowBegin;
            cuyKosongAwal = 7-kurang
        }
        for(let i=0;i<lastPerulangan+cuyKosongAwal;i++){
            if(cuyDay==7){
                cuyDay=0;
            }
            if(i<cuyKosongAwal){
                cuyDates[i] = {Date:'',Day:cuyDay,Month:monthNow,Yaer:yearNow,description:{}}
            }else{
              
                let mont = monthNow+1<10?"0"+(monthNow+1):monthNow+1;
                let hari = (i+1-cuyKosongAwal)<10?"0"+(i+1-cuyKosongAwal):i+1-cuyKosongAwal;
                let cuy = dataHoliday[0][''+yearNow+""+mont+""+hari];
                if(cuy){
                    cuyDates[i] = {Date:i+1-cuyKosongAwal,Month:monthNow,Year:yearNow,Day:cuyDay,description:{cuy}}

                }else{
                    cuyDates[i] = {Date:i+1-cuyKosongAwal,Month:monthNow,Year:yearNow,Day:cuyDay,description:{}}

                }
            }
            cuyDay++;
        }
       
        return cuyDates
    }
    const OpenPilihType = ()=>{
        if(props.type=="daily" || props.type=="intraday"){
            setstateHideShow({
                day:true, month:false, year:false, week:false, quarter:false, semester:false, year:false
            })
        }else if(props.type=="weekly"){
            setstateHideShow({
                day:false, month:false, year:false, week:true, quarter:false, semester:false, year:false
            })
        }else if(props.type=="monthly"){
            setstateHideShow({
                day:false, month:true, year:false, week:false, quarter:false, semester:false, year:false
            })
        }
        else if(props.type=="quarterly"){
            setstateHideShow({
                day:false, month:false, year:false, week:false, quarter:true, semester:false, year:false
            })
        }else if(props.type=="haly-yearly"){
            
            setstateHideShow({
                day:false, month:false, year:false, week:false, quarter:false, semester:true, year:false                   })
        }else if(props.type=="yearly"){
            setstateHideShow({
                day:false, month:false, year:false, week:false, quarter:false, semester:false, year:true
            })
        }
    }
   
    useEffect(()=>{
            SetSelectDateMonthYearNow(props.value!=''?props.value:new Date())
            let cuy = YearsChange(state.yearNow)
            if(props.type=="daily" || props.type=="intraday"){
                if(typeof props.value=="string"){
                    
                    setState({
                        ...state,
                        dateNow : parseInt(props.value.split("-")[0]),
                        dayNow :  new Date(parseInt(props.value.split("-")[2]), state.Months.findIndex(cuy=>cuy.slice(0,3)==props.value.split("-")[1]),  parseInt(props.value.split("-")[0])).getDay(),
                        monthNow : state.Months.findIndex(cuy=>cuy.slice(0,3)==props.value.split("-")[1]),
                        yearNow : parseInt(props.value.split("-")[2]),
                        Years:cuy
                    })
                }else{

                    setState({
                        ...state,
                        dateNow : props.value.getDate(),
                        dayNow : props.value.getDay(),
                        monthNow : props.value.getMonth(),
                        yearNow : props.value.getFullYear(),
                        Years:cuy
                    })
                }

            }else if(props.type=="weekly"){
                if(typeof props.value=="string"){
                    let pecahPilih = props.value.split("-");
                    setState({
                        ...state,
                        monthNow : state.Months.findIndex(cuy=>cuy.slice(0,3)==pecahPilih[1]),
                        yearNow : parseInt(pecahPilih[2]),
                        Years:cuy
                    })
                    
                }else{
                 
                    setState({
                        ...state,
                        monthNow : props.value.getMonth(),
                        yearNow : props.value.getFullYear(),
                        Years:cuy
                    })
                }
            }else if(props.type=="quarterly"){
                if(typeof props.value=="string"){
                    let pecahPilih = props.value.split("-");
                    setState({
                        ...state,
                        quarterNow:pecahPilih[0],
                        yearNow : parseInt(pecahPilih[1]),
                        Years:cuy
                    })
                }else{
                    setState({
                        ...state,
                        yearNow : props.value.getFullYear(),
                        Years:cuy
                    })
                }
            }
            else if(props.type=="haly-yearly"){
                if(typeof props.value=="string"){
                  
                    let pecahPilih = props.value.split("-");
                    setState({
                        ...state,
                        semesterNow:pecahPilih[0],
                        yearNow :parseInt(pecahPilih[1]),
                        Years:cuy
                    })
                }else{
                    setState({
                        ...state,
                        
                        yearNow : props.value.getFullYear(),
                        Years:cuy
                    })
                }
            }
            else if(props.type=="monthly"){
                if(typeof props.value=="string"){
                    let pecahPilih = props.value.split("-");
                    setState({
                        ...state,
                        monthNow:state.Months.findIndex(cuy=>cuy.slice(0,3)==pecahPilih[0]),
                        yearNow : parseInt(pecahPilih[1]),
                        Years:cuy
                    })
                }else{
                    setState({
                        ...state,
                        monthNow:SelectDateMonthYearNow.getMonth(),
                        yearNow : SelectDateMonthYearNow.getFullYear(),
                        Years:cuy
                    })
                }
            }
            else if(props.type=="yearly"){
                if(typeof props.value=="string"){
                    let pecahPilih = props.value;
                    setState({
                        ...state,
                       
                        yearNow : pecahPilih,
                        Years:cuy
                    })
                }else{
                    setState({
                        ...state,
                      
                        yearNow : props.value.getFullYear(),
                        Years:cuy
                    })
                }
            }
            if(props.open==false){
                OpenPilihType();
            }
    },[props.open])
    useEffect(()=>{
        let cuy = YearsChange(state.yearNow)
        let cuy1 = DateChange(state.yearNow, state.monthNow)
        setState({
            ...state,
            Years:cuy,
            Dates:cuy1
        })
    },[state.monthNow, state.yearNow])
    console.log(state.dayNow,state.dateNow,state.monthNow, state.yearNow)
    return (
        
        <div className="w-full h-full ">
            <div className="flex w-full h-full">
                {props.type=="daily" || props.type=="intraday"?<div style={{'--color':props.themeColor?props.themeColor:''}} className="w-1/4 dateNow">
                    <div className="mt-2">

                        <span>{props.value.split("-")[2]}</span>
                        <br></br>
                        
                        <span>{state.Days[(new Date(parseInt(props.value.split("-")[2]), state.Months.findIndex(cuy=>cuy.slice(0,3)==props.value.split("-")[1]), parseInt(props.value.split("-")[0]))).getDay()]+", "}</span>
                        <br></br>
                        {props.type=="daily" || props.type=="intraday"?<span>{(typeof props.value=="string" && props.type=="daily" || props.type=="intraday"?state.Months[state.Months.findIndex(cuy=>cuy.slice(0,3)==props.value?.split("-")[1])]?.slice(0,3):state.Months[props.value.getMonth()]?.slice(0,3))+' '+(typeof props.value=="string"?(props.value+"").split("-")[2]?.slice(2,4):null)}</span>:null}
                    </div>
                </div>:""}
                <div className={props.type=="daily" || props.type=="intraday"?"w-3/4":"w-full"+" h-full"}>
                <div className="flex justify-center items-center mt-2">
                    <ArrowLeftIcon onClick={Prev} style={{'--color':props.themeColor?props.themeColor:''}} className="arrow-left"></ArrowLeftIcon>
                    <span onClick={labelClick} style={{'--color':props.themeColor?props.themeColor:''}} className="monthyear">
                        <span style={{display:stateHideShow.day || stateHideShow.week?'block':'none'}}>{state.Months[state.monthNow]+' '+state.yearNow}</span>
                        <span style={{display:stateHideShow.month || stateHideShow.quarter || stateHideShow.semester?'block':'none'}}>{state.yearNow}</span>
                        <span style={{display:stateHideShow.year ?'block':'none'}}>{state.Years[0]+'-'+state.Years[state.Years.length-1]}</span>
                    </span>
                    <ArrowRightIcon onClick={Next} style={{'--color':props.themeColor?props.themeColor:''}} className="arrow-right"></ArrowRightIcon>
                </div>
                <div className="text-center p-3 ml-5">
                    <div className="grid grid-cols-7" style={{display:stateHideShow.day?'grid':'none'}}>
                        {state.Days.map((cuy,index)=>(
                            <div style={{width:'10px',height:'10px'}} key={cuy}>
                                <span className="dayArrow flex justify-center mb-3">{cuy}</span>
                                {state.Dates.map(cuy1=>{
                                    if(cuy1.Day==index){
                                        return (
                                            <div key={cuy1.Date} onClick={daySelect} id={"tanggal"} name={cuy1.Date} className="divTanggalParent" style={{position:'relative',width:'10px',height:'10px',marginBottom:'15px', textAlign:'center',color:index==0?'red':'black'}}>
                                                <span style={{color:Object.keys(cuy1.description).length>0 || index==0?"red":"#575757",'--color':props.themeColor?props.themeColor:''}} className={cuy1.Date==props?.value?.split("-")[0]&&(state.Months[state.monthNow])?.slice(0,3)==props.value.split("-")[1] && state.yearNow==props.value.split("-")[2]?"dateCalenderSelect":""+cuy1.Date==""?"":"dateCalender"+" flex justify-center"}>{cuy1.Date}</span>
                                                {Object.keys(cuy1.description).length==0?'':<div className="dot"></div>}
                                                {Object.keys(cuy1.description).length==0?'':<div style={{'--color':props.themeColor?props.themeColor:''}} className="Description">
                                                    {cuy1.description.cuy.deskripsi}
                                                </div>}    
                                            </div>
                                        )
                                    }
                                })}
                            </div>

                        ))}
                    </div>

                    <div className="grid grid-cols-2" style={{display:stateHideShow.week?'grid':'none'}}>
                        {state.Weeks.map((cuy,index)=>(
                            <div onClick={WeekSelect} id={cuy} style={{marginLeft:'50px','--color':props.themeColor?props.themeColor:''}} className={cuy.split("")[0]+cuy.split("")[cuy.split("").length-1]==props.value.split("-")[0]?"MontDivMapingSelect":""+"MontDivMaping"} key={cuy}>
                                <span className={"MontMaping"}>{cuy}</span>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3" style={{display:stateHideShow.month?'grid':'none'}}>
                        {state.Months.map((cuy,index)=>(
                            <div onClick={MonthSelect} id={cuy} style={{'--color':props.themeColor?props.themeColor:''}} className={state.Months[index].slice(0,3)==props.value.split("-")[0] || state.Months[index].slice(0,3)==props.value.split("-")[1]?"MontDivMapingSelect":""+"MontDivMaping"} key={cuy}>
                                <span className={"MontMaping"}>{cuy.slice(0,3)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2" style={{display:stateHideShow.quarter?'grid':'none'}}>
                        {state.Quarters.map((cuy,index)=>(
                            <div onClick={QuarterSelect}  id={cuy} style={{width:'100px',marginLeft:'30px','--color':props.themeColor?props.themeColor:''}} className={cuy.split("")[0]+cuy.split("")[cuy.split("").length-1]==props.value.split("-")[0]?"MontDivMapingSelect":""+"MontDivMaping"} key={cuy}>
                                <span className={"MontMaping"}>{cuy}</span>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2" style={{display:stateHideShow.semester?'grid':'none'}}>
                        {state.Semesters.map((cuy,index)=>(
                            <div onClick={SemesterSelect} id={cuy} style={{width:'100px',marginLeft:'30px','--color':props.themeColor?props.themeColor:''}} className={cuy.split("")[0]+cuy.split("")[cuy.split("").length-1]==props.value.split("-")[0]?"MontDivMapingSelect":""+"MontDivMaping"} key={cuy}>
                                <span className={"MontMaping"}>{cuy}</span>
                            </div>
                        ))}
                    </div>
                     <div className="grid grid-cols-3" style={{display:stateHideShow.year?'grid':'none'}}>
                        {state.Years?.map((cuy,index)=>(
                            <div onClick={YearSelect} id={cuy} style={{'--color':props.themeColor?props.themeColor:''}} className={cuy==state.yearNow?"MontDivMapingSelect":""+"MontDivMaping"} key={cuy}>
                                <span className={"MontMaping"}>{cuy}</span>
                            </div>
                        ))}
                    </div>             

                </div>
                
                 
                </div>
            </div>
        </div>
    )
}