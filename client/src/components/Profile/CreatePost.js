import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, createPost } from "../../actions/postActions";
import Modal from "../Modal";
const CreatePost = ({
  auth,
  post,
  profile: { profile, loading },
  createPost,
  history,
}) => {
  const [error, setError] = useState("");

  const { id } = useParams();
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
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    createPost(formData);
    history.push(`/profile/${id}`);
    // window.location.reload(false);
  };

  return (
    <div>
      {/* create post modal */}
      {profile._id === auth.user._id && (
        <div className="row mt-2 ml-3">
          <Modal title="Create post" btnName="Add post">
            <form onSubmit={onSubmit}>
              {error ? (
                <div className="alert alert-danger mt-1 mb-1">{error}</div>
              ) : null}
              <div className="input-group mb-3">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    onChange={onFileChange}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
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
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </form>
          </Modal>
        </div>
      )}
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

  // history: PropTypes.string.isRequired,
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
