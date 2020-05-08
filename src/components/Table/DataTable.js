import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

const columns = [
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name'
  },
  {
    title: 'Last Name',
    dataIndex: 'first_name',
    key: 'last_name'
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country'
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }
];

const getRandomuserParams = params => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params
  };
};

const DataTable = ({ users }) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch({ pagination });

    //eslint-disable-next-line
  }, []);

  const fetch = (params = {}) => {
    setLoading(true);
    axios
      .get('/users', {
        data: getRandomuserParams(params)
      })
      .then(data => {
        setLoading(false);
        setData(data.data);
        setPagination({
          ...params.pagination,
          total: data.totalCount
        });
      });
  };

  return (
    <div>
      <Table
        columns={columns}
        rowKey={(record, index) => index}
        dataSource={data}
        loading={loading}
      />
    </div>
  );
};

export default DataTable;
