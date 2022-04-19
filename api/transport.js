import axios from "axios";
import axiosRetry from "axios-retry";

const baseUrl = "https://ik491x7anc.execute-api.us-east-2.amazonaws.com/dev/";
axiosRetry(axios, { retries: 10 });

const Transport = {
  HTTP: {
    sampleGet: (id) =>
      axios({
        url: baseUrl + `sample/${id}`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    samplePost: (data) =>
      axios({
        url: baseUrl + `sample`,
        method: "POST",
        data: data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    // auth
    login: (data) =>
      axios({
        url: "https://ik491x7anc.execute-api.us-east-2.amazonaws.com/dev/auth/admin-login",
        method: "POST",
        data: data,
      }),

    getCategory: (token) =>
      axios({
        url: baseUrl + `category/categories`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    getQuestion: (token) =>
      axios({
        url: baseUrl + `practice/question/getQuestions`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    // quizes
    getQuizesSet: (token) =>
      axios({
        url: 'https://backend-car-dmv.herokuapp.com/api/quiz?limit=5000',
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    updateQuizesSet: (id, token) =>
      axios({
        url: baseUrl + `practice/question/${id}`,
        method: "PATCH",
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    deleteQuizesSet: (id, token) =>
      axios({
        url: baseUrl + `practice/question/getQuestions${id}`,
        method: "PATCH",
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    // flashcard
    addFlashcardSet: (data, token) =>
      axios({
        url: "https://backend-car-dmv.herokuapp.com/api/set/",
        method: "POST",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    getFlashcardSet: (token) =>
      axios({
        url: "https://backend-car-dmv.herokuapp.com/api/set?subject=cards&limit=5000",
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    getVocabularySet: (token) =>
      axios({
        url: "https://backend-car-dmv.herokuapp.com/api/set?subject=vocabulary&limit=5000",
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    getFlashcardSetById: (id, token) =>
      axios({
        url: `https://backend-car-dmv.herokuapp.com/api/set/${id}`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    updateFlashcardSet: (id, data, token) =>
      axios({
        url: `https://backend-car-dmv.herokuapp.com/api/set/${id}`,
        method: "PATCH",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    createCards: (data, token) =>
      axios({
        url: "https://backend-car-dmv.herokuapp.com/api/card",
        method: "POST",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    updateCard: (id, data, token) =>
      axios({
        url: `https://backend-car-dmv.herokuapp.com/api/card/${id}`,
        method: "PATCH",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    deleteSingleCard: (id, token) =>
      axios({
        url: `https://backend-car-dmv.herokuapp.com/api/card/${id}`,
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    deleteManyCards: (setId, token) =>
      axios({
        url: `https://backend-car-dmv.herokuapp.com/api/card?setId=${setId}`,
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    deleteFlashcardSet: (id, token) =>
      axios({
        url: `https://backend-car-dmv.herokuapp.com/api/set/${id}`,
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    getCardsBySetId: (id, token) =>
      axios({
        url: `https://backend-car-dmv.herokuapp.com/api/card?setId=${id}&limit=500`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    // Questions

    getQuestions: (subject) =>
      axios({
        url: `https://backend-car-dmv.herokuapp.com/api/question?subject=${subject}&limit=500`,
        method: "GET",
      }),

    createQuestion: (data, token) =>
      axios({
        url: "https://backend-car-dmv.herokuapp.com/api/question/",
        method: "POST",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    deleteQuestion: (id, token) =>
      axios({
        url: `https://backend-car-dmv.herokuapp.com/api/question/${id}`,
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    updateQuestion: (data) =>
      axios({
        url: `https://backend-car-dmv.herokuapp.com/api/question/${data.id}`,
        method: "PATCH",
        data,
      }),
    deleteManyQuestions: (data) =>
      axios({
        url: 'https://backend-car-dmv.herokuapp.com/api/question',
        method: "DELETE",
        data
      }),

    // Quizes
    addQuizzesSet: (data, token) =>
      axios({
        url: 'https://backend-car-dmv.herokuapp.com/api/quiz',
        method: "POST",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    getQuizzesSet: (token) =>
      axios({
        url: baseUrl + `questionSet/all`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    getQuizzesSetById: (id, token) =>
      axios({
        url: `https://backend-car-dmv.herokuapp.com/api/quiz/${id}`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    updateQuizzesSet: (id, data, token) =>
      axios({
        url: `https://backend-car-dmv.herokuapp.com/api/quiz/${id}`,
        method: "PATCH",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    deleteQuizzesSet: (id, token) =>
      axios({
        url: `https://backend-car-dmv.herokuapp.com/api/quiz/${id}`,
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    // users
    addUser: (data, token) =>
      axios({
        url: baseUrl + `auth/signup`,
        method: "POST",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    updateUser: (data, token) =>
      axios({
        url: baseUrl + `auth/signup`,
        method: "PATCH",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    updateProfile: (email, data, token) =>
      axios({
        url: baseUrl + `auth/user/${email}`,
        method: "PATCH",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    getUsers: (token) =>
      axios({
        url: baseUrl + `auth/getUsers`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    getTeams: (token) =>
      axios({
        url: baseUrl + `auth/getTeams`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    getActiveUsers: (token) =>
      axios({
        url: baseUrl + `analytics/active-users`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    getTotalUsers: (token) =>
      axios({
        url: baseUrl + `analytics/total-users`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    getPremiumUsers: (token) =>
      axios({
        url: baseUrl + `analytics/active-users`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    getUsersReport: (token) =>
      axios({
        url: baseUrl + `analytics/get-reports`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    toggleUserStatus: (data, token) =>
      axios({
        url: baseUrl + `auth/changeStatus`,
        method: "PATCH",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    // membership
    addMembership: (data, token) =>
      axios({
        url: baseUrl + `membership/add`,
        method: "POST",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    updateMembership: (id, data, token) =>
      axios({
        url: baseUrl + `membership/${id}`,
        method: "PATCH",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    getMemberships: (token) =>
      axios({
        url: baseUrl + `membership/all`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    deleteMembership: (id, token) =>
      axios({
        url: baseUrl + `membership/${id}`,
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    addCategory: (data, token) =>
      axios({
        url: baseUrl + `category`,
        method: "POST",
        data: data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    editCategory: (data, token) =>
      axios({
        url: baseUrl + `category/` + data.id,
        method: "PATCH",
        data: data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    getQuestionsByQuizzesSetId: (id, token) =>
      axios({
        url: baseUrl + `practice/question/${id}`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    addQuestion: (id, data, token) =>
      axios({
        url: baseUrl + `practice/question/${id}`,
        method: "POST",
        data: data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    editQuestion: (id, data, token) =>
      axios({
        url: baseUrl + `practice/question/updateQuestion/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    deleteQuestionById: (id, token) =>
      axios({
        url: baseUrl + `practice/question/remove/${id}`,
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
        },
      }),

    addFlashCards: (data, token) =>
      axios({
        url: baseUrl + `flashcards`,
        method: "POST",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    getFlashCards: (token) =>
      axios({
        url: baseUrl + `flashcards`,
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    updateFlashCards: (data, id, token) =>
      axios({
        url: baseUrl + `flashcards/${id}`,
        method: "PATCH",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    sendGroupNotification: (data, token) =>
      axios({
        url: baseUrl + `push-notifications/notify-group`,
        method: "POST",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
    sendSingleNotification: (data, token) =>
      axios({
        url: baseUrl + `push-notifications/notify-single`,
        method: "POST",
        data,
        headers: {
          authorization: "Bearer " + token,
        },
      }),
  },
};
export default Transport;
