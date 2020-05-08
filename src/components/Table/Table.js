import React from 'react';

const Table = ({ user }) => {
  return (
    <div>
      <p>
        <span>{user.first_name}</span>
        <span>{user.last_name}</span>
        <span>{user.username}</span>
        <span>{user.age}</span>
        <span>{user.gender}</span>
        <span>{user.email}</span>
        <span>{user.country}</span>
        <span>{user.city}</span>
        <span>{user.address}</span>
      </p>
    </div>
  );
};

export default Table;
