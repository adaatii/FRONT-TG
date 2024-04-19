import { Route, Routes as Switch, BrowserRouter } from 'react-router-dom';
import Main from '../views/pages/Main/main';
import Login from '../views/pages/Login/login';
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/main" element={<Main />} />
        </Switch>
    </BrowserRouter>
);

export default Routes;