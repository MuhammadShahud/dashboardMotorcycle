import jwt_decode from "jwt-decode";

import { proxy } from "valtio";

const getAuthenticatedUser = () => {
  try {
    const token = sessionStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const state = proxy({
  activeTab: 1,
  authUser: getAuthenticatedUser(),
  users: [],
  teams: [],
  memberships: [],
  flashcards: [],
  quizes: [],
  questions: [],
});

export { state };
