import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from "./components/pages/Orders";
import Products from "./components/pages/Poducts";
import ShoppingCart from "./components/pages/ShoppingCart";
import SignIn from "./components/pages/SignIn";
import Home from "./components/pages/Home";
import SignOut from "./components/pages/SignOut";
import Customers from "./components/pages/Customers";
import Navigator from "./components/navigators/Navigator"
import './App.css'
import { useState } from "react";
import NotFound from "./components/pages/NotFound";

const App: React.FC = () => {
  const [logedRole, setLogedRole] = useState<string>("signedOut");
return <BrowserRouter> 
<Routes>
    <Route path="/" element={<Navigator role={logedRole}/>}>
      <Route index element={<Home/>}/>
      <Route path="customers" element={<Customers/>}/>
      <Route path="products" element={<Products/>}/>
      <Route path="orders" element={<Orders/>}/>

      <Route path="notfound" element={<NotFound/>}/>

      <Route path="shoppingCart" element={<ShoppingCart/>}/>
      <Route path="signIn" element={<SignIn logInFn={function(login:string):void {
          let resRole = 'signedInUser'
          if (login.startsWith('admin')){
            resRole = 'signedInAdmin'
          }
          setLogedRole(resRole);
      }
      }/>
      }/>
      <Route path="signOut" element={<SignOut logOutFn={function():void{
          setLogedRole('signedOut');
      }}/>}/>
      <Route path="/*" element ={<NotFound></NotFound>}/>
    </Route>
  </Routes>
  </BrowserRouter>
    

}

export default App;