import { Box, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Actions } from "../../actions/actions";
import { CodesCard } from "./codescard";
import './hackscore.css';
import { Teams } from "./teams";

export const HackathonTeam = () => {
    const [dat, setDat] = useState([]);
    const [select, setSelect] = useState("");

    const fetchData = async () => {
        await Actions.TeamsCodes()
        .then((res)=>setDat(res?.data))
        .catch((e)=>console.log(e))
    };

    useEffect(() => {
        fetchData();
    }, []);

 

    return (
        <>
            <Box display="flex" justifyContent="center" mb={6}>
                <Input id="search" value={select} placeholder="Enter Team Number (e.g., team1)" onChange={(e) => setSelect(e.target.value)} width="70%" />
            </Box>

            <Teams data={dat} refresh={()=>fetchData()}/>

            <CodesCard />
        </>
    );
};
