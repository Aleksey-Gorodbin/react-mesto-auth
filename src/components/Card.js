import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const cardinfoId = React.useContext(CurrentUserContext);
  const card = props.card;
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === cardinfoId._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `card__button-delete ${
    isOwn ? "" : "card__button-delete_hidden"
  }`;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === cardinfoId._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__button ${isLiked ? "card__button_active" : ""}`;

  return (
    <li className="card">
      <button
        aria-label="delete"
        type="button"
        className={cardDeleteButtonClassName}
        onClick={props.onCardDelete}
      />
      <img
        src={props.url}
        alt=""
        className="card__image"
        onClick={props.onCardClick}
      />
      <div className="card__restangle">
        <p className="card__caption">{props.name}</p>
        <div className="card__like">
          <button onClick={props.onCardLike} type="button" className={cardLikeButtonClassName} />
          <p className="card__like-counter">{props.count}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
