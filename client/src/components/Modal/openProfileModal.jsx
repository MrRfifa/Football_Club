import React from "react";
import ProfileModal from "./profileModal";
import ChangePasswordModal from "./changePasswordModal";
import ChangeUsernameModal from "./changeUsernameModal";
import TermsandCOnditions from "./TermsandCOnditions";

const OpenProfileModal = () => {
  return (
    <div>
      <ProfileModal />
      <ChangePasswordModal />
      <ChangeUsernameModal />
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalToggle"
        style={{ marginLeft: "1100px", marginBottom: "50px" }}
      >
        Update profile
      </button>

      <TermsandCOnditions />
    </div>
  );
};

export default OpenProfileModal;