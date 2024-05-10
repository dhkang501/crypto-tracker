import { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

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
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};
    margin-bottom: 10px;
    border: 1px solid white;
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
interface ICoin {
    id: string,
    name: string,
    symbol: string,
}

function Coins() {
    const setDartAtom = useSetRecoilState(isDarkAtom)
    const toggleDarkAtom = () => setDartAtom(prev => !prev)
    //useQuery hook은 fetch 함수를 부르고 fetcher함수가 loading 중이라면 react query는 isLoding에서 그걸 알려준다. 그리고 fetch함수가 끝나면  react query는 json을 data에 넣는다.
    //장점 중 하나는 isLoding이라고 불리는 boolean 값을 return한다.
    //페이지를 나갔다가 들어왔을때 로딩이 안도는 이유는 allCoins에 캐시를 저장했기 떄문이다.
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    
    return (
        <Container>
            <Helmet>
                <Title>코인</Title>
            </Helmet>
            <Header>
                <Title>코인</Title>
                <button onClick={toggleDarkAtom}>Toggle Mode</button>
            </Header>
            {isLoading ? (
                <Loader>Loding...</Loader>
            ) : (
                <CoinList>
                    {/* data가 array 거나 undefined이기 때문에 ? 추가, 데이터가 너무 많아서 slice 함수로 100개만 불러옴 */}
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={{
                                pathname: `/${coin.id}`,
                                state: {name: coin.name},
                            }}>
                                {/* https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()} */}
                                {/* https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin.name .toLowerCase().split(" ").join("-")}.png`}  */}
                                <Img src={`https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin.name.toLowerCase().split(" ").join("-")}.png`} alt="" />
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