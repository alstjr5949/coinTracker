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
  z-index: 1;
`;

const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  padding: 0px 20px;
  margin-left: 100px;
  margin-top: 50px;
  & span {
    letter-spacing: 2px;
    font-size: 30px;
    font-style: italic;
    font-weight: 800;
    &:first-child {
      color: #101820;
    }
    &:last-child {
      color: #0984e3;
    }
  }
`;

function Nav() {
  return (
    <NavContainer>
      <Logo>
        <Link to="/">
          <span>Simp</span>
          <span>Bit</span>
        </Link>
      </Logo>
    </NavContainer>
  );
}

export default Nav;
