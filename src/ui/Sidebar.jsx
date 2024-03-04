import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const StyledSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 260px;
  margin-left: ${(prop) => (prop.isOpen ? "-260px" : "")};
  transition: all 200ms;
`;

function Sidebar({ isOpen }) {
  return (
    <StyledSideBar isOpen={isOpen}>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </StyledSideBar>
  );
}

export default Sidebar;
