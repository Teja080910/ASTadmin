import React, { useState } from "react";
export const TotalMembers = (data,tat) => {
    console.log(data.data)
    console.log(tat)
    const date = new Date();
    const date1 = date.toDateString();
    const [pastwork, spastwork] = useState(false)
    const Scrm = async () => {
        window.print();
    };
    return (
        <div className="scrum-container">
            <table className="scrumtable">
                <thead>
                    <tr>
                        {tat?.Date === date.toDateString()&&
                            <th colSpan={5}>Attendance Taken by Scrum master: {tat.Scum}</th>
                        }
                        <th colSpan={5}>{tat?.tat?.Days}</th>
                    </tr>
                    <tr>
                        <th>S.No</th>
                        <th>Name(Reg_No)</th>
                        <th>Year</th>
                        <th>Tech,Yoga</th>
                        <th style={{ fontSize: pastwork || "10px", color: pastwork ? "red" : "blue" }}>
                            <button style={{ bottom: "0%" }} onClick={() => spastwork(pastwork ? false : true)}><b>Works</b></button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((x, index) => (
                       (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{x?.Name.toUpperCase()} {x?.Reg_No.toUpperCase()}</td>
                                <td>{x?.Year}</td>
                                <td>{x?.Num},{x?.MrngStreak}</td>
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
    )
}