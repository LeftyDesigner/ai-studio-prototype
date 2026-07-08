import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { SideNav } from './SideNav';
import './AppLayout.css';

export function AppLayout() {
  const { pathname } = useLocation();
  const isDashboard = pathname === '/dashboard' || pathname === '/';

  return (
    <div className="app-layout">
      <Header />
      <div className="app-layout__body">
        <SideNav />
        <main className={`app-layout__main${isDashboard ? ' app-layout__main--gray' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
