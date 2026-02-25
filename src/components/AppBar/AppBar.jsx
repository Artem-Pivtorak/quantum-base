import Navigation from '../Navigation/Navigation';
import AdminToggle from '../AdminToggle/AdminToggle';

const AppBar = ({ isAdmin, setIsAdmin }) => {
  return (
    <header>
      <Navigation />
      <AdminToggle isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
    </header>
  );
};

export default AppBar;