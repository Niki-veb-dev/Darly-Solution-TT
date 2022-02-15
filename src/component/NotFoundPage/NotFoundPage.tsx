import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => (
  <div>
    <div className="block">Page not found</div>
    <Link to="/" className="button is-succes">
      go back
    </Link>
  </div>
);
