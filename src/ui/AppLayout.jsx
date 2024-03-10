import { Outlet } from "react-router-dom";
import Row from "./Row";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { useState } from "react";

const StyledApp = styled.div`
  display: grid;

  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;
`;

const Main = styled.main`
  background-color: green;
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-50);
  overflow-y: scroll;

  scrollbar-width: thin;
  scrollbar-color: var(--color-grey-300) var(--color-grey-50);
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const [isSidebar, SetisSideBar] = useState(false);

  return (
    <StyledApp>
      <Header handleSideBar={SetisSideBar} />
      <Sidebar $isOpen={isSidebar} />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledApp>
  );
}

export default AppLayout;
