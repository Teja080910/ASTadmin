import {
  Box,
  Button,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConsoleHome from "./ast-console-home";
import HomeIcon from "@mui/icons-material/Home";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
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
      type: "CONSOLE",
      payload: {
        adminEmail: "",
        adminLoginState: false,
      },
    });
  };

  return (
    <Box style={{ height: "100vh" }} overflow={"scroll"}>
      <Box display={"flex"} justifyContent={"center"}>
        <Image src={"../logo512.png"} />
        <Text as="h1" className="h1-animation">
          AST CONSOLE
        </Text>
      </Box>
      <Box p={5}>
        {page === "home" && ""}
        {page === "routes" && <ConsoleHome adminEmail={adminEmail} />}
        {page === "registeradmin" && ""}
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
          onClick={() => handleClick("home")}
          width="50px"
        >
          <HomeIcon />
          {page === "home" && <Text mb={0}>Home</Text>}
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
