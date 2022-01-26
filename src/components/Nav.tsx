import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
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

const ThemeModeBtn = styled.div<{ dark: boolean }>`
  position: absolute;
  right: 120px;
  top: 55px;
  cursor: pointer;
  font-size: 25px;
  color: ${(props) => props.theme.nameColor};
  transition: all 0.5s ease-in-out;
  &:hover {
    color: ${(props) => (props.dark ? "#ffa726" : "#fff176")};
  }
`;

function Nav() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <NavContainer>
      <Logo>
        <Link to="/">
          <span>Simp</span>
          <span>Bit</span>
        </Link>
        <ThemeModeBtn onClick={toggleDarkAtom} dark={isDark}>
          <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
        </ThemeModeBtn>
      </Logo>
    </NavContainer>
  );
}

export default Nav;
