import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    /* padding: 20px; */
    margin-bottom: 10px;
    border-radius: 15px;
    a {
        display: flex;
        align-items: center;
        padding: 20px; //글씨외 카드 끝부분까지 클릭할 수 있음
        transition:  color 0.2s ease-in;
        /* display: block; //글씨외 카드 끝부분까지 클릭할 수 있음 */
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

//  타입스크립트에 데이터 형식 알려주기
interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    //빈배열로 
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loding, setLoading] = useState(true);
    //component life의 시작점에서 실행
    //useEffect: component가 생성될 때 한번만 코드를 실행하도록 하는 hook
    useEffect(() => {
        // 이렇게 만든 함수는 바로 실행이 된다. 작은 꿀팁:)
        // (() => console.log(1))();
        (async() => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            json.slice(0, 100);//데이터 너무 많음 100개만 잘라서 사용
            setCoins(json.slice(0,100));
            setLoading(false);//state안에 코인이 다 세팅되면 false로 바꿔줌
        })();
    }, []);
    console.log(coins);
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {loding ? (
                <Loader>Loding...</Loader>
            ) : (
                <CoinList>
                    {coins.map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={{
                                pathname: `/${coin.id}`,
                                state: {name: coin.name},
                            }}>
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="" />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinList>
            )}
        </Container>
    );
}
export default Coins;