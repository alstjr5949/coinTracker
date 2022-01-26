import { useQuery } from "react-query";
import styled from "styled-components";
import {
  fetchAllCoinTickers,
  fetchCoinHistory,
  fetchCoinInfo,
  fetchCoinTickers,
} from "../api";
import { Link, useParams } from "react-router-dom";
import ApexCharts from "react-apexcharts";
import Loading from "../components/Loading";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

const Container = styled.div`
  width: 100vw;
  height: 105vh;
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
  height: 95%;
  margin-right: 1%;
  padding: 20px;
  box-shadow: ${(props) => props.theme.lightBlackWhite} 0px 1px 2px 0px;
`;

const ListBox = styled.div`
  width: 30%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-shadow: ${(props) => props.theme.lightBlackWhite} 0px 1px 2px 0px;
`;

const CoinListHeader = styled.div`
  width: 90%;
  height: 10%;
  color: ${(props) => props.theme.nameColor};
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
    background-color: ${(props) => props.theme.lightBlackWhite};
    border: 1px solid rgba(0, 0, 0, 0.01);
  }
`;

const QuotesBox = styled.div<{ percent: boolean }>`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  color: ${(props) =>
    props.percent ? props.theme.tickerColor : props.theme.accentColor};
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
  color: ${(props) => props.theme.nameColor};
  font-weight: 400;
  font-size: 16px;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const ChartHeader = styled.div`
  width: 100%;
  height: 20%;
`;

const CoinName = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  align-items: center;
  padding: 20px;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.nameColor};
  border-bottom: 1px solid ${(props) => props.theme.lightBlackWhite};
`;

const CoinQuote = styled.div<{ percent: boolean }>`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: ${(props) =>
    props.percent ? props.theme.tickerColor : props.theme.accentColor};
`;

const ChartUSDBox = styled.div`
  margin-bottom: 10px;
  & span:first-child {
    font-size: 30px;
    font-weight: 600;
    margin-right: 5px;
    letter-spacing: 1px;
  }
  & span:last-child {
    font-size: 16px;
  }
`;

const ChartPercentBox = styled.div`
  display: flex;
  align-items: center;
  & span:first-child {
    font-size: 16px;
    color: ${(props) => props.theme.littleBlackWhite};
    margin-right: 10px;
  }
  & span:last-child {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1px;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  padding: 20px;
  color: ${(props) => props.theme.nameColor};
`;

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

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

interface IHistoric {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Coin() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useParams();
  const { isLoading: allTickerLoading, data: allTickerData } = useQuery<
    PriceData[]
  >("allTickers", fetchAllCoinTickers, { refetchInterval: 5000 });
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId ? coinId : "")
  );
  const { isLoading: tickerLoading, data: tickerData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId ? coinId : ""),
    {
      refetchInterval: 5000,
    }
  );
  const { isLoading: ohlcvLoading, data: ohlcvData } = useQuery<IHistoric[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId ? coinId : ""),
    { refetchInterval: 10000 }
  );
  return (
    <Container>
      {allTickerLoading || infoLoading || ohlcvLoading || tickerLoading ? (
        <Loading />
      ) : (
        <ContentBox>
          <ChartBox>
            <ChartHeader>
              <CoinName>
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${
                    infoData?.symbol ? infoData.symbol.toLowerCase() : ""
                  }`}
                  alt={infoData?.id ? infoData.id : ""}
                />
                <span>{infoData?.name ? infoData?.name : "Loading"}</span>
              </CoinName>
              <CoinQuote
                percent={
                  tickerData?.quotes
                    ? tickerData.quotes.USD.percent_change_15m < 0
                    : false
                }
              >
                <ChartUSDBox>
                  <span>
                    {tickerData?.quotes
                      ? tickerData.quotes.USD.price.toFixed(2)
                      : "Loading"}
                  </span>
                  <span>USD</span>
                </ChartUSDBox>
                <ChartPercentBox>
                  <span>전일대비</span>
                  <span>
                    {tickerData?.quotes
                      ? tickerData.quotes.USD.percent_change_15m
                      : "Loading"}
                    %
                  </span>
                </ChartPercentBox>
              </CoinQuote>
            </ChartHeader>
            <ChartContainer>
              <ApexCharts
                type="candlestick"
                series={[
                  {
                    data: ohlcvData?.map((price) => {
                      return {
                        x: price.time_open,
                        y: [
                          price.open.toFixed(2),
                          price.high.toFixed(2),
                          price.low.toFixed(2),
                          price.close.toFixed(2),
                        ],
                      };
                    }),
                  },
                ]}
                options={{
                  theme: {
                    mode: isDark ? "dark" : "light",
                  },
                  chart: {
                    toolbar: {
                      show: false,
                    },
                    background: "transparent",
                  },
                  plotOptions: {
                    candlestick: {
                      colors: {
                        upward: "#D25044",
                        downward: "#1261C4",
                      },
                    },
                  },
                  xaxis: {
                    type: "datetime",
                  },
                }}
              />
            </ChartContainer>
          </ChartBox>
          <ListBox>
            <CoinListHeader>코인리스트</CoinListHeader>
            <CoinUl>
              {allTickerData?.slice(0, 100).map((coin) => (
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
