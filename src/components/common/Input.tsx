import { useRef, useState } from "react";
import InputResult from "../../model/InputResult";
import Alert from "./Alert";

type Props = {
    submitFn: (inputText: string) => InputResult;
    placeHolder: string;
    buttonTitle?: string;
    type?: string;
}

const Input: React.FC<Props> = ({ submitFn, placeHolder, buttonTitle, type }) => {
    const inputElementRef = useRef<HTMLInputElement>(null);
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
    function onChangeFn() {
        setDisabled(!inputElementRef.current?.value);
    }

    return <div>
        <input type={type || "text"} placeholder={placeHolder} ref={inputElementRef} onChange={onChangeFn}/>
        <button onClick={onClickFn} disabled={disabled}>{buttonTitle || 'Go'}</button>
        {message && <Alert status={status} message={message} />}
    </div>
}
export default Input;