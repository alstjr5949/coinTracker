import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchAllCoinTickers } from "../api";
import { Link, useParams } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartBox = styled.div`
  width: 60%;
  height: 80%;
  background-color: wheat;
  margin-right: 1%;
`;

const ListBox = styled.div`
  width: 30%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CoinListHeader = styled.div`
  width: 90%;
  height: 10%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CoinUl = styled.ul`
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  padding: 10px;
`;

const CoinLi = styled.li<{ isActive: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) =>
    props.isActive ? props.theme.bgColor : "rgba(0,0,0,0.05)"};
  border: 1px solid
    ${(props) => (props.isActive ? props.theme.bgColor : "rgba(0,0,0,0.1)")};
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.01);
  }
`;

const QuotesBox = styled.div<{ percent: boolean }>`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  color: ${(props) =>
    props.percent ? props.theme.textColor : props.theme.accentColor};
  & span {
    width: 50%;
    font-size: 16px;
    font-weight: 400;
  }
  & span:first-child {
    margin-right: 50px;
  }
  & span:last-child {
    display: flex;
    justify-content: flex-end;
  }
`;

const NameBox = styled.div`
  display: flex;
  align-items: center;
  color: black;
  font-weight: 400;
  font-size: 16px;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
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

function Coin() {
  const { coinId } = useParams();
  const { isLoading: tickerLoading, data: tickerData } = useQuery<PriceData[]>(
    "allTickers",
    fetchAllCoinTickers,
    { refetchInterval: 5000 }
  );
  return (
    <Container>
      {tickerLoading ? (
        <h1>Loading...</h1>
      ) : (
        <ContentBox>
          <ChartBox></ChartBox>
          <ListBox>
            <CoinListHeader>코인리스트</CoinListHeader>
            <CoinUl>
              {tickerData?.slice(0, 100).map((coin) => (
                <Link to={`/${coin.id}`}>
                  <CoinLi key={coin.id} isActive={`${coinId}` !== `${coin.id}`}>
                    <NameBox>
                      <Img
                        src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                        alt={coin.id}
                      />
                      {coin.name}
                    </NameBox>
                    <QuotesBox percent={coin.quotes.USD.percent_change_15m < 0}>
                      <span>{coin.quotes.USD.price.toFixed(2)} USD</span>
                      <span>{coin.quotes.USD.percent_change_15m} %</span>
                    </QuotesBox>
                  </CoinLi>
                </Link>
              ))}
            </CoinUl>
          </ListBox>
        </ContentBox>
      )}
    </Container>
  );
}

export default Coin;
