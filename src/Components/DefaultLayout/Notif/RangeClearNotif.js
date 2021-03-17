export default function RangeClearNotif(props){
    return (
        <div className="rangeClearParent">
            <div className="rangeClearLabel">
                <span className="rangeClear">Range Clear</span>
                <span className="percentageClear">{props.value}%</span>
            </div>
        </div>
    )
}