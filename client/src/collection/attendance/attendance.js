import { Button, SimpleGrid, position, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbars } from "../nav&foot/nav"
import './attendance.css'
import attendance from "./log.png"
import yoga from "./yoga.png"
export const Attendance = () => {
    const nav = useNavigate();
    const date = new Date();
    const time = new Date().toLocaleTimeString();
    const [latitude,setLatitude]=useState()
    const [longitude,setLongitude]=useState()
    // console.log(time)
    const toast=useToast();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude.toFixed(2));
          setLongitude(position.coords.longitude.toFixed(2));
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    //   console.log(latitude,longitude)
    const Tech = () => {
        if (((time <= "19:20:00 pm" && time >= "17:00:00 pm") || ("0"+time <= "07:20:00 pm" && "0"+time >= "05:00:00 pm"))) {
            if((latitude==="16.54" && longitude==="81.50")||(latitude==="16.55" && longitude==="81.51")||(latitude==="16.53" && longitude==="81.49"))
            {
                nav("/tech")
            }
            else
            {
                toast({title:"Location error",description:"Goto correct location",status:"error",position:"bottom-left", isClosable:true})
            }
        }
        else if (date.getDay()===6 && ((time >= "13:20:00 pm" && time <= "17:00:00 pm") || ("0"+time >= "02:20:00 pm" && "0"+time <= "05:00:00 pm"))) {
            if((latitude==="16.54" && longitude==="81.50")||(latitude==="16.55" && longitude==="81.51")||(latitude==="16.53" && longitude==="81.49"))
            {
                nav("/tech")
            }
            else
            {
                toast({title:"Location error",description:"Goto correct location",status:"error",position:"bottom-left", isClosable:true})
            }
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