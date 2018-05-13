import React, { Component } from 'react';

import Nav from '../../../components/Nav/Nav';

class AboutThisProject extends Component{
    render(){
        return(
            <div>
            <Nav />
                <div className="aboutProjectDiv">
                    <h3 className="techUsed">About This Project</h3>
                    <p className="techUsed">
                        This is a scheduling application that allows the user to quickly and easily build and manage 
                        their schedules.
                    </p>
                    <br />
                    <p className="techUsed"> 
                        Schedules From Glen was built using the following technology: 
                    </p>
                    <ul className="techUsed">
                        <li>Node</li>
                        <br />
                        <li>Express</li>
                        <br />
                        <li>React</li>
                        <br />
                        <li>Beautiful-DnD</li>
                        <br />
                        <li>SQL</li>
                        <br />
                        <li>Moment.js</li>
                    </ul>
                    <p>Logo made with <a href="https://www.designevo.com/" title="Free Online Logo Maker">DesignEvo</a></p>
                </div>
            </div>
        )
    }
}

export default AboutThisProject;