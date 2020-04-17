import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost, updatePost } from "../actions/postActions";
import { useParams, Link } from "react-router-dom";
import Modal from "./Modal";

const EditPost = ({
  post: { current, error },
  getPost,
  updatePost,
  history,
}) => {
  let { id } = useParams();
  useEffect(() => {
    getPost(id);
    if (error !== null) {
      setErrors(error);
    }
    // eslint-disable-next-line
  }, [getPost, error]);

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose photo");
  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState("");

  const onCaptionChange = (e) => setCaption(e.target.value);
  const onFilechange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let editedPost = new FormData();
    editedPost._id = id;
    editedPost.append("file", file);
    editedPost.append("caption", caption);

    updatePost(editedPost);
    getPost(id);
    history.push(`/edit-post/${id}`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5">
          <div className="mb-2">
            <Modal title="Edit post" btnName="Edit">
              <form onSubmit={onSubmit}>
                {errors ? (
                  <div className="alert alert-danger"> {errors} </div>
                ) : null}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroupFileAddon01"
                    >
                      Upload
                    </span>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                      onChange={onFilechange}
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
            <Link
              type="button"
              className="btn btn-secondary ml-1"
              // to={`/profile/${current.userId}`}
              to="/"
            >
              Back
            </Link>
          </div>
          <div className="post-img-edit">
            <img src={current.photo && `/uploads/${current.photo}`} alt="" />
            {current.caption && (
              <div className="mt-1 ml-1">
                <h5>{current.caption}</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

EditPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost, updatePost })(EditPost);
