import { Box, Input, SimpleGrid } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from 'react';
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const StreakGraph = ({ studentdata, totaldata }) => {
    const [stustot, setStustot] = useState(0);
    const [stutot, setStutot] = useState();
    const [student, Setstudent] = useState(0);
    const [name, setName] = useState();
    const [select, setSelect] = useState();
    let total = 0;

    useEffect(() => {
        studentdata.forEach(value => {
            try {
                if (value.Reg_No.toUpperCase() === student.toUpperCase()) {
                    setStutot((parseInt(value.Num) + parseInt(value.MrngStreak)) / 2);
                    setName(value.Name);
                    setStustot('');
                }
                if (value.Reg_No.toUpperCase() === student.toUpperCase() && select === "MrngStreak") {
                    setStutot(value.MrngStreak);
                    setName(value.Name);
                    setStustot('');
                }
                if (value.Reg_No.toUpperCase() === student.toUpperCase() && select === "Num") {
                    setStutot(value.Num);
                    setName(value.Name);
                    setStustot('');
                }
            } catch {
                total += parseInt(value.Num);
                setStustot(total);
                setStutot('');
            }
        });
    }, [student, select, studentdata]);

    const data = {
        labels: [
            stutot && !stustot ? `${name} attend days` : 'Total students attend days',
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
        <Box className="streakdiv" p={4}>
            <SimpleGrid className="graphdiv" spacing={{ base: 4, md: 10 }} columns={{ base: 1, md: 2 }}>
                <Box>
                    <Pie
                        data={data}
                        width={360}
                        height={360}
                        options={{ maintainAspectRatio: false }}
                    />
                </Box>
                <Box className="graphinput">
                    <Box className="labelinput" mb={4}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="Technology">Technology:</label>
                                    </td>
                                    <td>
                                        <input id="Technology" name="attendance" type="radio" onChange={() => setSelect("Num")} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="Sadhana">Sadhana:</label>
                                    </td>
                                    <td>
                                        <input id="Sadhana" name="attendance" type="radio" onChange={() => setSelect("MrngStreak")} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="Both">Both:</label>
                                    </td>
                                    <td>
                                        <input id="Both" name="attendance" type="radio" onChange={() => setSelect("")} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                    <Box>
                        <h6>Individual Attendance::{name?.toUpperCase()}</h6>
                        <Input type="text" placeholder="Enter your Register Number" onChange={(e) => Setstudent(e.target.value)} />
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    );
};
