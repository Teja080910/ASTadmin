import axios from "axios";
import React, { useEffect, useState } from "react";
import "../home/home.css";
import { Menu } from "../menu/menu.js";
import { Navbars } from "../nav&foot/nav";
import { FiveStreak } from "./fivestreak";
import { StreakGraph } from "./streakgraph.js";
import { Applications } from "../otheraplications/applications.js";
import { BootHack } from "../boot&hack/boot&hack.js";
import { Box, Heading, Text, Container, Spinner, VStack } from "@chakra-ui/react";

export const Home = () => {
    const [dat, sdat] = useState([]);
    const [tat, stat] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.post(process.env.REACT_APP_database + "/students")
        .then((result) => {
            sdat((result.data.sort((a, b) => b.Num - a.Num)));
        })
        .catch((e) => console.log(e))
        axios.post(process.env.REACT_APP_database + "/totaldays")
            .then((result) => {
                stat(result.data)
            })
            .catch((e)=>console.log(e))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <>
                <Navbars />
                <VStack justify="center" h="60vh">
                    <Spinner size="xl" color="brand.500" thickness="3px" />
                    <Text color="surface.400" fontSize="sm">Loading...</Text>
                </VStack>
            </>
        )
    }

    return (
        <>
            <Navbars />
            <Box className="home-container" as="section">
                <Text className="homename">AST Admin</Text>
                <Text className="homename-sub">ARKHA SODHARA TECH — SRKR CSE Department</Text>
                <Menu />
                <Box mt={10}>
                    <Heading as="h2" size="lg" textAlign="center" color="brand.600" mb={6} fontWeight={700}>
                        Leaderboard
                    </Heading>
                    <FiveStreak data={dat}/>
                </Box>
                <Box mt={10}>
                    <StreakGraph studentdata={dat} totaldata={tat} />
                </Box>
            </Box>
            <Box className="applications" mb={4}>
                <BootHack/>
            </Box>
            <Box className="applications" pb={10}>
                <Applications/>
            </Box>
        </>
    )
}
