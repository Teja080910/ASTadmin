import { Input, SimpleGrid } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from 'react';
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend)
export const StreakGraph = ({ studentdata, totaldata }) => {
    const [stustot, setStustot] = useState(0)
    const [stutot, setStutot] = useState()
    const [student, Setstudent] = useState(0)
    const [name,setName]=useState();
    const [select, setSelect] = useState()
    let total = 0;
    useEffect(() => {
        studentdata.forEach(value => {
           try
           {
            if (value.Reg_No === student?.toUpperCase()||value.Reg_No ===student?.toLowerCase()) {
                setStutot((parseInt(value.Num) + parseInt(value.MrngStreak)) / 2)
                setName(value.Name)
                setStustot('')
            }
            if ((value.Reg_No === student?.toUpperCase()||value.Reg_No ===student?.toLowerCase()) && select === "MrngStreak") {
                setStutot(value.MrngStreak)
                setName(value.Name)
                setStustot('')
            }
            if ((value.Reg_No === student?.toUpperCase()||value.Reg_No ===student?.toLowerCase()) && select === "Num") {
                setStutot(value.Num)
                setName(value.Name)
                setStustot('')
            }
        }
            catch {
                total = parseInt(total) + parseInt(value.Num)
                setStustot(total);
                setStutot('')
            }
        });
    },)
    const data = {
        labels: [
            stutot&&!stustot?`${name} attend days`:'Total students attend days',
            'No of days conducted',
        ],
        datasets: [{
            label: 'Attendance',
            data: [stutot ? stutot : stustot / totaldata?.Days, totaldata?.Days],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
            ],
            hoverOffset: 4
        }]
    };


    return (
        <div className="streakdiv">
            <SimpleGrid className="graphdiv" spacingX={40} spacingY={20} templateColumns='repeat(auto-fill, minmax(400px, 2fr))'>
                <div>
                    {<Pie
                        data={data}
                        width={400}
                        height={400}
                        options={{ maintainAspectRatio: false }}
                    />}
                </div>
                <div className="graphinput">
                    <div className="labelinput">
                        <table>
                        <tr>
                            <td>
                                <label for="Technology">Technology:</label>
                            </td>
                            <td>
                                <input id="Technology" name="attendance" type="radio" onChange={() => setSelect("Num")} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label for="Sadhana">Sadhana:</label>
                            </td>
                            <td>
                                <input id="Sadhana" name="attendance" type="radio" onChange={() => setSelect("MrngStreak")} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label for="Both">Both:</label>
                            </td>
                            <td>
                                <input id="Both" name="attendance" type="radio" onChange={() => setSelect("")} />
                            </td>
                        </tr>

                        </table>


                    </div>
                    <div>
                        <h6>Individual Attendance::{name?.toUpperCase()}</h6>
                        <div>
                            <Input type="text" placeholder="Enter your Register Number" onChange={(e) => Setstudent(e.target.value)} />
                        </div>
                    </div>
                </div>
            </SimpleGrid>
        </div>

    );
};
