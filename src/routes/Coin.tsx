import { log } from "console";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
    coinId: string;
}
interface RouteState {
    name: string;
}

function Coin() {
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

    const Title = styled.h1`
        font-size: 48px;
        color: ${props => props.theme.accentColor};
    `;

    const Loader = styled.span`
        text-align: center;
        display: block;
    `;
    
    const [loading, setLoading] = useState(true);
    //useParams: url 파라미터 받아와서 사용
    const {coinId} = useParams<RouteParams>();
    //useLocation: 현재 url 정보 가져오기
    const { state } = useLocation<RouteState>();
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});
    useEffect(() => {
        //즉시 실행 될 function
        (async () => {
            //1. coin 정보
            // const response = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            //응답 받을 json
            // const json = await response.json();
            // 위 두줄을 한번에, 캡슐화!
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            // 2. coin 가격
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            console.log(priceData);
            setInfo(infoData);
            setPriceInfo(priceData);
        })();
    }, [])

    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loding"}</Title>
            </Header>
            {loading ? <Loader>Loding...</Loader> : null}
        </Container>
    );
}
export default Coin;