import React from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";


export default class Footer extends React.Component {

    LINKEDIN(){
        window.open("https://www.linkedin.com/in/abdul-hamid-chanouha",'_blank');
    }
    GITHUB(){
        window.open('https://github.com/Abed-Ch/Scandiweb-Test','_blank');
    }
    render() {

        return (
            <div className="Footer">
                <div className="Footer__Title">Scandiweb Test Assignment</div>
                <div className="Footer__Author">Made by: Abdul Hamid Chanouha</div>
                <div className="Footer__Icons"><BsLinkedin onClick={this.LINKEDIN} /><BsGithub onClick={this.GITHUB}/></div>
            </div>
        )
    }
}