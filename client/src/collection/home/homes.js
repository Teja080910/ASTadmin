import React from "react";
import "../home/home.css";
import { Menu } from "../menu/menu";
import { Navbars } from "../nav&foot/nav";
import { FiveStreak } from "./fivestreak";
export const Home=()=>
{
    sessionStorage.name='';
    return(
        <>
        <Navbars/>
        <div className="home-container">
        <div className="homename">AST Club App's</div>
        <Menu/>
        <FiveStreak/>
       </div>
        </>
    )
}