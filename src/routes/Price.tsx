import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { log } from "console";
import { logDOM } from "@testing-library/react";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

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
  const setDartAtom = useRecoilValue(isDarkAtom);
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
            theme: {
              mode: setDartAtom ? "dark":"light",
            },
            chart: {
              type: 'candlestick',
              height: 350,
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              type: 'datetime'
            },
            yaxis: {
              tooltip: {
                enabled: true
              }
            },
            
          }}
        />
      </div>
    );
  }
  
  export default Price;