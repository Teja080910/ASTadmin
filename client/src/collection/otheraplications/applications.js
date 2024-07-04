import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import CardSlider from './CardSlider';
import CertificateImage from './graduation.png';
import ChatAppImage from './chat-app.png';
import NoteImage from './note.png';
import "./application.css"

export const Applications = () => {
    const cards = [
        {
            id: 1,
            backgroundImage: CertificateImage,
            label: "AST Certificates",
            link: "https://ast-certificates.vercel.app/"
        },
        {
            id: 2,
            backgroundImage: ChatAppImage,
            label: "Chat With Me",
            link: "chatwithme"
        },
        {
            id: 3,
            backgroundImage: NoteImage,
            label: "Note Group",
            link: "https://notegroup.vercel.app/"
        },
        // Add more cards as needed
    ];

    return (
        <Box className='appcontainer' p={8} border="1px solid #ccc" borderRadius="lg" boxShadow="lg">
            <Heading textAlign="center" mb={4} color="#8a2be2">Other Applications By AST TEAM</Heading>
            <CardSlider cards={cards}/>
        </Box>
    );
};
