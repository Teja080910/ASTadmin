import axios from "axios";
import React, { useEffect, useState } from "react";
import "../home/home.css";
import { Menu } from "../menu/menu.js";
import { Navbars } from "../nav&foot/nav";
import { FiveStreak } from "./fivestreak";
import { StreakGraph } from "./streakgraph.js";
export const Home=()=>
{
    const [dat, sdat] = useState([]);
    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/students")
            .then((result) => {
                sdat((result.data.sort((a, b) => b.Num - a.Num)));
            })
            .catch((e) => console.log(e))
    }, [])
    return(
        <>
        <Navbars/>
        <div className="home-container">
        <div className="homename">AS-TEAM App's</div>
        <Menu/>
        <FiveStreak data={dat}/>
        <StreakGraph totaldata={dat}/>
       </div>
        </>
    )
}