import { Outlet } from 'react-router-dom';
import './assets/css/index.css';

export const App = () => {
    return (
        <main className='app'>
            <Outlet />
        </main>
    )
};
