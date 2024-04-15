import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

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

function Chart({coinId}:ChartProps) {
  const setDartAtom = useRecoilValue(isDarkAtom);
    //IHistorical 하루 데이터값이 여러게 들어있으므로 []
    const {isLoading, data} = useQuery<IHistorical[]>(
      ["ohlcv", coinId],
      () => fetchCoinHistory(coinId),
      {
        refetchInterval: 10000,//10초
      }
    );
    return (
      <div>
        {isLoading ? (
          "Loading chart..."
        ) : (
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                // data: data?.map((price) => price.close),
                data: data?.map((price => price.close)) ?? [],
                // data: data?.map((price) => price.close) as number[],
              },
            ]}
            options={{
              theme: {
                mode: setDartAtom ? "dark":"light",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) => price.time_close),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
        )}
      </div>
    );
  }
  
  export default Chart;