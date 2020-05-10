import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Row, Col, Typography, Layout } from 'antd';
import {
  SEARCH_USERS_SUCCESS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  SEARCH_USERS_ERROR
} from '../store/actions/actionTypes';
import axios from 'axios';
import 'antd/dist/antd.css';

import UsersTable from './Table/UsersTable.js';
import SearchBar from './SearchBar.js';
import LazyLoad from 'react-lazyload';

const { Title } = Typography;

let counter = 0;
function transformData(
  first_name,
  last_name,
  username,
  age,
  gender,
  email,
  country,
  city,
  address
) {
  counter += 1;
  return {
    first_name,
    last_name,
    username,
    age,
    gender,
    email,
    country,
    city,
    address,
    id: counter
  };
}

const Dashboard = props => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '1000', '10000'],
    showSizeChanger: true,
    locale: { items_per_page: '' }
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await axios({
          url: '/users',
          method: 'get',
          transformResponse: [
            function (data) {
              const json = JSON.parse(data);
              let transformedData = [];
              json.forEach(e => {
                transformedData.push(
                  transformData(
                    e.first_name,
                    e.last_name,
                    e.username,
                    e.age,
                    e.gender,
                    e.email,
                    e.country,
                    e.city,
                    e.address
                  )
                );
              });
              console.log(transformedData);
              return transformedData;
            }
          ]
          // params: {
          //   _limit: 20
          // }
        });
        console.log(res.headers['x-total-count']);

        setData(res.data);
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: res.data
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
        dispatch({
          type: FETCH_USERS_ERROR,
          payload: err.message
        });
      }
    };
    fetchUsers();

    //eslint-disable-next-line
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
    setPagination(pagination);
  };

  const submitSearch = async text => {
    try {
      setLoading(true);
      const res = await axios.get(`/users?q=${text}`);

      setData(res.data);
      dispatch({
        type: SEARCH_USERS_SUCCESS,
        payload: res.data
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      dispatch({
        type: SEARCH_USERS_ERROR,
        payload: err.message
      });
    }
  };

  return (
    <div>
      <Layout>
        <Row justify="center" style={{ marginTop: '30px' }}>
          <Col sm={20}>
            <Title style={{ textAlign: 'center' }}>Table Data Viewer</Title>
            <SearchBar
              submitSearch={text => submitSearch(text)}
              loading={loading}
            />
          </Col>
          <Col sm={20}>
            <LazyLoad height={200} offset={100}>
              <UsersTable
                users={data}
                loading={loading}
                pagination={pagination}
                handleTableChange={handleTableChange}
              />
            </LazyLoad>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.user.users
  };
};

export default connect(mapStateToProps)(Dashboard);
