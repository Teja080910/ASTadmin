import React from "react";
export const Nav=()=>
{
    return(
        <>
        <div className="display">
        <h1>MERN</h1>
        <h1 className="center">ATTENDANCE</h1>
        <Link to='/register' className="signup">Register</Link>
        </div>
        <div className="display1">
            <Link to='/addproject' className="display1item">Add Project</Link>
            <Link to='/projects' className="display1item" style={{marginRight:'11%'}}>Projects</Link>
        </div>
        <br/>
        </>
    )
}