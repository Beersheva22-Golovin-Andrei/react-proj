import { useRef, useState } from "react";

import InputResult from "../../model/InputResult";
import { Alert, Button, TextField } from "@mui/material";


type Props = {
    submitFn: (inputText: string) => InputResult;
    placeHolder: string;
    buttonTitle?: string;
    type?: string;
}

const Input: React.FC<Props> = ({submitFn, placeHolder, buttonTitle, type}) => {
    const inputElementRef = useRef<any>(null);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    function onClickFn() {
        const res = submitFn(inputElementRef.current!.value);
        setMessage(res.message || "");
        setStatus(res.status || "");
        res.message && setTimeout(() => setMessage(''), 5000);
        inputElementRef.current!.value="";
    }
    function onChangeFn(event:any) {
            inputElementRef.current = event.target as any;
            setDisabled(!event.target.value)
    }

    return <div>
        <TextField size="small" type={type || "text"} placeholder={placeHolder} ref={inputElementRef} onChange={onChangeFn}/>
        <Button onClick={onClickFn} disabled={disabled}>{buttonTitle || 'Go'}</Button>
        {message && <Alert>{message}</Alert>}
    </div>

}
export default Input;