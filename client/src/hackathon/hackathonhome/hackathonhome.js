import React from 'react';
import './hackathonhome.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export const HackathonHome = () => {
    const nav = useNavigate();

    const FeedbackForm = () => {
        nav('/hackathon/feedbackform');
    };

    const materials = ['React', 'Css', 'Js', 'HTML', 'NODE'];

    return (
        <>
            <div>
                <div className="materials-sections">
                    <Button onClick={FeedbackForm} className='button-shake hover hvr-buzz-out' >FeedbackForm</Button>
                    <h2 style={{ color: "gray",marginLeft:'37%' }}>Most used Materials</h2>
                    <div className="cards-containers">
                        {materials.map((material, index) => (
                            <Card className='card-style'style={{ width: '18rem' }} key={index}>
                                <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/like.png`} alt={material} />
                                <Card.Body>
                                    <Card.Title>{material}</Card.Title>
                                    <Card.Text>
                                    </Card.Text>
                                    <Button className='hover hvr-buzz-out card-color' variant="primary">View</Button>
                                    <Button style={{ marginLeft: '2%'}} className='hover hvr-buzz-out card-color' variant="primary">Download</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
