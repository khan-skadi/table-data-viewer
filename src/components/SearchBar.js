import React from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';

const { Search } = Input;

const SearchBar = ({ loading, submitSearch }) => {
  return (
    <Search
      placeholder="Search for a user.."
      loading={loading}
      enterButton="Search"
      onSearch={value => submitSearch(value)}
      size="large"
      style={{ marginBottom: '10px' }}
    />
  );
};

export default SearchBar;
