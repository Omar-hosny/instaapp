import React, { useState, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editProfile, getProfile } from "../../actions/profileActions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProfile = ({
  profile: { profile },
  editProfile,
  getProfile,
  history,
}) => {
  useEffect(() => {
    getProfile(id);

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
    // window.location.reload(false);
    getProfile(id);
    history.push(`/profile/${id}`);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5">
            <h2 className="text-center mt-2 mb-3">Edit profile</h2>
            <form onSubmit={onSubmit}>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroupFileAddon01">
                    Edit avatar
                  </span>
                </div>
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={onFileChange}
                  />
                  <label class="custom-file-label" for="inputGroupFile01">
                    {fileName}
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label for="caption">Bio</label>
                <textarea
                  name="bio"
                  cols="20"
                  rows="4"
                  className="form-control"
                  value={bio}
                  onChange={onBioChange}
                />
              </div>

              <input
                type="submit"
                value="Edit"
                className="btn btn-primary mr-1"
              />
              <Link
                type="button"
                className="btn btn-secondary"
                to={`/profile/${id}`}
              >
                Back
              </Link>
            </form>
            {/* <div className="post-img-edit mt-2 mb-2">
              <img
                src={profile.avatar && `/uploads/avatar/${profile.avatar}`}
                alt="avatar"
              />
              
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  history: PropTypes.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { editProfile, getProfile })(
  withRouter(EditProfile)
);
