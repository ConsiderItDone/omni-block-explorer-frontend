import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.styl';

export default React.memo(() => {
  return (
    <footer>
      <Link to="/">Home</Link> || <Link to="/accounts">Accounts</Link> || <Link to="/blocks">Blocks</Link>
    </footer>
  );
});
