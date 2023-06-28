import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from "./components/pages/Orders";
import Products from "./components/pages/Poducts";
import ShoppingCart from "./components/pages/ShoppingCart";
import SignIn from "./components/pages/SignIn";

import Home from "./components/pages/Home";
import SignOut from "./components/pages/SignOut";
import Customers from "./components/pages/Customers";
import './App.css'
import NotFound from "./components/pages/NotFound";
import NavigatorDispatcher from "./components/navigators/NavigatorDispatcher";
import { useSelectorAuth } from "./redux/store";

const App: React.FC =  () => {
  let userRole = useSelectorAuth();
return <BrowserRouter> 
<Routes>
    <Route path="/" element={<NavigatorDispatcher role={userRole.role}/>}>
      <Route index element={<Home/>}/>
      <Route path="customers" element={<Customers/>}/>
      <Route path="products" element={<Products/>}/>
      <Route path="orders" element={<Orders/>}/>
      <Route path="notfound" element={<NotFound/>}/>
      <Route path="shoppingCart" element={<ShoppingCart/>}/>
      <Route path="signIn" element={SignIn({})}/>
      <Route path="signOut" element={<SignOut/>}/>
      <Route path="/*" element ={<NotFound></NotFound>}/>
    </Route>
  </Routes>
  </BrowserRouter>
}

export default App;