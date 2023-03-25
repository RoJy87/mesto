export class Api {
  constructor({ url, headers }) {
    this._url = url
    this._urlBase = url.baseUrl;
    this._headers = headers;
  }

  _thenFunc = (res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // получить данные пользователя (GET)
  pullUserInfo() {
    return fetch(`${this._url.userUrl}`, {
      headers: this._headers,
    })
      .then(this._thenFunc)
  }

  // заменить данные пользователя (PATCH)
  pushUserInfo(body) {
    return fetch(`${this._url.userUrl}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: body.name,
        about: body.about,
      })
    })
      .then(this._thenFunc)
  }

  // заменить аватар (PATCH)
  changeAvatar(body) {
    return fetch(`${this._url.changeAvatarUrl}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: body.avatar,
      })
    })
      .then(this._thenFunc)
  }

  // получить список всех карточек в виде массива (GET)
  getItems() {
    return fetch(`${this._url.cardsUrl}`, {
      headers: this._headers
    })
      .then(this._thenFunc)
  }

  // добавить карточку (POST)
  pushCard(body) {
    return fetch(`${this._url.cardsUrl}`, {
      method: 'POST',
      body: JSON.stringify({
        name: body.name,
        link: body.link,
        likes: body.likes,
      }),
      headers: this._headers,
    })
      .then(this._thenFunc)
  }

  // удалить карточку (DELETE)
  deleteCard(id) {
    return fetch(`${this._url.cardsUrl}/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._thenFunc)
  }

  // “залайкать” карточку (PUT)
  addLike(id) {
    return fetch(`${this._url.cardsUrl}/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._thenFunc)
  }

  // удалить лайк карточки (DELETE)
  removeLike(id) {
    return fetch(`${this._url.cardsUrl}/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._thenFunc)
  }

  // проверить лайки карточки (GET)
  checkLike() {
    return fetch(`${this._url.cardsUrl}`, {
      headers: this._headers,
    })
      .then(this._thenFunc)
  }

}
