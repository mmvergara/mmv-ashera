import { Icon, Hide } from "@chakra-ui/react";
import { BiTask, BiNote } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { MenuDiv } from "../../styles/StyledComponents";
const Menus = () => {
  const location = useLocation();
  return (
    <MenuDiv>
      <Link
        to='/tasks'
        style={{ borderBottom: location.pathname === "/tasks" ? "7px solid #601769" : "" }}
      >
        <Hide breakpoint='(max-width: 650px)'>Tasks</Hide>
        <Icon as={BiTask} />
      </Link>
      <Link
        to='/notes'
        style={{ borderBottom: location.pathname === "/notes" ? "7px solid #601769" : "" }}
      >
        <Hide breakpoint='(max-width: 650px)'>Notes</Hide>
        <Icon as={BiNote} />
      </Link>
    </MenuDiv>
  );
};

export default Menus;
