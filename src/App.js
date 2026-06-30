import React, { lazy, Suspense } from "react"; 
import ReactDOM from "react-dom/client";
import Header from "./component/Header";
import Body  from "./component/Body";
import "../index.css";
import {
         createBrowserRouter, 
         RouterProvider,
        Outlet} from "react-router-dom";
import About from "./component/About";
import Error from "./component/Error";
import Contactus from "./component/Contactus";
import RestaurantMenu from "./component/RestaurantMenu";

// import Groceary from "./component/Groceary";



const Groceary = lazy(()=>import("./component/Groceary"))
const AppLayout = ()=>{
  
  return <div className = "app">
    <h1 className="text-5xl font-bold text-red-500">
    Tailwind Test
</h1>
    <Header />
    <Outlet/>
  </div>
  };

const appRouter = createBrowserRouter(
  [
    {
      path:"/",
      element: <AppLayout/>,
      children :[
      {
      path:"/",
      element:<Body/>,
      },
      {
      path:"/about",
      element:<About/>,
      },
      {
        path:"/contactus",
        element:<Contactus/>,
      } ,
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu/>
      }, 
      {
        path: "/groceary",
        element: (<Suspense fallback={<h1>Loading...</h1>}><Groceary/></Suspense>)
      },
     ],
      errorElement:<Error />
    },
    
  ]
);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);
