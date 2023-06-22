
type Params = {
    logOutFn: () => void;
}
const SignOut: React.FC<Params> = ({logOutFn})=>{
    logOutFn();
return <p className="component-logo">SignOut component</p>
}
export default SignOut;