import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

const columns = [
  {
    title: 'First Name',
    dataIndex: 'first_name',
    sorter: (a, b) => a.first_name.localeCompare(b.first_name),
    sortDirections: ['ascend', 'descend'],
    key: 'first_name'
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    sorter: (a, b) => a.last_name.localeCompare(b.last_name),
    sortDirections: ['ascend', 'descend'],
    key: 'last_name'
  },
  {
    title: 'Username',
    dataIndex: 'username',
    sorter: (a, b) => a.username.localeCompare(b.username),
    sortDirections: ['ascend', 'descend'],
    key: 'username'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
    sortDirections: ['ascend', 'descend'],
    key: 'age'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    sorter: function (a, b) {
      if (a['gender'] === b['gender']) {
        return 0;
      }
      return a['gender'] < b['gender'] ? -1 : 1;
    },
    sortDirections: ['ascend', 'descend'],
    key: 'gender'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortDirections: ['ascend', 'descend'],
    key: 'email'
  },
  {
    title: 'Country',
    dataIndex: 'country',
    sorter: (a, b) => a.country.localeCompare(b.country),
    sortDirections: ['ascend', 'descend'],
    key: 'country'
  },
  {
    title: 'City',
    dataIndex: 'city',
    sorter: (a, b) => a.city.localeCompare(b.city),
    sortDirections: ['ascend', 'descend'],
    key: 'city'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
    sortDirections: ['ascend', 'descend'],
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
    fetch({ pagination });

    //eslint-disable-next-line
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters
    });
  };

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
          total: data.data && data.data.length
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
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default DataTable;
