import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default class EditAvatarPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onUpdateAvatar({link: this.textInput.value});
    this.textInput.value = '';
  }

  render(){
  return (
    <PopupWithForm
          name="change-avatar"
          title="Обновить аватар"
          isOpen={this.props.isOpen}
          onClose={this.props.onClose}
          onSubmit={this.handleSubmit.bind(this)}
        >
          <fieldset className="popup__wrapper-input">
            <input
              type="url"
              ref={(input) => { this.textInput = input }}
              id="url-avatar"
              name="avatar"
              className="popup__input"
              placeholder="Ссылка на аватар"
              required
            />
            <span id="url-avatar-error" className="popup__error"></span>
          </fieldset>
          <button
            id="change-avatar-button"
            type="submit"
            className="popup__button"
          >
            Сохранить
          </button>
        </PopupWithForm>
    
  )};
}

