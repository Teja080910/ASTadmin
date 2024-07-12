import { Button, SimpleGrid } from "@chakra-ui/react"
import exam from './exam.jpeg'
import "./menu.css"
import team from './team.jpeg'
import teamwork from './teamwork.jpeg'
import console from './console.png'
export const Menu = () => {
    return (
        <div className="menu">
            <div className="menulist" >
                <SimpleGrid className='simplegrid' spacingX={2} spacingY={30} templateColumns='repeat(auto-fill, minmax(200px, 2fr))'>
                    <figure style={{ width: "200px", height: "200px",fontWeight:'bold' }}>
                        <Button onClick={() => window.open("https://asthack.me/exam/192.5264.27", "_blank")} style={{ width: "200px", height: "200px", backgroundImage: `url(${exam})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                        <figcaption style={{ textAlign: 'center' }}>Exam</figcaption>
                    </figure>
                    <figure style={{ width: "200px", height: "200px",fontWeight:'bold' }}>
                        <Button onClick={() => window.open("https://asthack.me/exam/studentscore", "_blank")} style={{ width: "200px", height: "200px", backgroundImage: `url(${team})`, backgroundSize: '200px 240px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>Team</Button>
                        <figcaption style={{ textAlign: 'center' }}>Team Members</figcaption>
                    </figure>
                    <figure style={{ width: "200px", height: "200px",fontWeight:'bold' }}>
                        <Button onClick={() => window.open("https://asthack.me/exam/teamwork", "_blank")} style={{ width: "200px", height: "200px", backgroundImage: `url(${teamwork})`, backgroundSize: '220px 220px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                        <figcaption style={{ textAlign: 'center' }}>Team Work</figcaption>
                    </figure>
                    <figure style={{ width: "200px", height: "200px",fontWeight:'bold' }}>
                        <Button onClick={() => {}} style={{ backgroundColor: 'white', width: "200px", height: "200px", backgroundImage: `url(${console})`, backgroundSize: '200px 200px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></Button>
                        <figcaption style={{ textAlign: 'center' }}>AST console</figcaption>
                    </figure>
                </SimpleGrid>
            </div>
        </div>
    )
}