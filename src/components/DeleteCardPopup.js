import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function DeleteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard();
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit.bind(this)}
    >
      <button
        id="button-delete"
        type="submit"
        className="popup__button popup__button_delete-card"
      >
        Да
      </button>
    </PopupWithForm>
  );
}

export default DeleteCardPopup;
