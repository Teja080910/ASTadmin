import { useEffect, useState } from "react"
import './bootcamphome.css'
import { Modules } from "./modules"
export const BootcampHome = () => {
    const [attendance, setAttendance] = useState()
    const [score, setScore] = useState()
    const [overall, setOverall] = useState()
    const Overall = async () => {
        const attendData = await Modules.Attendance()
        setAttendance(attendData)
        const scoreData = await Modules.Score()
        setScore(scoreData)
        const overallData = await Modules.Overall()
        setOverall(overallData)
    }
    useEffect(() => {
        Overall()
    }, [])
    return (
        <>
            <div className="home-container">
                <h1 className="animate__animated animate__swing">Top Three Members</h1>
                <div className="grid">
                    <div className="member-card large animate__animated animate__jello">
                        <h3>Overall</h3>
                        {
                            overall?.slice(0, 9)?.map((student) => (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h4 style={{ fontFamily: '-moz-initial' }}>{student?.Name?.toUpperCase()}</h4>
                                    <h4 style={{ fontFamily: '-moz-initial' }}>{student?.Total}</h4>
                                </div>
                            ))
                        }
                    </div>

                    <div className="member-card animate__animated animate__jello">
                        <h3>Highest Attendance</h3>
                        {
                            attendance?.slice(0, 3)?.map((student) => (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h4 style={{ fontFamily: '-moz-initial' }}>{student?.Name?.toUpperCase()}</h4>
                                    <h4 style={{ fontFamily: '-moz-initial' }}>{student?.AttendDays}</h4>
                                </div>
                            ))
                        }

                    </div>
                    <div className="member-card animate__animated animate__jello">
                        <h3>Highest Score</h3>
                        {
                            score?.slice(0, 3)?.map((student) => (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h4 style={{ fontFamily: '-moz-initial' }}>{student?.Name?.toUpperCase()}</h4>
                                    <h4 style={{ fontFamily: '-moz-initial' }}>{student?.Marks}</h4>
                                </div>
                            ))
                        }

                    </div>
                    <div className="member-card animate__animated animate__jello">
                        <h3>Activities</h3>
                        <h5 style={{ fontFamily: '-moz-initial' }}>Name - </h5>
                    </div>
                    <div className="member-card animate__animated animate__jello">
                        <h3>Internal Marks</h3>
                        <h5 style={{ fontFamily: '-moz-initial' }}>Name - </h5>
                    </div>
                </div>
            </div>
        </>
    )
}

