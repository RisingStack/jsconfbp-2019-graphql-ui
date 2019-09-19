import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import {
  Button, Container, Card, Row, DropdownButton, Dropdown, Form,
} from 'react-bootstrap';
import { get } from 'lodash';
import { DateTime } from 'luxon';

import queries from '../query';

const Posts = () => {
  const [order, setOrder] = useState({ field: 'timestamp', direction: 'desc' });
  const [limit, setLimit] = useState(2);
  const [titleSearchText, setTitleSearchText] = useState('');
  const [filters, setFilters] = useState(null);

  const { loading, data, fetchMore } = useQuery(queries.post.GET_POSTS_QUERY, {
    variables: {
      order,
      offset: 0,
      limit,
      filters,
    },
    fetchPolicy: 'cache-and-network',
  });
  const posts = get(data, 'posts.edges', []);
  const hasNextPage = get(data, 'posts.pageInfo.hasNextPage', false);

  return (
    <Container className="posts">
      <Row className="posts-config">
        <DropdownButton id="dropdown-basic-button" title="Order by">
          <Dropdown.Item
            onClick={() => setOrder({ ...order, field: 'timestamp' })}
            active={order.field === 'timestamp'}
          >
            Created at
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setOrder({ ...order, field: 'title' })}
            active={order.field === 'title'}
          >
            Title
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Order direction">
          <Dropdown.Item
            onClick={() => setOrder({ ...order, direction: 'asc' })}
            active={order.direction === 'asc'}
          >
            Asc
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setOrder({ ...order, direction: 'desc' })}
            active={order.direction === 'desc'}
          >
            Desc
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Pagination">
          <Dropdown.Item onClick={() => setLimit(2)} active={limit === 2}>2</Dropdown.Item>
          <Dropdown.Item onClick={() => setLimit(5)} active={limit === 5}>5</Dropdown.Item>
        </DropdownButton>
        <Form
          inline
          className="config-search"
          onSubmit={(event) => {
            event.preventDefault();
            setFilters(
              titleSearchText
                ? { field: 'title', operation: 'like', value: titleSearchText }
                : null,
            );
          }}
        >
          <Form.Control
            type="text"
            placeholder="Search title"
            className="mr-sm-2"
            value={titleSearchText}
            onChange={(event) => setTitleSearchText(event.target.value)}
          />
          <Button type="submit" variant="primary">Search</Button>
        </Form>
      </Row>
      {posts.map(({ node }) => (
        <Card key={node.id} className="posts-card">
          <Card.Header>{get(node, 'author.username')}</Card.Header>
          <Card.Body className="text-center">
            <Card.Title>{node.title}</Card.Title>
            <Card.Text>{node.description}</Card.Text>
            <Link to={`/post/${node.id}`}>Read</Link>
          </Card.Body>
          <Card.Footer className="text-muted">
            <div>{DateTime.fromISO(node.timestamp).toFormat('HH:mm - dd/LL/yyyy')}</div>
            <div>{`${node.comments.edges.length} comments`}</div>
          </Card.Footer>
        </Card>
      ))}
      <Row className="justify-content-md-center">
        <Button
          className="posts-load-more"
          disabled={loading || !hasNextPage}
          variant="primary"
          // Call fetchMore with new offset
          onClick={() => (
            fetchMore({
              variables: { offset: posts.length },
              // Concat the previous (concated) results with the new results
              updateQuery: (prev, { fetchMoreResult }) => (
                fetchMoreResult
                  ? ({
                    ...prev,
                    posts: {
                      ...prev.posts,
                      // Use the new pageInfo
                      pageInfo: fetchMoreResult.posts.pageInfo,
                      edges: [
                        ...prev.posts.edges,
                        ...fetchMoreResult.posts.edges,
                      ],
                    },
                  })
                  : prev
              ),
            })
          )}
        >
          {(loading || hasNextPage) ? 'Load more' : 'Out of posts'}
        </Button>
      </Row>
    </Container>
  );
};

export default Posts;
