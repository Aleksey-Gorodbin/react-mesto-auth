import React from "react";

function ImagePopup(props) {
  return (
    <section
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__wrapper">
        <button
          type="button"
          aria-label="close"
          className="popup__button-close popup__button-close_photo"
          onClick={props.onClose}
        ></button>
        <img src={props.url} className="popup__image" />
        <h2 className="popup__title popup__title_open-photo">{props.title}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
