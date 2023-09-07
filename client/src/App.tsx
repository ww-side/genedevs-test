import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { routers } from './routers';

const App: FC = () => {
  return <RouterProvider router={routers()} />;
};

export default App;
