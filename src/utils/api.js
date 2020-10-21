class API {
  constructor(options) {
    this._url = options.url;
    this._cohort = options.cohort;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers["Content-type"];
  }
  //загружаем данные о профиле с сервера--------------
  getInfoUser() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
    })
      .then(this._handleResponse)
      
  }
  //загружаем начальные карточки с сервера------------------
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
    })
      .then(this._handleResponse)
      
  }

  //редактируем профиль-------------
  changeProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
    })
      .then(this._handleResponse)
      
  }

  //добавляем новую карточку-------------
  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._handleResponse)
      
  }

  //Отображение количества лайков карточки-------------
  addLikes(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
    })
      .then(this._handleResponse)
      
  }
  //_______________________________________
  removeLikes(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
    })
      .then(this._handleResponse)
      
  }

  //Удаление карточки-------------------------------------------------
  deleteCards(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
    })
      .then(this._handleResponse)
      
  }
  //смена аватара-------------
  changeAvatar(link) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-type": `${this._contentType}`,
      },
      body: JSON.stringify({
        avatar: `${link}`,
      }),
    })
      .then(this._handleResponse)
      
  }

  
  _handleResponse(result) {
    if (result.ok) {
      return result.json();
    } else {
      console.log("_handleResponse rejection");
      return Promise.reject(result.statusText);
    }
  }
}

//создание экземпляра API______________________________________________________
const api = new API({
  url: "https://api.pzdc.students.nomoreparties.space",
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-type": "application/json",
  },
});

export default api;
