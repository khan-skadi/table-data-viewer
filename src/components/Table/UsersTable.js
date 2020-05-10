import React, { useState, createRef } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';

const UsersTable = ({ users, loading, pagination, handleTableChange }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  let searchInput = createRef();
  const getColumnSearchProps = (dataIndex, nameText) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search by ${nameText}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sortDirections: ['ascend', 'descend'],
      key: 'id'
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      render(text, record) {
        return {
          props: {
            style: { background: '#0390fc' }
          },
          children: <div>{text}</div>
        };
      },
      sortDirections: ['ascend', 'descend'],
      key: 'first_name',
      ...getColumnSearchProps('first_name', 'First Name')
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      sortDirections: ['ascend', 'descend'],
      key: 'last_name',
      ...getColumnSearchProps('last_name', 'Last Name')
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
      sortDirections: ['ascend', 'descend'],
      key: 'username',
      ...getColumnSearchProps('username', 'Username')
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
      sortDirections: ['ascend', 'descend'],
      key: 'age',
      ...getColumnSearchProps('age', 'Age')
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
      key: 'gender',
      ...getColumnSearchProps('gender', 'Gender')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ['ascend', 'descend'],
      key: 'email',
      ...getColumnSearchProps('email', 'Email')
    },
    {
      title: 'Country',
      dataIndex: 'country',
      sorter: (a, b) => a.country.localeCompare(b.country),
      sortDirections: ['ascend', 'descend'],
      key: 'country',
      ...getColumnSearchProps('country', 'Country')
    },
    {
      title: 'City',
      dataIndex: 'city',
      sorter: (a, b) => a.city.localeCompare(b.city),
      sortDirections: ['ascend', 'descend'],
      key: 'city',
      ...getColumnSearchProps('city', 'City')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortDirections: ['ascend', 'descend'],
      key: 'address',
      ...getColumnSearchProps('address', 'Address')
    }
  ];

  return (
    <div>
      <Table
        columns={columns}
        rowKey={(record, index) => index}
        dataSource={users}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{
          y: 385
        }}
      />
    </div>
  );
};

export default UsersTable;
