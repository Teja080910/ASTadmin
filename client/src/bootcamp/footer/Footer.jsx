import React from "react";
import {
    Box,
    FooterContainer,
    Row,
    Column,
    FooterLink,
    Heading,
} from "./styles";

const footerData = {
    "About Us": [
        { name: "Aim", href: "#" },
        { name: "Vision", href: "#" },
        { name: "Testimonials", href: "#" },
    ],
    Services: [
        { name: "Writing", href: "#" },
        { name: "Internships", href: "#" },
        { name: "Coding", href: "#" },
        { name: "Teaching", href: "#" },
    ],
    "Contact Us": [
        { name: "Uttar Pradesh", href: "#" },
        { name: "Ahemdabad", href: "#" },
        { name: "Indore", href: "#" },
        { name: "Mumbai", href: "#" },
    ],
    "Social Media": [
        { name: "Facebook", icon: "fab fa-facebook-f", href: "#" },
        { name: "Instagram", icon: "fab fa-instagram", href: "#" },
        { name: "Twitter", icon: "fab fa-twitter", href: "#" },
        { name: "Youtube", icon: "fab fa-youtube", href: "#" },
    ],
};


const Footer = () => {
    return (
        <Box>
            <h1
                style={{
                    color: "black",
                    marginBottom:"35px",
                    textAlign: "center",
                    fontSize:"22px",
                    textDecoration: "underline"
                }}
            >
                ARKHA SODHARA TECH TEAM ADMIN
            </h1>
            <FooterContainer>
                <Row>
                    {Object.entries(footerData).map(([heading, links], index) => (
                        <Column key={index}>
                            <Heading>{heading}</Heading>
                            {links.map((link, linkIndex) =>
                                typeof link === "string" ? (
                                    <FooterLink href="#" key={linkIndex}>
                                        {link}
                                    </FooterLink>
                                ) : (
                                    <FooterLink href={link.href} key={linkIndex}>
                                        <i className={link.icon}>
                                            <span style={{ marginLeft: "10px" }}>
                                                {link.name}
                                            </span>
                                        </i>
                                    </FooterLink>
                                )
                            )}
                        </Column>
                    ))}
                </Row>
            </FooterContainer>
        </Box>
    );
};

export default Footer;
