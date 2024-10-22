import {
  Box,
  Button,
  Image,
  Text,
  Tooltip
} from "@chakra-ui/react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConsoleHome from "./ast-console-routes";
import { AdminManagementPanel } from "./ast-console-admins";
import HouseIcon from '@mui/icons-material/House';

const AstLayout = ({ adminEmail }) => {
  const [page, setPage] = useState("home");
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    handleNav(params.page || "home");
  }, [params]);

  const handleNav = (page) => {
    setPage(page);
  };

  const handleClick = (page) => {
    navigate(`/console/${page}`);
    handleNav(page);
  };
  const handleLogout = () => {
    dispatch({
      type: "BOOT",
      payload: {
        bootmail: "",
        bootloginstate: false,
      },
    });
  };

  return (
    <Box style={{ height: "100vh" }} overflow={"scroll"}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
  <Image src={"../logo512.png"} width={"60px"} height={"60px"} />
  <Text as="h1" className="h1-animation-console" ml={2} alignItems={"center"} p={3}>
    AST CONSOLE
  </Text>
</Box>
      <Box p={5} marginBottom={"70px"}>
        {page === "home" && ""}
        {page === "routes" && <ConsoleHome adminEmail={adminEmail} />}
        {page === "registeradmin" && <AdminManagementPanel />}
        {page === "*" && ""}
      </Box>
      <Box
        position={"fixed"}
        bottom={0}
        display={{ base: "flex" }}
        justifyContent="center"
        gap="50px"
        height="70px"
        alignItems="center"
        width="100%"
        bg="teal"
      >
         <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          color={page === "home" ? "white" : "black"}
          onClick={() => navigate("/")}
          width="50px"
        >
          <HouseIcon />
          <Text mb={0}>Home</Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          color={page === "home" ? "white" : "black"}
          onClick={() => handleClick("home")}
          width="50px"
        >
          <HomeIcon />
          {page === "home" && <Text mb={0}>House</Text>}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          color={page === "routes" ? "white" : "black"}
          onClick={() => handleClick("routes")}
          width="50px"
        >
          <AltRouteIcon />
          {page === "routes" && <Text mb={0}>Routes</Text>}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          color={page === "registeradmin" ? "white" : "black"}
          onClick={() => handleClick("registeradmin")}
          width="50px"
        >
          <AdminPanelSettingsIcon />
          {page === "registeradmin" && <Text mb={0}>Admins</Text>}
        </Box>
        <Box>
          <Tooltip label="Logout">
            <Button onClick={handleLogout} colorScheme="red">
              <LogoutIcon />
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default AstLayout;
