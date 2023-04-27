import { useNavigate } from 'react-router-dom';
import { Routes } from '../types';

export const useAppNavigate = () => {
  const navigate = useNavigate();
  const appNavigate = (path: Routes): void => navigate(path);

  return appNavigate;
};
