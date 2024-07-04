import { Button, Card, CardBody, Center, SimpleGrid } from "@chakra-ui/react"
import exam from './exam.jpeg'
import "./menu.css"
import team from './team.jpeg'
import teamwork from './teamwork.jpeg'
export const Menu = () => {
    return (
        <div className="menu">
            <div className="menulist" >
                <SimpleGrid className='simplegrid' spacingX={2} spacingY={30} templateColumns='repeat(auto-fill, minmax(200px, 2fr))'>
                    <Button onClick={() => window.open("https://asteam-exam.vercel.app/192.5264.27", "_blank")} style={{ width: "200px", height: "200px", backgroundImage: `url(${exam})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                    <Button onClick={() => window.open("https://asteam-exam.vercel.app/studentscore", "_blank")} style={{ width: "200px", height: "200px", backgroundImage: `url(${team})`, backgroundSize: '200px 240px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>Team</Button>
                    <Button style={{ width: "200px", height: "200px", backgroundImage: `url(${teamwork})`, backgroundSize: '220px 220px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                    {/* <Button onClick={() => window.open("https://asteam-exam.vercel.app/studentscore", "_blank")} style={{ width: "200px", height: "200px", backgroundImage: `url(${team})`, backgroundSize: '200px 240px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></Button> */}
                </SimpleGrid>
            </div>
        </div>
    )
}