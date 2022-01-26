import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchAllCoinTickers } from "../api";
import lightBgVideo from "../video/clouds.mp4";
import Loading from "../components/Loading";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Container = styled.div`
  width: 100vw;
  height: 200vh;
  display: flex;
  flex-direction: column;
`;

const BgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
  overflow: hidden;
  & video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 1s ease-in-out;
  }
`;

const BgText = styled.div`
  position: absolute;
  top: 30%;
  left: 100px;
  display: flex;
  flex-direction: column;
  & span {
    font-size: 70px;
    font-weight: 900;
    color: #fcf6f5;
    letter-spacing: 3px;
    &:nth-child(2) {
      color: #0984e3;
    }
    &:last-child {
      font-size: 18px;
      font-weight: 300;
      opacity: 0.7;
      letter-spacing: 1px;
      text-shadow: none;
    }
  }
`;

const BgBtn = styled.span`
  position: absolute;
  width: 140px;
  top: 55%;
  left: 100px;
  color: #fcf6f5;
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
  border-bottom: 1px solid white;
  transition: all 0.5s ease-in-out;
  &:hover {
    width: 300px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 100px;
`;

const TitleContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const ContentTitle = styled.div`
  width: 20%;
  font-size: 40px;
  font-weight: 600;
  border-bottom: 1px solid ${(props) => props.theme.littleBlackWhite};
  color: ${(props) => props.theme.nameColor};
`;

const CoinsBox = styled.ul`
  width: 100%;
  height: 90%;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
`;

const CoinBox = styled.li<{ percent: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 18px;
  a {
    width: 45%;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.nameColor};
    font-weight: 400;
  }
  div {
    width: 55%;
    display: flex;
    justify-content: flex-end;
    font-weight: 400;
    & span {
      color: ${(props) =>
        props.percent ? props.theme.tickerColor : props.theme.accentColor};
    }
    & span:first-child {
      margin-right: 30px;
    }
  }
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Home() {
  const { isLoading, data } = useQuery<PriceData[]>(
    "allTickers",
    fetchAllCoinTickers,
    { refetchInterval: 5000 }
  );
  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <BgContainer>
            <video muted autoPlay loop>
              <source src={lightBgVideo} type="video/mp4" />
            </video>
            <BgText>
              <span>Simple</span>
              <span>Bit</span>
              <span>간단히 살펴보는 코인정보 사이트</span>
            </BgText>
            <Link to="/btc-bitcoin">
              <BgBtn>Look Around &rarr;</BgBtn>
            </Link>
          </BgContainer>
          <ContentContainer>
            <TitleContainer>
              <ContentTitle>코인시세</ContentTitle>
            </TitleContainer>
            <CoinsBox>
              {data?.slice(0, 24).map((coin) => (
                <CoinBox
                  key={coin.id}
                  percent={coin.quotes.USD.percent_change_15m < 0}
                >
                  <Link to={`/${coin.id}`}>
                    <Img
                      src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                      alt={coin.id}
                    />
                    {coin.name}
                  </Link>
                  <div>
                    <span>{coin.quotes.USD.price.toFixed(2)} USD</span>
                    <span>{coin.quotes.USD.percent_change_15m} %</span>
                  </div>
                </CoinBox>
              ))}
            </CoinsBox>
          </ContentContainer>
        </Container>
      )}
    </Container>
  );
}

export default Home;
