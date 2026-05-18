import { Box, SimpleGrid, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import exam from './exam.jpeg'
import "./menu.css"
import team from './team.jpeg'
import teamwork from './teamwork.jpeg'
import console from './console.png'

const menuItem = {
  background: 'white',
  borderRadius: '16px',
  border: '1px solid',
  borderColor: 'surface.100',
  boxShadow: 'card',
  transition: 'all 0.25s ease',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
}

export const Menu = () => {
  const nav = useNavigate()
  const items = [
    { img: exam, label: 'Exam', link: 'https://asthack.me/exam/192.5264.27', external: true },
    { img: team, label: 'Team Members', link: 'https://asthack.me/exam/studentscore', external: true },
    { img: teamwork, label: 'Team Work', link: 'https://asthack.me/exam/teamwork', external: true },
    { img: console, label: 'AST Console', link: '/console', external: false },
  ]
  return (
    <Box className="menu">
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} maxW="900px" w="100%">
        {items.map((item, i) => (
          <Box
            key={i}
            sx={menuItem}
            onClick={() => item.external ? window.open(item.link, '_blank') : nav(item.link)}
            _hover={{ transform: 'translateY(-4px)', boxShadow: 'elevated', borderColor: 'brand.200' }}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <Box p={4}>
              <Box
                w="100%"
                h="140px"
                borderRadius="lg"
                backgroundImage={`url(${item.img})`}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
              />
              <Text fontWeight={600} fontSize="sm" color="surface.700" textAlign="center" mt={3}>
                {item.label}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
