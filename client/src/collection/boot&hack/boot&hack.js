import { Button } from "flowbite-react";
import './boot&hack.css'
export const BootHack=()=>{
    return(
        <div className="hackboot">
            <Button gradientDuoTone="purpleToPink" href="bootcamp">Bootcamp</Button>
            <Button gradientDuoTone="redToYellow" href="hackathon">Hackathon</Button>
        </div>
    )
}