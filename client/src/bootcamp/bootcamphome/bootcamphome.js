import { BootcampSidebar } from "../bootcampsidebar/bootcampsidebar"
import './bootcamphome.css'
export const BootcampHome=()=>{
    return(
        <>
        <div className="home-container">
            <h1 className="animate__animated animate__swing">Top Three Members</h1>
            <div className="grid">
                <div className="member-card large animate__animated animate__jello">
                    <h3>Overall</h3>
                    <h5 style={{fontFamily:'-moz-initial'}}>Name - </h5>
                </div>
                <div className="member-card animate__animated animate__jello">
                    <h3>Highest Attendance</h3>
                    <h5 style={{fontFamily:'-moz-initial'}}>Name - </h5>

                </div>
                <div className="member-card animate__animated animate__jello">
                    <h3>Highest Score</h3>
                    <h5 style={{fontFamily:'-moz-initial'}}>Name - </h5>

                </div>
                <div className="member-card animate__animated animate__jello">
                    <h3>Activities</h3>
                    <h5 style={{fontFamily:'-moz-initial'}}>Name - </h5>

                </div>
                <div className="member-card animate__animated animate__jello">
                    <h3>Internal Marks</h3>
                    <h5 style={{fontFamily:'-moz-initial'}}>Name - </h5>

                </div>
        </div>
        </div>
        </>
    )
}

