import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTenUsers } from '../store/actions/userActions.js';
import Table from './Table/Table.js';

const Dashboard = ({ users, fetchTenUsers }) => {
  useEffect(() => {
    fetchTenUsers();
  }, [fetchTenUsers]);

  return (
    <div>
      <h1>Welcome to the BtoBet Task</h1>
      {users && users.map((user, index) => <Table key={index} user={user} />)}
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    users: state.user.users
  };
};

export default connect(mapStateToProps, { fetchTenUsers })(Dashboard);
