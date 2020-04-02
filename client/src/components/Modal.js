import React, { Fragment } from "react";

const Modal = props => {
  return (
    <Fragment>
      {/*  Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#staticBackdrop"
      >
        {props.btnName}
      </button>

      {/*  Modal  */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {props.title}
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
            <div className="modal-body">{props.children}</div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
