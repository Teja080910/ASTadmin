import { Box, Button, Text } from "@chakra-ui/react";
import './boot&hack.css';

export const BootHack = () => {
    return (
        <Box className="hackboot">
            <Box className="hackboot-card" onClick={() => window.location.href = 'bootcamp'}>
                <Box className="hackboot-icon">🏕️</Box>
                <Text className="hackboot-label">Bootcamp</Text>
                <Text className="hackboot-desc">Training & Tasks</Text>
            </Box>
            <Box className="hackboot-card" onClick={() => window.location.href = 'hackathon'}>
                <Box className="hackboot-icon">🏆</Box>
                <Text className="hackboot-label">Hackathon</Text>
                <Text className="hackboot-desc">Events & Scoring</Text>
            </Box>
        </Box>
    )
}
