import AssignmentIcon from '@mui/icons-material/Assignment';
import CodeIcon from '@mui/icons-material/Code';
import AttendanceIcon from '@mui/icons-material/EventAvailable';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ScoreIcon from '@mui/icons-material/Score';
import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { BootAttendance } from '../attendance/attendance';
import { BootcampHome } from '../bootcamphome/bootcamphome';
import { BootcampTeam } from '../bootcampteams/bootcampteams';
import { BootcampMaterial } from '../materials/uploadmaterials';
import { BootcampScore } from '../scoremanager/bootcampscore';
import BootcampTasks from '../taskmanger/bootcamptaskmager';
import './bootcampsidebar.css';
import { useNavigate } from 'react-router-dom';

const queryParams = new URLSearchParams(window.location.search);
const SidebarContent = ({ collapsed, toggleSidebar, select }) => {
    const nav = useNavigate()
    return (
        <Sidebar collapsed={collapsed} id='sidebar'>
            <Menu>
                <MenuItem
                    icon={<MenuOutlinedIcon />}
                    onClick={toggleSidebar}
                    style={{ textAlign: 'center' }}
                >
                    <h2>Bootcamp</h2>
                </MenuItem>
                <MenuItem icon={<HomeOutlinedIcon />} onClick={() => window.location.href = '/'}>Home</MenuItem>
                <MenuItem icon={<PeopleOutlinedIcon />} onClick={() => { select(2); queryParams.set("page", "team"); nav({ search: queryParams.toString() }) }}>Team</MenuItem>
                <MenuItem icon={<AttendanceIcon />} onClick={() => { select(3); queryParams.set("page", "attendance"); nav({ search: queryParams.toString() }) }}>Attendance</MenuItem>
                <MenuItem icon={<LibraryBooksIcon />} onClick={() => { select(4); queryParams.set("page", "material"); nav({ search: queryParams.toString() }) }}>Materials</MenuItem>
                <MenuItem icon={<ScoreIcon />} onClick={() => { select(5); queryParams.set("page", "score"); nav({ search: queryParams.toString() }) }}>Score</MenuItem>
                <MenuItem icon={<AssignmentIcon />} onClick={() => { select(6); queryParams.set("page", "tasks"); nav({ search: queryParams.toString() }) }}>Tasks</MenuItem>
                <MenuItem icon={<CodeIcon />} onClick={() => window.location.href = '/hackathon'}>Hackathon</MenuItem>
            </Menu>
        </Sidebar>
    );
}

export const BootcampSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [select, setSelect] = useState(sessionStorage?.select)
    const queryParams = new URLSearchParams(window.location.search);
    let set = queryParams?.get("page");
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div id="app" style={{ height: '100vh', display: 'flex' }}>
            <SidebarContent collapsed={collapsed} toggleSidebar={toggleSidebar} select={(val) => setSelect(val || 1)} />
            <main className='main-content' onClick={() => collapsed || toggleSidebar()}>
                {
                    set === "1" && <BootcampHome /> ||
                    set === "team" && <BootcampTeam /> ||
                    set === "attendance" && <BootAttendance /> ||
                    set === "material" && <BootcampMaterial /> ||
                    set === "score" && <BootcampScore /> ||
                    set === "tasks" && <BootcampTasks />
                }
            </main>
        </div>
    );
};
