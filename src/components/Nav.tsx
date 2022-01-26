import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atom";

const NavContainer = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 10vh;
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
      color: ${(props) => props.theme.nameColor};
    }
    &:last-child {
      color: #0984e3;
    }
  }
`;

const ThemeModeBtn = styled.button`
  position: absolute;
  right: 120px;
  top: 70px;
`;

function Nav() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <NavContainer>
      <Logo>
        <Link to="/">
          <span>Simp</span>
          <span>Bit</span>
        </Link>
        <ThemeModeBtn onClick={toggleDarkAtom}>Toggle</ThemeModeBtn>
      </Logo>
    </NavContainer>
  );
}

export default Nav;
