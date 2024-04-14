import axios from 'axios';
import { useEffect, useState } from 'react';
export const UpdateData = () => {
    const [data, sdata] = useState([]);
    const [name, sname] = useState();
    const [year, syear] = useState()
    const [load, sload] = useState(false);
    const Update = async () => {
        sload(true)
        axios.post(process.env.REACT_APP_database + "/updatestudent/" + name + "/" + year)
            .then((res) => {
                if (res.data) {
                    sload(false)
                    window.location.reload(2)
                }
                else {
                    sload(false)
                }
            })
            .catch((e) => console.log(e))
    }
    useEffect(() => {
        name &&
            axios.post(process.env.REACT_APP_database + "/student/" + name)
                .then((res) => {
                    sdata(res.data)
                })
                .catch((e) => console.log(e))
    }, [name])
    return (
        <>
            <div className="register-container container">
                <div className="register-header">Update Your Data</div>
                <div className="form-group">
                    <label>Student Email:</label>
                    <input className="form-control" type="text" id="smn" placeholder="Enter your gmail" onChange={(e) => sname(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Name: {data?.Name?.toUpperCase()}</label>
                </div>
                <div className="form-group">
                    <label>Register Number: {data?.Reg_No?.toUpperCase()}</label>
                </div>
                <div className="form-group">
                    <label>Year: {data?.Year}</label>
                </div>
                <div className="form-group">
                    <div style={{ display: "flex", justifyContent: "space-evenly" }} >
                        <label htmlFor="year">Select Year:</label>
                        <input
                            type="radio"
                            id="1st"
                            name="year"
                            value="1"
                            checked={year === '1'}
                            onChange={() => syear('1')}
                        />
                        <label htmlFor="1st">1st</label>
                        <input
                            type="radio"
                            id="2nd"
                            name="year"
                            value="2"
                            checked={year === '2'}
                            onChange={() => syear('2')}
                        />
                        <label htmlFor="2nd">2nd</label>
                        <input
                            type="radio"
                            id="3rd"
                            name="year"
                            value="3"
                            checked={year === '3'}
                            onChange={() => syear('3')}
                        />
                        <label htmlFor="3rd">3rd</label>
                        <input
                            type="radio"
                            id="4th"
                            name="year"
                            value="4"
                            checked={year === '4'}
                            onChange={() => syear('4')}
                        />
                        <label htmlFor="4th">4th</label>
                    </div>
                </div>
                <div className="form-group" style={{ display: "flex", justifyContent: "center" }}>
                    <button className="btn btn-success" onClick={Update}>{load ? "Updatting..." : "Update"}</button>
                </div>
            </div>
        </>
    )
}
