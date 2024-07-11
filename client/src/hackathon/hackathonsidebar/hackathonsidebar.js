import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CodeIcon from "@mui/icons-material/Code";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ScoreIcon from "@mui/icons-material/Score";
import React, { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { HackathonTeam } from "../../hackathon/Hackathonteams/hackathonteams";
import { HackScore } from "../hackscore/hackscore";
import HackathonTasks from "../hacktasks/hackathontask";
import PSS from "../problemstatements/ps";
import TimeManager from "../timer/adminSideTimer/TimerManager";
import "./hackathonsidebar.css";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import { useDispatch } from "react-redux";
import HackathonTeamRegistrer from "../Hackathonteams/hackathonteamregister";
import House from "@mui/icons-material/House";

const queryParams = new URLSearchParams(window.location.search);
const SidebarContent = ({ collapsed, toggleSidebar, select }) => {
  const nav = useNavigate()
  const dispatch=useDispatch()
  return (
    <Sidebar collapsed={collapsed} id='sidebar' onMouseOver={collapsed ? toggleSidebar : null} onMouseLeave={!collapsed ? toggleSidebar : null} >
      <Menu onClick={collapsed ? toggleSidebar : null} style={{zIndex:"100"}}>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={toggleSidebar}
          style={{ textAlign: 'center' }}
        >
          <h2>Hackathon</h2>
        </MenuItem>
        <MenuItem icon={<HomeOutlinedIcon />} onClick={() => window.location.href = '/'}>Home</MenuItem>
        <MenuItem icon={<House />} onClick={() => window.location.href = '/hackathon'}>House</MenuItem>
        <MenuItem icon={<PeopleOutlinedIcon />} onClick={() => { select(2); queryParams.set("page", "team"); nav({ search: queryParams.toString() }) }}>Team</MenuItem>
        <MenuItem icon={<ScoreIcon />} onClick={() => { select(5); queryParams.set("page", "score"); nav({ search: queryParams.toString() }) }}>Score</MenuItem>
        <MenuItem icon={<AssignmentIcon />} onClick={() => { select(6); queryParams.set("page", "tasks"); nav({ search: queryParams.toString() }) }}>Tasks</MenuItem>
        <MenuItem icon={<AccessibilityIcon />} onClick={() => { select(6); queryParams.set("page", "htrs"); nav({ search: queryParams.toString() }) }}>Htrs</MenuItem>
        <MenuItem icon={<LightbulbIcon />} onClick={() => { select(7); queryParams.set("page", "problemstatements"); nav({ search: queryParams.toString() }) }}>Problem Statements</MenuItem>
        <MenuItem icon={<AccessTimeFilledIcon />} onClick={() => { select(8); queryParams.set("page", "timer"); nav({ search: queryParams.toString() }); }}>Timer Manager</MenuItem>
        <MenuItem  icon={<CodeIcon />} onClick={() => window.location.href = '/bootcamp'}>Bootcamp</MenuItem>
      </Menu>
      <Menu style={{ position: 'absolute', bottom: 0, color: "red",width:"100%" }}>
                <MenuItem icon={<PowerSettingsNewIcon />} onClick={() =>{dispatch({ type: 'BOOT', payload: { bootmail:null, bootpassword:null}});window.location.reload(1000)}}>Log out</MenuItem>
      </Menu>
    </Sidebar>
  );
}

export const HackathonSidebar = ({ socket }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [select, setSelect] = useState(sessionStorage?.select);
  const queryParams = new URLSearchParams(window.location.search);
  let set = queryParams?.get("page") || "home";
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div id="app" style={{ height: "100vh", display: "flex" }}>
      <SidebarContent
        collapsed={collapsed}
        toggleSidebar={toggleSidebar}
        select={(val) => setSelect(val || 1)}
      />
      <main
        className="main-content"
        onClick={() => collapsed || toggleSidebar()}
      
      >
        {
          /* (set === "home" && <HackathonHome />) || */
          (set === "team" && <HackathonTeam />) ||
          (set === "score" && <HackScore />) ||
          (set === "tasks" && <HackathonTasks />) ||
          (set === "problemstatements" && <PSS />) ||
          (set === "timer" && <TimeManager socket={socket} />) ||
          (set === "htrs" && <HackathonTeamRegistrer />)

        }
      </main>
    </div>
  );
};
