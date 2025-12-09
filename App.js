import React from "react";
import ReactDOM from "react-dom/client";

// react.createElement => would be object first of all, and when render this 
// elemnt onto the DOM then it becoms a html....

const elem = <span>React Element</span>

// Component composition
const title =   (
    <h1 className="head" tabIndex="5">
        {elem}
        Namate React Using JSX
    </h1>
    
    );
const HeadingComponent = () => ( 
       
      <div id= "container">
      <div>{title}</div>  
       
        <h2 className="heading">Namste React Functional Component </h2>
    </div>
   
);
    const root = ReactDOM.createRoot(document.getElementById("root"));
    // root.render(heading);
    // root.render(<HeadingComponent/>);

    root.render(
  <div>
    
    <HeadingComponent />
  </div>
);

    // here heading is object then how does it shown on browser?
    // becasue ReactDom will take heading as object and then converts to html