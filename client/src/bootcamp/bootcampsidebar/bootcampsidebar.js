import AssignmentIcon from '@mui/icons-material/Assignment';
import AttendanceIcon from '@mui/icons-material/EventAvailable';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ScoreIcon from '@mui/icons-material/Score';
import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { BootAttendance } from '../attendance/attendance';
import './bootcampsidebar.css';
import { BootcampHome } from '../bootcamphome/bootcamphome';
import { BootcampMaterial } from '../materials/uploadmaterials';
import { BootcampTeam } from '../bootcampteams/bootcampteams';
import { BootcampScore } from '../scoremanager/bootcampscore';
import BootcampTasks from '../taskmanger/bootcamptaskmager';
import CodeIcon from '@mui/icons-material/Code';
const SidebarContent = ({ collapsed, toggleSidebar, select }) => (
    <Sidebar collapsed={collapsed} id='sidebar'>
        <Menu>
            <MenuItem
                icon={<MenuOutlinedIcon />}
                onClick={toggleSidebar}
                style={{ textAlign: 'center' }}
            >
                <h2>Bootcamp</h2>
            </MenuItem>
            <MenuItem icon={<HomeOutlinedIcon />} onClick={() => window.location.href='/'}>Home</MenuItem>
            <MenuItem icon={<PeopleOutlinedIcon />} onClick={() => select(2)}>Team</MenuItem>
            <MenuItem icon={<AttendanceIcon />} onClick={() => select(3)}>Attendance</MenuItem>
            <MenuItem icon={<LibraryBooksIcon />} onClick={() => select(4)}>Materials</MenuItem>
            <MenuItem icon={<ScoreIcon />} onClick={() => select(5)}>Score</MenuItem>
            <MenuItem icon={<AssignmentIcon />} onClick={() => select(6)}>Tasks</MenuItem>
            <MenuItem icon={<CodeIcon />} onClick={() =>window.location.href='/hackathon'}>Hackathon</MenuItem>
        </Menu>
    </Sidebar>
);

export const BootcampSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [select, setSelect] = useState(sessionStorage?.select)
    sessionStorage.select=select
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
        
        <div id="app" style={{ height: '100vh', display: 'flex' }}>
            <SidebarContent collapsed={collapsed} toggleSidebar={toggleSidebar} select={(val) => setSelect(val || 1)} />
            <main className='main-content' onClick={() => collapsed || toggleSidebar()}>
                {
                    sessionStorage?.select === "1" && <BootcampHome /> ||
                    sessionStorage?.select === "2" && <BootcampTeam /> ||
                    sessionStorage?.select === "3" && <BootAttendance /> ||
                    sessionStorage?.select === "4" && <BootcampMaterial /> ||
                    sessionStorage?.select === "5" && <BootcampScore /> ||
                    sessionStorage?.select === "6" && <BootcampTasks />
                }
            </main>
            {/* <div className='h1-home'>
            <h1>Tasks</h1>
            <h1 >Highest score</h1>
            <h1>Highest Attendance</h1>
            </div> */}
        </div>
        
        </>
        
    );
};
