import AssignmentIcon from "@mui/icons-material/Assignment";
import CodeIcon from "@mui/icons-material/Code";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ScoreIcon from "@mui/icons-material/Score";
import React, { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { HackathonTeam } from "../../hackathon/Hackathonteams/hackathonteams";
import HackathonTasks from "../hacktasks/hackathontask";
import PSS from "../problemstatements/ps";
import "./hackathonsidebar.css";
import TimeManager from "../timer/adminSideTimer/TimerManager";

const queryParams = new URLSearchParams(window.location.search);
const SidebarContent = ({ collapsed, toggleSidebar, select }) => {
    const nav = useNavigate()
    return (
        <Sidebar collapsed={collapsed} id='sidebar'>
            <Menu  onClick={collapsed ? toggleSidebar : null}>
                <MenuItem
                    icon={<MenuOutlinedIcon />}
                    onClick={toggleSidebar}
                    style={{ textAlign: 'center' }}
                >
                    <h2>Hackathon</h2>
                </MenuItem>
                <MenuItem icon={<HomeOutlinedIcon />} onClick={() => window.location.href = '/'}>Home</MenuItem>
                <MenuItem icon={<PeopleOutlinedIcon />} onClick={() => { select(2); queryParams.set("page", "team"); nav({ search: queryParams.toString() }) }}>Team</MenuItem>
                <MenuItem icon={<ScoreIcon />} onClick={() => { select(5); queryParams.set("page", "score"); nav({ search: queryParams.toString() }) }}>Score</MenuItem>
                <MenuItem icon={<AssignmentIcon />} onClick={() => { select(6); queryParams.set("page", "tasks"); nav({ search: queryParams.toString() }) }}>Tasks</MenuItem>
                <MenuItem icon={<LightbulbIcon />} onClick={() => { select(7); queryParams.set("page", "problemstatements"); nav({ search: queryParams.toString() }) }}>Problem Statements</MenuItem>
                <MenuItem icon={<AccessTimeFilledIcon />} onClick={() => { select(7); queryParams.set("page", "timer"); nav({ search: queryParams.toString() });}}>Timer Manager</MenuItem>
                <MenuItem icon={<CodeIcon />} onClick={() => window.location.href = '/bootcamp'}>Bootcamp</MenuItem>
            </Menu>
        </Sidebar>
    );
}

export const HackathonSidebar = ({socket}) => {
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
        onDoubleClick={() => toggleSidebar()}
      >
        {
          // set === "home" && <BootcampHome /> ||
          (set === "team" && <HackathonTeam />) ||
            (set === "tasks" && <HackathonTasks />) ||
            (set === "problemstatements" && <PSS />) ||
            (set === "timer" && <TimeManager socket={socket}/>)
        }
      </main>
    </div>
  );
};
