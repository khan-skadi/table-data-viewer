import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

import UsersTable from '../table/UsersTable.js';
import SearchBar from '../search/SearchBar.js';
import LazyLoad from 'react-lazyload';

const { Title, Text } = Typography;

let counter = 0;
let searchCounter = 0;
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
function transformSearchData(
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
  searchCounter += 1;
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
    id: searchCounter
  };
}

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '1000', '10000'],
    locale: { items_per_page: '' }
  });
  const [loading, setLoading] = useState(false);

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
              return transformedData;
            }
          ]
        });

        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();

    //eslint-disable-next-line
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const submitSearch = async text => {
    try {
      setLoading(true);
      const res = await axios({
        url: `/users?q=${text}`,
        method: 'get',
        transformResponse: [
          function (data) {
            const json = JSON.parse(data);
            let transformedData = [];
            json.forEach(e => {
              transformedData.push(
                transformSearchData(
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
            return transformedData;
          }
        ]
      });

      setData(res.data);
      setRowCount(res.data.length);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    searchCounter = 0;
  };

  return (
    <>
      <Row justify="center" style={{ marginTop: '30px' }}>
        <Col sm={20}>
          <Title style={{ textAlign: 'center' }}>Table Data Viewer</Title>
          <SearchBar
            submitSearch={text => submitSearch(text)}
            loading={loading}
          />
        </Col>
        <Col sm={20}>
          {rowCount > 0 && rowCount !== 10000 ? (
            <Text
              style={{ color: '#0390fc' }}
            >{`Found ${rowCount} rows !`}</Text>
          ) : null}
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
    </>
  );
};

export default Dashboard;
