const BASED_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  return await (await fetch(`${BASED_URL}/coins`)).json();
}

export async function fetchCoinInfo(coinId: string) {
  return await (await fetch(`${BASED_URL}/coins/${coinId}`)).json();
}

export async function fetchCoinTickers(coinId: string) {
  return await (await fetch(`${BASED_URL}/tickers/${coinId}`)).json();
}

export async function fetchAllCoinTickers() {
  return await (await fetch(`${BASED_URL}/tickers`)).json();
}

export async function fetchCoinHistory(coinId: string) {
  return await (
    await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)
  ).json();
}
