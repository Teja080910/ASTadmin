import { Button, SimpleGrid, useToast } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Navbars } from "../nav&foot/nav"
import './attendance.css'
import attendance from "./log.png"
import yoga from "./yoga.png"
export const Attendance = () => {
    const nav = useNavigate();
    const date = new Date();
    const time = new Date().toLocaleTimeString();
    console.log(time)
    const toast=useToast();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords.latitude.toFixed(4));
          console.log(position.coords.longitude);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
   
    const Tech = () => {
        if ((time <= "19:20:00 pm" && time >= "17:00:00 pm") || ("0"+time <= "07:20:00 pm" && "0"+time >= "05:00:00 pm")) {
            nav("/tech")
        }
        else if (date.getDay()===6 && ((time >= "13:20:00 pm" && time <= "17:00:00 pm") || ("0"+time >= "02:20:00 pm" && "0"+time <= "05:00:00 pm"))) {
            nav("/tech")
        }
        else {
            toast({title:"Time out",description:"Please open in correct timings",status:"error",position:"bottom-left", isClosable:true})
            nav("/attendance");
        }
    }
    const Yoga = () => {
        if ((time <= "19:20:00 pm" && time >= "17:00:00 pm") || (time <= "07:20:00 pm" && time >= "05:00:00 pm")) {
            nav("/yoga")
        }
        else if (date.getDay()===1 && ((time <= "19:20:00 pm" && time >= "17:00:00 pm") || (time <= "07:20:00 pm" && time >= "05:00:00 pm"))) {
            nav("/yoga")
        }
        else {
            toast({title:"Time out",description:"Please open in correct timings",status:"error",position:"bottom-left", isClosable:true})
            nav("/attendance");
        }
    }
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