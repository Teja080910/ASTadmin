import { Button, SimpleGrid, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Navbars } from "../nav&foot/nav";
import './attendance.css';
import attendance from "./log.png";
import { Timings } from "./timings";
import yoga from "./yoga.png";

export const Attendance = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkTimingsAndLocation = async () => {
            try {
                const res = await Timings();
                if (res?.loc) {
                    if(res?.tech && res?.yoga)
                    {
                        window.location.reload();
                    }
                     else if (res?.tech) {
                        navigate("/tech");
                    } else if (res?.yoga) {
                        navigate("/yoga");
                    } else {
                        setError("time");
                    }
                } else {
                    setError("loc");
                }
            } catch (e) {
                console.error(e);
                setError("geo");
            }
        };
        checkTimingsAndLocation();
    }, [navigate]);

    useEffect(() => {
        if (error === "time") {
            toast({ title: "Time out", description: "Please open in correct timings", status: "error", position: "bottom-left", isClosable: true });
        } else if (error === "loc") {
            toast({ title: "Location error", description: "Go to the correct location", status: "error", position: "bottom-left", isClosable: true });
        } else if (error === "geo") {
            toast({ title: "Geolocation error", description: "Geolocation is not supported by this browser or permission denied", status: "error", position: "bottom-left", isClosable: true });
        }
    }, [error, toast]);

    return (
        <div>
            <Navbars />
            <div className="list">
                <SimpleGrid className="listgrid" spacing={{base:"20px",md:"100px"}} templateColumns={{base:"repeat(auto-fill, minmax(200px, 1fr))",md:"repeat(auto-fill, minmax(200px, 1fr))",lg:"repeat(auto-fill, minmax(250px, 1fr))"}}>
                    <div onClick={()=>navigate("/tech")}>
                        <Button style={{ height: "200px", width: "100%", backgroundColor: "white", backgroundImage: `url(${attendance})`, backgroundSize: '200px 200px', border: "none", backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                        <h6>Technology</h6>
                    </div>
                    <div onClick={()=>navigate("/yoga")}>
                        <Button style={{ height: "200px", width: "100%", backgroundColor: "white", backgroundImage: `url(${yoga})`, backgroundSize: '250px 250px', border: "none", backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                        <h6>Sadhana</h6>
                    </div>
                </SimpleGrid>
            </div>
        </div>
    );
};
