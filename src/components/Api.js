export default class Api {
  constructor ({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._token = headers['authorization'];
  }

  getInitialCards (callbackFunction) {
    fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._isItOk)
    .then(callbackFunction)
    .catch(this._error)
  }

  postCard (newCardData, callbackFunction) {
    fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": newCardData.name,
        "link": newCardData.link,
      })
    })
    .then(this._isItOk)
    .then(callbackFunction)
    .catch(this._error)
  }

  deleteCard (cardId, callbackFunction) {
    fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._isItOk)
    .then(callbackFunction)
    .catch(this._error)
  }

  addLike (cardId, callbackFunction) {
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(this._isItOk)
    .then(callbackFunction)
    .catch(this._error)
  }

  deleteLike (cardId, callbackFunction) {
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._isItOk)
    .then(callbackFunction)
    .catch(this._error)
  }

  getUserInfo (callbackFunction) {
    fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._isItOk)
      .then(callbackFunction)
      .catch(this._error)
  }

  editUserInfo (data, callbackFunction) {
    fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar
      })
    })
    .then(this._isItOk)
    .then(callbackFunction)
    .catch(this._error)
  }

  editUserAvatar (data, callbackFunction) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._isItOk)
    .then(callbackFunction)
    .catch(this._error)
  }

  _isItOk(res) {
    if (res.ok) {
      return res.json();
    } else {
    return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _error(err) {
    alert(`
      К сожалению что-то пошло не так.
      ${err}

      Перепроверьте данные
      и повторите попытку
    `);
  }
}
