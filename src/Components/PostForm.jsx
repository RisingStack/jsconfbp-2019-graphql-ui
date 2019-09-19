import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import { Button, Form, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import UserContext from '../Context/UserContext';
import queries from '../query';

const PostForm = ({ history }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const apolloClient = useApolloClient();

  const handleCreatePost = (event) => {
    event.preventDefault();
    if (content && title && description && user && !isLoading) {
      setIsLoading(true);
      apolloClient.mutate({
        mutation: queries.post.CREATE_POST_MUTATION,
        variables: {
          content, author: user.email, title, description,
        },
      }).then(({ data: { post: { createPost: createPostResp } } }) => {
        history.push(`/post/${createPostResp.id}`);
      }).catch(() => {
        alert('Something went wrong...');
        setIsLoading(false);
      });
    }
  };

  return (
    <Container className="postform">
      <h2>Write a Post</h2>
      <Form onSubmit={handleCreatePost}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            maxLength={30}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={description}
            maxLength={100}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows="6"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!content || !title || !description || isLoading}
        >
          {isLoading ? 'Loading…' : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
};

PostForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(PostForm);
