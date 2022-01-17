import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 62px;
  margin: 0px auto;
  padding: 0px 20px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  & span {
    font-size: 35px;
    font-style: italic;
    font-weight: 800;
    &:last-child {
      color: #195190;
    }
  }
`;

function Nav() {
  return (
    <NavContainer>
      <Link to="/">
        <Logo>
          <span>Simp</span>
          <span>Bit</span>
        </Logo>
      </Link>
    </NavContainer>
  );
}

export default Nav;
