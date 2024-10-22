import axios from "axios";
import React, { useEffect, useState } from "react";
import "../home/home.css";
import { Menu } from "../menu/menu.js";
import { Navbars } from "../nav&foot/nav";
import { FiveStreak } from "./fivestreak";
import { StreakGraph } from "./streakgraph.js";
import { Applications } from "../otheraplications/applications.js";
import { BootHack } from "../boot&hack/boot&hack.js";
export const Home = () => {
    const [dat, sdat] = useState([]);
    const [tat, stat] = useState([]);
    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/students")
        .then((result) => {
            sdat((result.data.sort((a, b) => b.Num - a.Num)));
        })
        .catch((e) => console.log(e))
        axios.post(process.env.REACT_APP_database + "/totaldays")
            .then((result) => {
                stat(result.data)
            })
            .catch((e)=>console.log(e))
    }, [])
    return (
        <>
            <Navbars />
            <div className="home-container">
                <div className="homename">AST Admin</div>
                <Menu />
                <FiveStreak data={dat}/>
                <StreakGraph studentdata={dat} totaldata={tat} />
            </div>
            <div className="boothack">
                <BootHack/>
            </div>
            <div className="applications">
            <Applications/>
            </div>
        </>
    )
}