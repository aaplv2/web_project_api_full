class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    
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
      headers:  {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token") || "",
      },
      body,
    }).then(this.handleRes);
  }

  getUserInfo() {
    return this.getFetch("users/me", "GET");
  }

  getInitialCards() {
    return this.getFetch("cards", "GET");
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

  handleLike(id, userId, isLiked) {
    if (isLiked) {
      return this.addLike(id, userId);
    }
    return this.removeLike(id, userId);
  }

  addLike(id, userId) {
    return this.getFetch(
      `cards/${id}/likes`,
      "PUT",
      JSON.stringify({
        userId,
      })
    );
  }
  removeLike(id, userId) {
    return this.getFetch(
      `cards/${id}/likes`,
      "DELETE",
      JSON.stringify({
        userId,
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

const api = new Api(`https://api.aroundfull.chickenkiller.com`);

export default api


