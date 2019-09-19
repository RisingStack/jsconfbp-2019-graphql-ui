import React from 'react';
import { Query } from '@apollo/react-components';

import queries from '../query';

const Hello = () => (
  <Query query={queries.hello.HELLO_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      return (<h1>{data.hello}</h1>);
    }}
  </Query>
);

export default Hello;
