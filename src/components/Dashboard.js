import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Typography, Layout } from 'antd';
import { searchUsers } from '../store/actions/userActions.js';
import 'antd/dist/antd.css';
import DataTable from './Table/DataTable.js';
import SearchBar from './SearchBar.js';

const { Title } = Typography;

const Dashboard = ({ users, searchUsers }) => {
  const [loading, setLoading] = useState(false);

  const submitSearch = text => {
    searchUsers(text);
  };

  return (
    <div>
      <Layout>
        <Row justify="center" style={{ marginTop: '30px' }}>
          <Col sm={20}>
            <Title style={{ textAlign: 'center' }}>
              Table Data Viewer Task
            </Title>
            <SearchBar
              submitSearch={text => submitSearch(text)}
              loading={loading}
            />
          </Col>
          <Col sm={20}>
            <DataTable />
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default connect(null, { searchUsers })(Dashboard);
