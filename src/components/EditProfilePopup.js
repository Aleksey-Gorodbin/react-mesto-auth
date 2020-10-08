import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      onSubmit={handleSubmit.bind(this)}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <fieldset className="popup__wrapper-input">
        <input
          id="name"
          name="name"
          value={name || ""}
          onChange={handleChangeName}
          className="popup__input"
          type="text"
          placeholder="Имя"
          required
        />
      </fieldset>
      <fieldset className="popup__wrapper-input">
        <input
          id="position"
          name="position"
          value={description || ""}
          onChange={handleChangeDescription}
          className="popup__input"
          type="text"
          placeholder="О себе"
          required
        />
        <span id="position-error" className="popup__error"></span>
      </fieldset>
      <button type="submit" className="popup__button popup__button_profile">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
