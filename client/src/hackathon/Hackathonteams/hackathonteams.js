import { Box, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CodesCard } from "./codescard";
import './hackscore.css'
import { Teams } from "./teams";
import { Actions } from "../../actions/actions";

export const HackathonTeam = () => {
    const [dat, setDat] = useState([]);
    const [select, setSelect] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const toast = useToast();

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
