import { Button, SimpleGrid, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbars } from "../nav&foot/nav"
import './attendance.css'
import attendance from "./log.png"
import { Timings } from "./timings"
import yoga from "./yoga.png"
export const Attendance = () => {
    const nav = useNavigate();
    const toast = useToast();
    const [error, setError] = useState(false)
    const Tech = () => {
        window.location.reload(2)
    }
    Timings().then((res) => {
        if (!res?.tech) {
            nav("/tech")
        }
        else if (res?.yoga) {
            nav("/yoga")
        }
        else if (!res?.loc) {
            setError("loc")
        }
        else {
            setError("time")
        }
    }).catch((e) => console.log(e))
    const Yoga = () => {
        window.location.reload(2)
    }
    useEffect(() => {
        error === "time" && toast({ title: "Time out", description: "Please open in correct timings", status: "error", position: "bottom-left", isClosable: true });
        error === "loc" && toast({ title: "Location error", description: "Go to correct location", status: "error", position: "bottom-left", isClosable: true })
    }, [error])
    return (
        <div>
            <Navbars />
            <div className="list">
                <SimpleGrid className="listgrid" spacing={100} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <div>
                        <Button onClick={Tech} style={{ height: "200px", width: "100%", backgroundColor: "white", backgroundImage: `url(${attendance})`, backgroundSize: '200px 200px', border: "none", backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                        <h6>Technology</h6>
                    </div>
                    <div>
                        <Button onClick={Yoga} style={{ height: "200px", width: "100%", backgroundColor: "white", backgroundImage: `url(${yoga})`, backgroundSize: '250px 250px', border: "none", backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                        <h6>Sadhana</h6>
                    </div>
                </SimpleGrid>
            </div>
        </div>
    )
}