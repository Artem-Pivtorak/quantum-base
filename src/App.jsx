import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import FramesPage from './pages/FramesPage/FramesPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<FramesPage />} />
      </Route>
    </Routes>
  );
};