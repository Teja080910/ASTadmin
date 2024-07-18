import { Box, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Actions } from "../../actions/actions";
import { CodesCard } from "./codescard";
import './hackscore.css';
import { Teams } from "./teams";

export const HackathonTeam = () => {
    const [dat, setDat] = useState([]);

    const fetchData = async () => {
        await Actions.TeamsCodes()
            .then((res) => setDat(res?.data))
            .catch((e) => console.log(e))
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Teams data={dat} refresh={() => fetchData()} />
            <CodesCard />
        </>
    );
};
