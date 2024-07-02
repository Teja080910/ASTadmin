import { useState } from "react";
export const Timings = async () => {
    const date = new Date();
    const time = new Date().toLocaleTimeString();
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude.toFixed(2));
            setLongitude(position.coords.longitude.toFixed(2));
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
    if (((time <= "19:50:00 pm" && time >= "17:00:00 pm") || ( time <= "7:50:00 pm" &&  time >= "5:00:00 pm"))) {
        if ((latitude === "16.54" && longitude === "81.50") || (latitude === "16.55" && longitude === "81.51") || (latitude === "16.53" && longitude === "81.49")) {
            return { tech: true }
        }
        else {
            return {loc:true}
        }
    }
    else if (date.getDay() === 6 && ((time >= "13:30:00 pm" && time <= "17:00:00 pm") || (time >= "1:30:00 pm" && time <= "5:00:00 pm"))) {
        if ((latitude === "16.54" && longitude === "81.50") || (latitude === "16.55" && longitude === "81.51") || (latitude === "16.53" && longitude === "81.49")) {
            return { tech: true }
        }
        else {
            return {loc:true}
        }
    }
    else if (time <= "08:20:00 am" && time >= "05:00:00 am") {
        return { yoga: true }
    }
    else if (date.getDay() === 0 && (time <= "09:20:00 am" && time >= "05:00:00 am")) {
        return { yoga: true }
    }
    else {
        return false
    }
}