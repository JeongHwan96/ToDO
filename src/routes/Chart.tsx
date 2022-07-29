import { useQuery } from "react-query";
import { fetchCoinHistory } from "../Api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  return (
    <>
      <div>
        {isLoading ? (
          "Loading chart..."
        ) : (
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => price.close) as number[],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                height: 500,
                width: 500,
                background: "transparent",
                toolbar: {
                  show: false,
                },
              },
              grid: {
                show: false,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) => +price.time_close * 1000),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["blue"], stops: [0, 100] },
              },
              colors: ["red"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(3)}`,
                },
              },
              stroke: {
                curve: "smooth",
                width: 4,
              },
            }}
          />
        )}
      </div>
    </>
  );
}

export default Chart;
