import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.4rem 4.8rem;
  border: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: end;
  gap: 1rem;
  align-items: center;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
      <DarkModeToggle />
    </StyledHeader>
  );
}

export default Header;
