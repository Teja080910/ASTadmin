import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import './boot&hack.css';

export const BootHack = () => {
    const nav = useNavigate();
    return (
        <Box className="hackboot">
            <Box className="hackboot-card" onClick={() => nav('/bootcamp')}>
                <Box className="hackboot-icon">🏕️</Box>
                <Text className="hackboot-label">Bootcamp</Text>
                <Text className="hackboot-desc">Training & Tasks</Text>
            </Box>
            <Box className="hackboot-card" onClick={() => nav('/hackathon')}>
                <Box className="hackboot-icon">🏆</Box>
                <Text className="hackboot-label">Hackathon</Text>
                <Text className="hackboot-desc">Events & Scoring</Text>
            </Box>
        </Box>
    )
}
