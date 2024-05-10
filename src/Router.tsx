import {BrowserRouter, Switch, Route} from "react-router-dom"; //Typescript가 찾지 못함(npm i --save-dev @types/react-router-dom 설치)
//Switch : 한번에 하나의 route를 렌더링할 수 있는 방법
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
    return <BrowserRouter>
        <Switch>
            <Route exact path='/react-master'>
                <Coins />
            </Route>
            {/* url이 변수값을 갖는다 */}
            <Route path="/:coinId">
                <Coin />
            </Route>
        </Switch>
    </BrowserRouter>

}

export default Router;