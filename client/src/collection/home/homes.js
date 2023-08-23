import React from "react";
import { Navbars } from "../nav&foot/nav";
export const Home=()=>
{
    localStorage.name='';
    return(
        <>
        <Navbars/>
        <div className="homename">Developing Sadhana App</div>
        </>
    )
}