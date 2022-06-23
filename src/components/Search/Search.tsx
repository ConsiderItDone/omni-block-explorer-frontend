/** @jsxImportSource theme-ui */
import React, { useEffect, useState, useRef } from 'react';
import { Input, Button, notification } from 'antd';
import { useQuery } from '@apollo/client';
import { Search as SearchType } from 'queries/__generated__/Search';
import { SEARCH } from 'queries';
import { useNavigate } from 'react-router';
import { RESPONSIVE_BREAKPOINTS, ROUTES } from 'utils/consts';
import { changeAddressPrefix } from 'utils/funcs';
import styles from './styles';

const Search = Input.Search;
/* eslint-disable @typescript-eslint/no-var-requires */
const searchImg = require('images/search.png');

export default React.memo(() => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const inputRef = useRef(null);
  const [mobileActive, setMobileActive] = useState<boolean>(false);
  const { data, loading } = useQuery<SearchType>(SEARCH, {
    skip: !searchValue,
    errorPolicy: 'ignore',
    variables: { value: searchValue },
  });
  const handleSearch = (input: string) => {
    const value = input.trim();
    //Checking if input is address, because there is no other way to check if input is address/hash/blockNumber
    if (value.length === 48) {
      const [parsed, error] = changeAddressPrefix(value);
      if (error) {
        notification.error({
          message: `Error`,
          description: error.message,
        });
        setSearchValue('');
        return;
      }
      setSearchValue(parsed);
      return;
    }
    setSearchValue(value);
  };

  useEffect(() => {
    if (!data) return;
    setSearchValue('');
    mobileActive && setMobileActive(false);

    const { accountByAddress, blockByBlockNumber, blockByHash, extrinsicById } = data;

    const result =
      (accountByAddress?.address && `${ROUTES.accounts}/${accountByAddress?.address}`) ||
      (blockByBlockNumber?.number && `${ROUTES.blocks}/${blockByBlockNumber?.number}`) ||
      (blockByHash?.hash && `${ROUTES.blocks}/${blockByHash?.hash}`) ||
      (extrinsicById?.block && `${ROUTES.extrinsics}/${extrinsicById?.block.number + '-' + extrinsicById.index}`);

    if (!result) {
      notification.error({
        message: 'Error',
        description: `${searchValue} was not found`,
      });
      return;
    }
    inputRef.current.state.value = '';
    inputRef.current.blur();

    navigate(result);
  }, [data]);

  const searchBar = (
    <Search
      className="search"
      sx={styles.search}
      loading={loading}
      placeholder="Search by Block, Extrinsic, Account"
      ref={inputRef}
      onSearch={handleSearch}
    />
  );

  return window.innerWidth <= RESPONSIVE_BREAKPOINTS.md ? (
    <>
      <Button className="search-btn" onClick={() => setMobileActive(true)}>
        <img src={searchImg} alt="Search icon" />
      </Button>
      <div sx={styles.searchMobile} className={`search-mobile${mobileActive ? ' active' : ''}`}>
        {searchBar}
        <Button onClick={() => setMobileActive(false)}>x</Button>
      </div>
    </>
  ) : (
    searchBar
  );
});
