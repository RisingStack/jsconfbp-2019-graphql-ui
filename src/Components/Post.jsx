import React, { useState, useContext } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import {
  Button, Container, Card, Row, Jumbotron, Spinner, Form,
} from 'react-bootstrap';
import { get } from 'lodash';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';

import UserContext from '../Context/UserContext';
import queries from '../query';

const Post = ({ postId }) => {
  const [commentContent, setCommentContent] = useState('');
  const [commentCreateIsLoading, setCommentCreateIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const apolloClient = useApolloClient();

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

  const {
    loading: commentIsLoading,
    data: commentsData,
    fetchMore: fetchMoreComment,
    refetch: refetchComments,
  } = useQuery(queries.comment.GET_COMMENTS_QUERY, {
    variables: {
      filters: [{ field: 'post', operation: 'eq', value: postId }],
      order: {
        field: 'timestamp',
        direction: 'desc',
      },
      offset: 0,
      limit: 3,
    },
    fetchPolicy: 'cache-and-network',
  });
  const comments = get(commentsData, 'comments.edges', []);
  const hasNextCommentPage = get(commentsData, 'comments.pageInfo.hasNextPage', false);

  const handleCreateComment = (event) => {
    event.preventDefault();
    if (commentContent && user && !commentCreateIsLoading) {
      setCommentCreateIsLoading(true);
      apolloClient.mutate({
        mutation: queries.comment.CREATE_COMMENT_MUTATION,
        variables: {
          content: commentContent, author: user.email, post: postId,
        },
      }).then(() => {
        setCommentCreateIsLoading(false);
        setCommentContent('');
        refetchComments();
      }).catch(() => {
        alert('Something went wrong...');
        setCommentCreateIsLoading(false);
      });
    }
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
          onClick={() => (
            fetchMoreComment({
              variables: { offset: comments.length },
              updateQuery: (prev, { fetchMoreResult }) => (
                fetchMoreResult
                  ? ({
                    ...prev,
                    comments: {
                      ...prev.comments,
                      pageInfo: fetchMoreResult.comments.pageInfo,
                      edges: [
                        ...prev.comments.edges,
                        ...fetchMoreResult.comments.edges,
                      ],
                    },
                  })
                  : prev
              ),
            })
          )}
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
