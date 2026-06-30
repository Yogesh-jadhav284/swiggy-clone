import {LOGO_URL} from "../utils/constant";
import { useState } from "react";
import {Link} from "react-router-dom";
import Groceary from "./Groceary";
const Header   = ()=>{

  // let btnName = "login"
  const [btnNameReact, setBtnNameReact] = useState("login")
  return (

    
    <div className= "flex justify-between bg-pink-100 ">
        <div className = "logo-Container">
          <img className = "w-44 " src ={LOGO_URL}/>
        </div>
        <div className = "nav-items flex items-center">
          <ul className = "flex p-4 m-4">
            <li className="px-4">
              <Link to="/about">About us</Link>
            </li>
              <li className="px-4"><Link to="/">Home</Link></li>
              <li className="px-4"><Link to="/contactus">Contact us</Link></li>
              <li className="px-4"><Link to ="/Groceary">Grocery</Link></li>
              <li className="px-4">Cart</li>
           <button className="login"
           onClick={()=>{
            btnNameReact === "login" 
            ? setBtnNameReact("logout")
            :setBtnNameReact("login")
          }
        }
           >{btnNameReact}</button>
          </ul>
        </div>
    </div>
  );
};
export default Header;
