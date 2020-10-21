import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import ProtectedRoute from "./ProtectedRoute.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register.js";
import Login from "./Login.js";
import * as auth from "../utils/utils";
import InfoTooltip from "./InfoTooltip.js";
import win from "../images/win.svg";
import loss from "../images/loss.svg";

function App() {
  //Открытие и закрытие попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = React.useState(false);
  const [failPopupOpen, setFailPopupOpen] = React.useState(false);
  //Данные карточки для открытия попапа с фото
  const [selectedCard, setSelectedCard] = React.useState({});
  //Загрузка с сервера данных страницы
  const [currentUser, setCurrentUser] = React.useState({});
  //Загрузка карточек
  const [cards, setCards] = React.useState([]);

  // Переменная для настройки роутинга
  const [loggedIn, setLoggedIn] = React.useState(false);

  function handleRegisterPopupOpen() {
    loggedIn
      ? setSuccessPopupOpen(!successPopupOpen)
      : setFailPopupOpen(!failPopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleButtonDeleteClick(selectedCard) {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setSelectedCard(selectedCard);
  }

  function handleCardClick(selectedCard) {
    setIsImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(selectedCard);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSuccessPopupOpen(false);
    setFailPopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .addLikes(card._id)
        .then((newCard) => {
          // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          // Обновляем стейт
          setCards(newCards);
        })
        .catch((err) => {
          console.error(err.message);
        });
    } else {
      api
        .removeLikes(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  }

  function handleCardDelete() {
    api
      .deleteCards(selectedCard._id)
      .then(() => {
        const newCards = cards.filter(function (c) {
          return c._id !== selectedCard._id;
        });
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  function handleUpdateUser(dataProfile) {
    api
      .changeProfile(dataProfile.name, dataProfile.about)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(dataAvatar) {
    api
      .changeAvatar(dataAvatar.link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  function handleAddPlaceSubmit(infoNewCard) {
    api
      .addNewCard(infoNewCard.name, infoNewCard.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  React.useEffect(() => {
    Promise.all([api.getInfoUser(), api.getInitialCards()])
      .then(([result, data]) => {
        setCurrentUser(result);
        setCards(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const history = useHistory();

  const tokenCheck = () => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push("/profile");
        } else {
          localStorage.removeItem("jwt");
        }
      });
    }
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const onAuth = () => {
      setLoggedIn(true);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Switch>
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            userName={currentUser.name}
            userDescription={currentUser.about}
            userAvatar={currentUser.avatar}
            cards={cards}
            handleCardLike={handleCardLike}
            handleCardClick={handleCardClick}
            handleButtonDeleteClick={handleButtonDeleteClick}
          />
          <Route path="/sign-in">
            <Login onAuth={onAuth} tokenCheck={tokenCheck} />
          </Route>
          <Route path="/sign-up">
            <Register onAuth={onAuth} popup={handleRegisterPopupOpen} />
          </Route>
          <Route>
            {<Redirect to={`/${loggedIn ? "profile" : "sign-in"}`} />}
          </Route>
        </Switch>
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <DeleteCardPopup
          onDeleteCard={handleCardDelete}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
        />

        <ImagePopup
          name="open-photo"
          url={selectedCard.link}
          title={selectedCard.name}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          title="Вы успешно зарегистрировались!"
          image={win}
          isOpen={successPopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          title="Что-то пошло не так!
Попробуйте ещё раз."
          image={loss}
          isOpen={failPopupOpen}
          onClose={closeAllPopups}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
