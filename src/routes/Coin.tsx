import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Coin() {
    interface RouteParams {
        coinId: string;
    }

    const [loading, setLoding] = useState(true);

    //url 파라미터 받아와서 사용
    const {coinId} = useParams<RouteParams>();
    console.log(coinId);

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
    
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {loading ? <Loader>Loding...</Loader> : null}
        </Container>
    );
}
export default Coin;