import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { SEARCH_USERS_SUCCESS } from '../../store/actions/actionTypes';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import 'antd/dist/antd.css';

const getRandomuserParams = params => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params
  };
};

const DataTable = ({ users }) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    // data: users,
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '1000', 'Show All values']
    // loading: false
  });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const pagination = {
      data: [],
      current: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100', '1000', 'Show All values'],
      loading: false
    };
    fetch({ pagination });

    // eslint-disable-next-line
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

  // , {
  //   data: getRandomuserParams(params)
  // }

  const fetch = (params = {}) => {
    setLoading(true);
    axios
      .get('/users', {
        data: getRandomuserParams(params)
      })
      .then(data => {
        console.log(params.pagination);
        console.log(data);
        setLoading(false);

        dispatch({
          type: SEARCH_USERS_SUCCESS,
          payload: data.data
        });
        setData(data.data);
        setPagination({
          // ...params.pagination,
          data: users,
          total: pagination.total
        });
      });
  };

  let searchInput;
  const getColumnSearchProps = dataIndex => ({
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
          placeholder={`Search ${dataIndex}`}
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
    setSearchText({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      sortDirections: ['ascend', 'descend'],
      key: 'first_name',
      ...getColumnSearchProps('first_name')
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

const mapStateToProps = state => {
  return {
    users: state.user.users
  };
};

export default connect(mapStateToProps)(DataTable);
