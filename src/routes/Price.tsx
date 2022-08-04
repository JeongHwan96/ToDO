import React from "react";
import { useParams, useMatch } from "react-router";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../Api";

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
      ath_date: number;
      ath_price: number;
      market_ca: number;
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

const PriceTab = styled.div`
  border: 3px solid white;
  display: inline-block;
  border-radius: 4%;
  text-align: center;
  width: 40%;
  margin: 5% 5% 0 5%;
  p {
    padding: 10px 20px;
  }
`;

const Price = () => {
  const { coinId } = useParams();

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 5000,
    }
  );
  return (
    <div>
      <PriceTab>
        <p>PERCENT CHANGE</p>
        <p>1년</p>
        <p>{tickersData?.quotes.USD.percent_change_1y}%</p>
      </PriceTab>
      <PriceTab>
        <p>PERCENT CHANGE</p>
        <p>한달</p>
        <p>{tickersData?.quotes.USD.percent_change_30d}%</p>
      </PriceTab>
      <PriceTab>
        <p>PERCENT CHANGE</p>
        <p>일주일</p>
        <p>{tickersData?.quotes.USD.percent_change_7d}%</p>
      </PriceTab>
      <PriceTab>
        <p>PERCENT CHANGE</p>
        <p>24시간</p>
        <p>{tickersData?.quotes.USD.percent_change_24h}%</p>
      </PriceTab>
      <PriceTab>
        <p>PERCENT CHANGE</p>
        <p>12시간</p>
        <p>{tickersData?.quotes.USD.percent_change_12h}%</p>
      </PriceTab>
      <PriceTab>
        <p>PERCENT CHANGE</p>
        <p>6시간</p>
        <p>{tickersData?.quotes.USD.percent_change_6h}%</p>
      </PriceTab>
      <PriceTab>
        <p>PERCENT CHANGE</p>
        <p>1시간</p>
        <p>{tickersData?.quotes.USD.percent_change_1h}%</p>
      </PriceTab>
      <PriceTab>
        <p>PERCENT CHANGE</p>
        <p>30분</p>
        <p>{tickersData?.quotes.USD.percent_change_30m}%</p>
      </PriceTab>
    </div>
  );
};

export default Price;
