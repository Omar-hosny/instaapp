import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, createPost } from "../../actions/postActions";
import Posts from "./Posts";

const CreatePost = ({
  auth,
  post: { error },
  profile: { profile, loading },
  createPost,
  history,
}) => {
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (error !== "") {
      setErrors(error);
    }
  }, [error]);

  // const { id } = useParams();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose photo");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onCaptionChange = (e) => setCaption(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setErrors("Please upload a photo.");
      clearError();
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caption", caption);
      createPost(formData);
      history.push("/");
      // window.location.reload(false);
    }
  };

  const clearError = () => {
    setTimeout(() => {
      setErrors("");
    }, 3000);
  };

  return (
    <div className="container">
      {/* create post  */}
      <div className="row create">
        <div className="col-md-6 mx-auto mt-5">
          <h3 className="mt-3 mb-4">Create post</h3>
          <form onSubmit={onSubmit}>
            {errors ? (
              <div className="alert alert-danger mt-1 mb-1">{errors}</div>
            ) : null}
            <div className="input-group mb-3">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  onChange={onFileChange}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  {fileName}
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="caption">Caption</label>
              <input
                type="text"
                className="form-control"
                value={caption}
                onChange={onCaptionChange}
              />
            </div>
            <input
              type="submit"
              value="Post"
              className="btn btn-primary mr-1"
            />
            <Link
              to={`/profile/${auth.user._id}`}
              className="btn btn-secondary"
            >
              back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

CreatePost.propTypes = {
  //   getPosts: PropTypes.func.isRequired,
  //   getProfile: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,

  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  createPost,
  getPosts,
})(CreatePost);
