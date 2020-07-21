import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../../actions/postActions";

const Comment = ({
  auth,
  addComment,
  updateComment,
  deleteComment,
  postId,
  commentId,
}) => {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      name: auth.user.name,
      avatar: auth.user.avatar,
      text: text,
    };
    addComment(postId, newComment);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="comment-area">
        <input
          type="text"
          className="comment"
          value={text}
          onChange={onChange}
          name="text"
          placeholder="Add a comment..."
        />
        <input type="submit" className="comment-btn" value="Post" />
      </div>
    </form>
  );
};

Comment.propTypes = {
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addComment,
  deleteComment,
  updateComment,
})(Comment);
