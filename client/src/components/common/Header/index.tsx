import { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  };

  return (
    <div className="flex justify-between p-5 bg-white mb-5 shadow-md">
      <div className="flex gap-5">
        <Link to="/">Home</Link>
        <Link to="/create-test">Create test</Link>
      </div>
      <div className="cursor-pointer" onClick={handleLogout}>
        Log Out
      </div>
    </div>
  );
};

export default Header;
