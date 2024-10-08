import axios from 'axios';
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
export const UpdateData = () => {
    const [data, sdata] = useState([]);
    const [gmail,sgmail]=useState()
    const [name, sname] = useState();
    const [year, syear] = useState()
    const [load, sload] = useState(false);
    const toast=useToast()
    const Update = async () => {
        sload(true)
        axios.post(process.env.REACT_APP_database + "/updatestudent/" +gmail+"/"+ name + "/" + year)
            .then((res) => {
                if (res.data) {
                    sload(false)
                    toast({title:"Update sucessfully",status:"success",position:"bottom-right", isClosable:true})
                    setTimeout(() => {
                        window.location.reload(2)
                    }, 1000);
                }
                else {
                    sload(false)
                    toast({title:"Try again",status:"error",position:"bottom-left", isClosable:true})
                }
            })
            .catch((e) => console.log(e))
    }
    useEffect(() => {
        gmail &&
            axios.post(process.env.REACT_APP_database + "/student/" +gmail)
                .then((res) => {
                    sdata(res.data)
                    sname(res?.data?.Name)
                    syear(res?.data?.Year)
                })
                .catch((e) => console.log(e))
    }, [gmail])
    return (
        <>
            <div className="register-container container">
                <div className="register-header">Update Your Data</div>
                <div className="form-group">
                    <label>Student Email:</label>
                    <input className="form-control" type="text" id="smn" placeholder="Enter your gmail" onChange={(e) => sgmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Name: <input className="form-control" type="text" value={name || data?.Name?.toUpperCase()} placeholder="Enter your name" onChange={(e) => sname(e.target.value.toUpperCase())}/></label>
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
