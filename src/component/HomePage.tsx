import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div>
      <div className="box">
        Hi, how are you ?
      </div>
      <Link to="/" className="button is-succes">
        go back
      </Link>
    </div>
  );
};
