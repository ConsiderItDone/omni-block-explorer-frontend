/** @jsxImportSource theme-ui */
import React from 'react';
import { Search, BurgerMenu } from 'components';
import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import { useRouter } from 'utils/hooks';
// import { capitalize } from 'utils/funcs';
import { Button } from 'antd';
import {useStyles} from './styles'

//eslint-disable-next-line
const arrowLeft = require('images/arrow-left.png');

export default React.memo(() => {
  const { pathname, navigate } = useRouter();
  const title = pathname.split('/')[1] + 's';
  const styles = useStyles();

  return (
    <header sx={styles}>
      {window.innerWidth <= RESPONSIVE_BREAKPOINTS.tablet &&
        (pathname.split('/')[2] ? (
          <Button className="back-btn" onClick={() => navigate(-1)}>
            <img src={arrowLeft} />
          </Button>
        ) : (
          <BurgerMenu />
        ))}
      {(ROUTES[title] && <h2>{title.replace('_',' ')}</h2>) || <h2>Dashboard</h2>}
      <Search />
    </header>
  );
});
