import React from "react";
class Userclass extends React.Component 
{
    constructor(props){
        super(props);
    // Creating the state variable
        this.state = {count:0};
    };
    render(){
        const {name,Location,Designation} = this.props;
        const {count} = this.state;
        return(
            <div className="user">
                <h4>Name: {name}</h4>
                <h4>Location: {Location}</h4>
                <h4>Designation: {Designation}</h4>
                <h1>Count: {count}</h1>
               <h1><button 
                onClick={()=>{
                    this.setState({
                        count:this.state.count + 1
                    })
                }}
                ></button></h1>
                
            </div>
        ) ;
    };
};
export default Userclass;