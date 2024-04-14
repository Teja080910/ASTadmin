import React from "react";
import { useNavigate } from "react-router-dom";
import "../cerdentials/signup.css";
import { Navbars } from "../nav&foot/nav";
import "../scrummaster/scrum.css";
import { Dailattend } from "./dailyattend";
import { DailyWork } from "./dailywork";
import { UpdateData } from "./updatedata";
export const Scrum = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const nav = useNavigate()
    let set = queryParams?.get("scrum");
    const Dailyatten = () => {
        queryParams.set("scrum", "attendance")
        nav({ search: queryParams.toString() })
    }
    const Dailyworks = () => {
        queryParams.set("scrum", "dailywork")
        nav({ search: queryParams.toString() })
    }
    const Updatedata = () => {
        queryParams.set("scrum", "upadtedata")
        nav({ search: queryParams.toString() })
    }
    return (
        <>
            <Navbars />
            <div className="form-group" style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
                <button onClick={Dailyatten} >Daily Attendance</button>
                <button onClick={Updatedata}>Update Data</button>
                <button onClick={Dailyworks}>Daily Work Submission</button>
            </div>
            {
                set === "attendance" && <Dailattend/>
            }
            {
                set === "dailywork" && <DailyWork/>
            }
            {
                set === "upadtedata" && <UpdateData/>
            }

        </>

    )
}