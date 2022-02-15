/* eslint-disable react/react-in-jsx-scope */
import {
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './component/HomePage';
import { LoginPage } from './component/LoginPage';
import { NotFoundPage } from './component/NotFoundPage';

export const App: React.FC = () => {
  return (
    <div className="starter">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
