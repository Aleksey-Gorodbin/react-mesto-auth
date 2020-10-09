import React from "react";
import Card from "./Card.js";

function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          aria-label="change-avatar"
          className="profile__avatar-pen"
          onClick={props.onEditAvatar}
        />
        <img
          src={`${props.userAvatar}`}
          alt="аватар"
          className="profile__avatar"
        />
        <div className="profile__info">
          <div className="profile__string">
            <h1 className="profile__name">{props.userName}</h1>
            <button
              type="button"
              aria-label="open"
              className="profile__button-edit"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__position">{props.userDescription}</p>
        </div>
        <button
          type="button"
          aria-label="add"
          className="profile__button-add"
          onClick={props.onAddPlace}
        />
      </section>
      <ul className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            onCardLike={() => props.handleCardLike(card)}
            onCardClick={() => props.handleCardClick(card)}
            onCardDelete={() => props.handleButtonDeleteClick(card)}
            key={card._id}
            url={card.link}
            name={card.name}
            count={card.likes.length}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
