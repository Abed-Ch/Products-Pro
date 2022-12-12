import React from "react";


export default class E404 extends React.Component {
     

    render(){
        setTimeout(() => {
            window.location.pathname = "/"
        }, 3000);
        return (
            <div className="Error"></div>
        )
    }
}