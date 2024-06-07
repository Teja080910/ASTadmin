import { Button } from "flowbite-react";
import './boot&hack.css'
export const BootHack=()=>{
    return(
        <div className="hackboot">
            <Button gradientDuoTone="purpleToPink">Bootcamp</Button>
            <Button gradientDuoTone="redToYellow">Hackathon</Button>
        </div>
    )
}