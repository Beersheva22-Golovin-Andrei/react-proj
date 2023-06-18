type Props = {status: string, message: string}

const Alert: React.FC<Props> = ({status, message})=>{
    let color: string = "green";
    let warning: string = "";
    switch (status){
    case "error":{
        color = "red";
        warning = "Place was not found!"
        break;
    }
    case "warning":{
       color = "yellow";
       warning = "There are more then 2 similar results!"
        break;
    }
}
const style: React.CSSProperties = {
    color: color
}

    return <div>
        <p>
            <span style={style}>{message}</span>
            <p>
                <span style={style}>{warning}</span>
            </p>
        </p>
    </div>
}

export default Alert;
