import AssignmentIcon from '@mui/icons-material/Assignment';
import CodeIcon from '@mui/icons-material/Code';
import AttendanceIcon from '@mui/icons-material/EventAvailable';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ScoreIcon from '@mui/icons-material/Score';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BootAttendance } from '../attendance/attendance';
import { BootcampHome } from '../bootcamphome/bootcamphome';
import { BootcampMaterial } from '../materials/uploadmaterials';
import { BootcampScore } from '../scoremanager/bootcampscore';
import { StudentsData } from '../studentdata/studentdata';
import BootcampTasks from '../taskmanger/bootcamptaskmager';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Others } from '../others/others';
import './bootcampsidebar.css';

const queryParams = new URLSearchParams(window.location.search);
const SidebarContent = ({ collapsed, toggleSidebar, select }) => {
    const nav = useNavigate()
    const dispatch=useDispatch()
    return (
        <Sidebar collapsed={collapsed} id='sidebar' onMouseOver={collapsed ? toggleSidebar : null} onMouseLeave={!collapsed ? toggleSidebar : null} >
            <Menu onClick={collapsed ? toggleSidebar : null}>
                <MenuItem
                    icon={<MenuOutlinedIcon />}
                    onClick={toggleSidebar}
                    style={{ textAlign: 'center' }}
                >
                    <h2>Bootcamp</h2>
                </MenuItem>
                <MenuItem icon={<HomeOutlinedIcon />} onClick={() => window.location.href = '/'}>Home</MenuItem>
                <MenuItem icon={<AttendanceIcon />} onClick={() => { select(3); queryParams.set("page", "attendance"); nav({ search: queryParams.toString() }) }}>Attendance</MenuItem>
                <MenuItem icon={<LibraryBooksIcon />} onClick={() => { select(4); queryParams.set("page", "material"); nav({ search: queryParams.toString() }) }}>Materials</MenuItem>
                <MenuItem icon={<ScoreIcon />} onClick={() => { select(5); queryParams.set("page", "score"); nav({ search: queryParams.toString() }) }}>Score</MenuItem>
                <MenuItem icon={<AssignmentIcon />} onClick={() => { select(6); queryParams.set("page", "tasks"); nav({ search: queryParams.toString() }) }}>Tasks</MenuItem>
                <MenuItem icon={<SchoolOutlinedIcon />} onClick={() => { select(7); queryParams.set("page", "students"); nav({ search: queryParams.toString() }) }}>Students Data</MenuItem>
                <MenuItem icon={<Groups2OutlinedIcon /> }onClick={() => { select(8); queryParams.set("page", "others"); nav({ search: queryParams.toString() }) }}>Others</MenuItem>
                <MenuItem icon={<CodeIcon />} onClick={() => window.location.href = '/hackathon'}>Hackathon</MenuItem>
            </Menu>
            <Menu style={{ position: 'absolute', bottom: 0, color: "red",width:"100%" }}>
                <MenuItem icon={<PowerSettingsNewIcon />} onClick={() => { dispatch({ type: 'BOOT', payload: { bootmail: null, bootpassword: null } }); window.location.reload(1000) }} >Log out</MenuItem>
            </Menu>
        </Sidebar>
    );
}
export const BootcampSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [select, setSelect] = useState(sessionStorage?.select)
    const queryParams = new URLSearchParams(window.location.search);
    let set = queryParams?.get("page") || "home";
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div id="app" style={{ height: '100vh', display: 'flex' }}>
            <SidebarContent collapsed={collapsed} toggleSidebar={toggleSidebar} select={(val) => setSelect(val || 1)} />
            <main className='main-content' onClick={() => collapsed || toggleSidebar()}>
                {
                    (set === "home" && <BootcampHome />) ||
                    (set === "attendance" && <BootAttendance />) ||
                    (set === "material" && <BootcampMaterial />) || 
                    (set === "score" && <BootcampScore />) ||
                    (set === "tasks" && <BootcampTasks />) ||
                    (set === "students" && <StudentsData />) ||
                    (set === "others" && <Others />)

                }
            </main>
        </div>
    );
};
