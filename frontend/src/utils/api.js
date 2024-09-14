class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  handleRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getFetch(url, method, body) {
    return fetch(`${this._baseUrl}/${url}`, {
      method,
      headers: this._headers,
      body,
    }).then(this.handleRes);
  }

  getInitialCards() {
    return this.getFetch("cards", "GET");
  }
  getUserInfo() {
    return this.getFetch("users/me", "GET");
  }
  updateUserInfo(name, about) {
    return this.getFetch(
      "users/me",
      "PATCH",
      JSON.stringify({
        name,
        about,
      })
    );
  }

  addCard(name, link) {
    return this.getFetch(
      "cards",
      "POST",
      JSON.stringify({
        name,
        link,
      })
    );
  }

  deleteCard(cardId) {
    return this.getFetch(
      `cards/${cardId}`,
      "DELETE",
      JSON.stringify({
        cardId,
      })
    );
  }

  handleLike(id, isLiked) {
    if (isLiked) {
      return this.addLike(id);
    }
    return this.removeLike(id);
  }

  addLike(id) {
    return this.getFetch(
      `cards/${id}/likes`,
      "PUT",
      JSON.stringify({
        id,
      })
    );
  }
  removeLike(id) {
    return this.getFetch(
      `cards/${id}/likes`,
      "DELETE",
      JSON.stringify({
        id,
      })
    );
  }
  updateAvatar(avatar) {
    return this.getFetch(
      `users/me/avatar`,
      "PATCH",
      JSON.stringify({
        avatar,
      })
    );
  }
}

const api = new Api(`https://api.aroundfull.chickenkiller.com`, {
  "Content-Type": "application/json",
  Authorization: "Bearer "+localStorage.getItem("token") || "",
});

export default api;
