import axios from 'axios';
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { TotalMembers } from './totalmembers';
import { PastAttendance } from './pastattendance';
export const Dailattend = () => {
    const queryParams = new URLSearchParams(window.location.search);
    let set = queryParams?.get("total");
    const date = new Date();
    const [data, sdata] = useState([]);
    const [tat, stat] = useState([]);
    const date1 = date.toDateString();
    const [pastwork, spastwork] = useState(false)
    const [pastattend, spastattend] = useState(set?true:false)
    const[total,stotal]=useState(set?true:false)
    const nav=useNavigate()

    const Scrm = async () => {
        window.print();
    };
    const TotalMember=()=>{
        queryParams.set("total", "totallist")
        nav({ search: queryParams.toString()})
    }

    const Pastattendance=()=>{
        queryParams.set("total", "attendancelist")
        nav({ search: queryParams.toString() })
    }

    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/students")
            .then((result) => {
                sdata(result.data.sort((a, b) => a.Year - b.Year));
            }).catch((e)=>console.log(e))

        axios.post(process.env.REACT_APP_database + "/totaldays")
            .then((result) => {
                stat(result.data);
            }).catch((e)=>console.log(e))
    }, []);

    return (
        <>
            <div className="scrum-container">
                <table className="scrumtable">
                    <thead>
                        <tr>
                            {tat.Date === date.toDateString() ?
                                <th colSpan={5}>Attendance Taken by Scrum master: {tat.Scum}</th> :
                                <th colSpan={5}></th>
                            }
                        </tr>
                        <tr>
                            <th>S.No</th>
                            <th>Name(Reg_No)</th>
                            <th>Year</th>
                            <th>Work</th>
                            <th style={{ fontSize: pastwork || "10px", color: pastwork ? "red" : "blue" }}>
                                <button style={{ bottom: "0%" }} onClick={() => spastwork(pastwork ? false : true)}><b>Pastworks</b></button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((x, index) => (
                            x.Login === date.toDateString() && (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{x?.Name.toUpperCase()} {x?.Reg_No.toUpperCase()}</td>
                                    <td>{x?.Year}</td>
                                    <td>
                                        {x.Works &&
                                            <span>
                                                {x.Works[date1]?.map((val, index) => (
                                                    <React.Fragment key={index}>
                                                        <span>{val}</span>
                                                        {index !== x.Works[date1].length - 1 && <span>, </span>}
                                                    </React.Fragment>
                                                ))}
                                            </span>
                                        }
                                        {!x.Works && <span></span>}
                                    </td>
                                    <td>
                                        {x.Works && pastwork && Object.entries(x.Works).map(([key, val]) => (
                                            val.map((work, index) => (
                                                <div>{work}</div>
                                            ))
                                        ))}
                                    </td>

                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
                <div className="form-group-button" style={{ display: "flex", justifyContent: "end", marginBottom: "10px" }}>
                    <button onClick={Scrm}>Print</button>
                </div>
            </div>
            <div style={{width:"100%",height:"10%",display:"flex",justifyContent:"space-evenly",marginBottom:"30px"}} >
                <Button variant='info' onClick={TotalMember} onClickCapture={()=>{stotal(total&&set?false:true)}}>Total Members</Button>
                <Button variant='info' onClick={Pastattendance} onClickCapture={()=>spastattend(pastattend&&set?false:true)}>Past Attendance</Button>
            </div>
            {set==="totallist"&&total&&<TotalMembers data={data} tat={tat}/>}
            {set==="attendancelist"&&pastattend&&<PastAttendance/>}
        </>
    );
};
