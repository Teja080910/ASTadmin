import axios from "axios";
import { useEffect, useState } from "react";
export const FiveStreak = () => {
    const [dat,sdat]=useState([]);
    useEffect(()=>
    {
        axios.post(process.env.REACT_APP_database+"/students")
        .then((result)=>
        {
            sdat((result.data.sort((a, b) => b.Num- a.Num)));
        })
        .catch((e)=>console.log(e))
    },[])
    return (
        <div>
            <div className="top-5" >Top Five Members In Streaks</div>
            <table className="studetail">
                {
                    dat.slice(0, 5).map((x, index) => (
                        <tr>
                            <td >{index + 1}</td>
                            <td>{x.Reg_No}</td>
                            <td><b>{x.Name}</b></td>
                            <td>{x.Branch}</td>
                            <td>{x.Year}</td>
                            <td>
                                <div style={{ position: "relative" }}>
                                    <img src={"streak.png"} alt="streak"></img>
                                    <div class="streak-text"><b >{(parseInt(x.MrngStreak) + parseInt(x.Num)) / 2}</b></div>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}