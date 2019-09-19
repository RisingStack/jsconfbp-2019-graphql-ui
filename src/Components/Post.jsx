import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  Button, Container, Card, Row, Jumbotron, Spinner, Form,
} from 'react-bootstrap';
import { get } from 'lodash';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';

import queries from '../query';

const Post = ({ postId }) => {
  const [commentContent, setCommentContent] = useState('');
  const [commentCreateIsLoading] = useState(false);

  const {
    loading: postIsLoading,
    data: postsData,
  } = useQuery(queries.post.GET_POSTS_QUERY, {
    variables: {
      filters: [{ field: 'id', operation: 'eq', value: postId }],
      limit: 1,
    },
  });
  const post = get(postsData, 'posts.edges[0].node', {});

  // TODO: TASK 4. query comments
  const commentIsLoading = false;
  const comments = [];
  const hasNextCommentPage = false;

  // TODO: TASK 4. EXTRA handleCreateComment
  const handleCreateComment = (event) => {
    event.preventDefault();
    console.log('handleCreateComment');
  };

  return (
    <Container className="post">
      {postIsLoading
        ? <div className="post-loader"><Spinner animation="border" /></div>
        : (
          <Jumbotron>
            <h1>{post.title}</h1>
            <footer className="blockquote-footer">
              {get(post, 'author.username')}
              <div>{DateTime.fromISO(post.timestamp).toFormat('HH:mm - dd/LL/yyyy')}</div>
            </footer>
            <br />
            <p>{post.description}</p>
            <p>{post.content}</p>
          </Jumbotron>
        )}
      <div className="post-commentForm">
        <h4>Write a comment</h4>
        <Form onSubmit={handleCreateComment}>
          <Form.Control
            as="textarea"
            rows="3"
            value={commentContent}
            onChange={(event) => setCommentContent(event.target.value)}
          />
          <Button
            className="commentForm-submit"
            variant="primary"
            type="submit"
            disabled={!commentContent || commentCreateIsLoading}
          >
            {commentCreateIsLoading ? 'Loading…' : 'Submit'}
          </Button>
        </Form>
      </div>
      {comments.map(({ node }) => (
        <Card key={node.id} className="comments-card">
          <Card.Header>
            {get(node, 'author.username')}
            <div className="comment-date">
              {DateTime.fromISO(node.timestamp).toFormat('HH:mm - dd/LL/yyyy')}
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Text>{node.content}</Card.Text>
          </Card.Body>
        </Card>
      ))}
      <Row className="justify-content-md-center">
        <Button
          className="comments-load-more"
          disabled={commentIsLoading || !hasNextCommentPage}
          variant="primary"
          // TODO: TASK 4. fetch more comments
          onClick={() => (console.log('fetchMoreComment'))}
        >
          {(commentIsLoading || hasNextCommentPage) ? 'Load more' : 'Out of comments'}
        </Button>
      </Row>
    </Container>
  );
};

Post.propTypes = {
  postId: PropTypes.string.isRequired,
};


export default Post;
