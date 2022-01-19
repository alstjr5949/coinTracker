import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.5);
`;

function Footer() {
  return (
    <FooterContainer>
      <div>Copyright &copy; Mingcoding</div>
    </FooterContainer>
  );
}

export default Footer;
