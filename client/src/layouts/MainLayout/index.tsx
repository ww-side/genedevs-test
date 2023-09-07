import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-default bg-light-grey">
      <Outlet />
    </div>
  );
};

export default MainLayout;
