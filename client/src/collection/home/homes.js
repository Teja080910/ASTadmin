import React from "react";
import { Navbars } from "../nav&foot/nav";
export const Home=()=>
{
    localStorage.name='';
    return(
        <>
        <Navbars/>
        <div className="homename">
            Devloping Sadhana App
        </div>
        </>
    )
}