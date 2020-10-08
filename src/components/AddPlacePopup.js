import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleChangePlace(e) {
    setName(e.target.value);
  }
  function handleChangeNewLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add-photo"
      title="Новое место"
      onSubmit={handleSubmit.bind(this)}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <fieldset className="popup__wrapper-input">
        <input
          id="name-place"
          name="place"
          value={name || ""}
          onChange={handleChangePlace}
          className="popup__input"
          type="text"
          placeholder="Название"
          required
        />
        <span id="name-place-error" className="popup__error"></span>
      </fieldset>
      <fieldset className="popup__wrapper-input">
        <input
          type="url"
          id="url-photo"
          name="newLink"
          value={link || ""}
          onChange={handleChangeNewLink}
          className="popup__input"
          type="text"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="url-photo-error" className="popup__error"></span>
      </fieldset>
      <button id="button-create" type="submit" className="popup__button">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
