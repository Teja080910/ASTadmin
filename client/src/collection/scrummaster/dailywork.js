import axios from 'axios';
import { useState } from 'react';
export const DailyWork = () => {
    const [name, sname] = useState([]);
    const [work, swork] = useState([]);
    const [load, sload] = useState(false)
    const date = new Date();
    const WorkSubmit = async () => {
        sload(true)
        try {
            const responce = await axios.post(process.env.REACT_APP_database + "/student/" + name)
            {
                if (responce.data) {
                    const res = await axios.post(process.env.REACT_APP_database + "/worksubmit/", { name, date: date.toDateString(), work })
                    {
                        if (res) {
                            alert("Sucessfully Submited");
                            sload(false)
                            window.location.reload(2);
                        }
                        else {
                            alert("Try again");
                            sload(false)
                        }
                    }
                }
                else {
                    alert("Gmail Not Found");
                    sload(false)
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <div className="register-container container">
                <div className="register-header">Daily Work Submission</div>
                <div className="form-group">
                    <label>Student Email:</label>
                    <input className="form-control" type="text" id="smn" placeholder="Enter your gmail" onChange={(e) => sname(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Date:</label>   {date.toDateString()}
                </div>
                <div className="form-group">
                    <label>Today Work:</label>
                    <textarea className="form-control" type="text" id="work" placeholder="Enter work with Module names" onChange={(e) => swork(e.target.value)} />
                </div>
                <div className="form-group" style={{ display: "flex", justifyContent: "center" }}>
                    <button className="btn btn-success" onClick={WorkSubmit}>{load ? "Submitting..." : "Submit Work"}</button>
                </div>
            </div>
        </>
    )
}