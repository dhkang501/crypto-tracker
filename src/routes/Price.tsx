import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { log } from "console";
import { logDOM } from "@testing-library/react";

interface ChartProps{
  coinId: string;
}

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

function Price({coinId}:ChartProps) {
  const {isLoading, data} = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,//10초
    }
  );
  const coinData = data?.map((i => {
    return {
      x: i.time_close,
      y: [i.open, i.high, i.low, i.close]
    };
  })) ?? [];


    return (
      <div>
        <ApexChart 
          type="candlestick"
          series={[
            {          
              data: coinData
            },
          ]}
          options={{
            chart: {
              type: 'candlestick',
              height: 350
            },
            title: {
              text: 'CandleStick Chart',
              align: 'left'
            },
            xaxis: {
              type: 'datetime'
            },
            yaxis: {
              tooltip: {
                enabled: true
              }
            }
          }}
          height={350}
        />
      </div>
    );
  }
  
  export default Price;