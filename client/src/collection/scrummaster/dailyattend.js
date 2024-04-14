import { useState,useEffect } from "react";
import axios from 'axios'
export const Dailattend = () => {
    const date = new Date();
    const [data, sdata] = useState([]);
    const [tat, stat] = useState([]);
    const date1 = date.toDateString()
    const Scrm = async () => {
        window.print();
    }
    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/students")
            .then((result) => {
                sdata(result.data.sort((a, b) => a.Year - b.Year));
            })
        axios.post(process.env.REACT_APP_database + "/totaldays")
            .then((result) => {
                stat(result.data)
            })
    }, [])
    return (
        <>
            <div className="scrum-container">

                <table className="scrumtable">
                    <tr>

                        {
                            tat.Date === date.toDateString() ? <th colSpan={5}><>Attendace Taken by Scrum master:: {tat.Scum}</></th> : <b></b>}
                    </tr>
                    <tr>
                        <th>S.No</th>
                        <th>Name(Reg_No)</th>
                        <th>Year</th>
                        <th >Work</th>
                    </tr>
                    {
                        data.map((x, index) =>
                        (
                            x.Login === date.toDateString() &&
                            <>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{x?.Name.toUpperCase() + " " + x?.Reg_No.toUpperCase()}</td>
                                    <td>{x?.Year}</td>
                                    {
                                        x.Works &&
                                        <td >
                                            {x.Works[date1]?.map((val) =>
                                            (
                                                <p>{val}</p>
                                            ))}
                                        </td>
                                    }
                                </tr>
                            </>
                        ))
                    }
                </table>
                <div className="form-group-button" style={{ display: "flex", justifyContent: "end", marginBottom: "10px" }}>
                    <button onClick={Scrm}>Print</button>

                </div>
            </div>
        </>
    )
}