import React from "react";

export default class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <section
        className={`popup popup_${this.props.name} ${
          this.props.isOpen ? "popup_opened" : ""
        }`}
      >
        <form
          onSubmit={this.props.onSubmit}
          name={this.props.name}
          action="#"
          className="popup__container"
        >
          <button
            type="button"
            aria-label="close"
            className="popup__button-close"
            onClick={this.props.onClose}
          ></button>
          <h2 className="popup__title">{this.props.title}</h2>
          {this.props.children}
        </form>
      </section>
    )};
}