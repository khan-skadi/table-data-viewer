import React from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';

const { Search } = Input;

const SearchBar = ({ submitSearch, loading }) => {
  return (
    <Search
      placeholder="Search for a user.."
      loading={loading}
      enterButton="Search"
      size="large"
      onSearch={value => submitSearch(value)}
      style={{ marginBottom: '10px' }}
    />
  );
};

export default SearchBar;
