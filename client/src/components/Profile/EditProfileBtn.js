import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editProfile, getProfile } from "../../actions/profileActions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProfileBtn = ({
  profile: { profile },
  editProfile,
  getProfile,
  history,
}) => {
  useEffect(() => {
    // getProfile(id);

    if (profile) {
      setBio(profile.bio);
      setFileName(profile.avatar);
      // setFile();
    }
    if (profile.error) {
      setErrors(profile.error);
    }
    // eslint-disable-next-line
  }, [profile.error, profile.avatar, profile.bio]);

  const [bio, setBio] = useState(profile.bio);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose avatar");
  const [errors, setErrors] = useState("");

  const onBioChange = (e) => setBio(e.target.value);
  let { id } = useParams();

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let editedProfile = new FormData();
    editedProfile.id = id;
    editedProfile.append("bio", bio);
    editedProfile.append("file", file);
    editProfile(editedProfile);
    window.location.reload(false);
  };

  return (
    <div>
      <div className="edit-btn">
        {/*  Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#staticBackdrop1"
        >
          Edit profile
        </button>

        {/*  Modal  */}
        <div
          className="modal fade"
          id="staticBackdrop1"
          data-backdrop="static"
          tabIndex="1"
          role="dialog"
          aria-labelledby="staticBackdropLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel1">
                  Update Profile
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit}>
                  {/* {errors ? (
                    <div className="alert alert-danger"> {errors} </div>
                  ) : null} */}
                  <div className="form-group">
                    <label htmlFor="bio">Edit bio</label>
                    <textarea
                      name="bio"
                      cols="20"
                      rows="4"
                      className="form-control"
                      value={bio}
                      onChange={onBioChange}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile011"
                        aria-describedby="inputGroupFileAddon01"
                        onChange={onFileChange}
                      />
                      <label
                        className="custom-file-label"
                        for="inputGroupFile011"
                      >
                        {fileName}
                      </label>
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="Edit"
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
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EditProfileBtn.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  history: PropTypes.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { editProfile, getProfile })(
  withRouter(EditProfileBtn)
);
