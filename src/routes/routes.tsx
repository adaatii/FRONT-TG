import { Route, Routes as Switch, BrowserRouter } from 'react-router-dom';
import Main from '../views/pages/Main/main';
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" element={<Main />} />
        </Switch>
    </BrowserRouter>
);

export default Routes;