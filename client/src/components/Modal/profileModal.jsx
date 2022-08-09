import React from "react";

const ProfileModal = () => {
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalToggle"
        data-backdrop="false"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Welcome to your profile settings</div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                Change password
              </button>
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle3"
                data-bs-toggle="modal"
              >
                Change username
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
