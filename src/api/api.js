import Axios from "axios";

const axiosEl = Axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 
    'API-KEY': 'fa2e4be3-d03c-412f-92be-944e07a9f8f0' 
  },
})

export const API = {

  login(formData) {
    return (
      axiosEl.post('auth/login', { ...formData })
      .then((response) => response.data)
    )
  },

  getCaptcha() {
    return (
      axiosEl.get('security/get-captcha-url')
      .then((response) => response.data)
    )
  },

  logout(formData) {
    return (
      axiosEl.delete('auth/login')
      .then((response) => response.data)
    )
  },

  getProfile(userID) {
    return (
      axiosEl.get('profile/' + userID)
        .then((response) => response.data)
    );
  },

  getStatus(userID) {
    return (
      axiosEl.get('profile/status/' + userID)
        .then((response) => response.data)
    );
  },

  uploadNewProfileData(data) {
    return (
      axiosEl.put('profile', data)
        .then((response) => response.data)
    );
  },

  uploadNewProfilePhoto(photo) {
    const formData = new FormData();
    formData.append('image', photo);
    return (
      axiosEl.put('/profile/photo', formData)
        .then((response) => response.data.data)
    );
  },

  changeStatus(text) {
    return (
      axiosEl.put('profile/status', {status: text})
        .then((response) => response.data)
    );
  },

  getUsers(pageSize, currentPage, isFriends, term) {
    return (
      axiosEl.get(`users?count=${pageSize}&page=${currentPage}&friend=${isFriends}&term=${term}`)
        .then((response) => response.data)
    );
  },

  follow(userID) {
    return (
      axiosEl.post(`follow/${userID}`)
        .then((response) => response.data)
    )
  },

  unfollow(userID) {
    return (
      axiosEl.delete(`follow/${userID}`)
        .then((response) => response.data)
    )
  },

  checkAuth() {
    return (
      axiosEl.get('auth/me')
      .then((response) => response.data)
    )
  },
}
