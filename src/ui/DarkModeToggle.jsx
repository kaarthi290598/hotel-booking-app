import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkmode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={() => toggleDarkMode()}>
      {isDarkmode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
