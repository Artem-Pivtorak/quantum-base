import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const AppBar = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '10px' }}>
      <LanguageSwitcher />
    </header>
  );
};

export default AppBar;