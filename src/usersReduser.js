import * as axios from "axios";
const GET__USERS = "GET__USERS";
const SET__CURRENT__USER = "SET__CURRENT__USER";
const SET__USER__SIZE = "SET__USER__SIZE";
const SET__TRAINING__LIST = "SET__TRAINING__LIST";
const SET__RECORDS__LIST = "SET__RECORDS__LIST";
const SET__INIT = "SET__INIT";
const SET__ADMIN = "SET__ADMIN";
const SET__FETCHING = "SET__FETCHING";
const SET__LOAD = "SET__LOAD";

let initialState = {
  users: [],
  currentUser: {},
  isInit: false,
  isFetching: false,
  isLoad: false,
  admin: null
};

const usersReduser = (state = initialState, action) => {
  if (action.type === SET__LOAD) {
    return {
      ...state,
      isLoad: action.isLoad,
    };
  }
  if (action.type === SET__FETCHING) {
    return {
      ...state,
      isFetching: action.isFetching,
    };
  }
  if (action.type === SET__INIT) {
    return {
      ...state,
      isInit: action.init,
    };
  }
  if (action.type === SET__ADMIN) {
    return {
      ...state,
      admin: action.admin,
    };
  }
  if (action.type === GET__USERS) {
    return {
      ...state,
      users: action.users,
    };
  }
  if (action.type === SET__CURRENT__USER) {
    return {
      ...state,
      currentUser: action.user,
    };
  }
  if (action.type === SET__USER__SIZE) {
    return {
      ...state,
      currentUser: { ...state.currentUser, size: action.size },
    };
  }
  if (action.type === SET__RECORDS__LIST) {
    return {
      ...state,
      currentUser: { ...state.currentUser, records: action.recordList },
    };
  }
  if (action.type === SET__TRAINING__LIST) {
    return {
      ...state,
      currentUser: { ...state.currentUser, program: action.program },
    };
  }

  return state;
};

export let setInit = (init) => ({ type: SET__INIT, init });
export let setAdmin = (admin) => ({ type: SET__ADMIN, admin });
export let setLoad = (isLoad) => ({ type: SET__LOAD, isLoad });
export let setFetching = (isFetching) => ({ type: SET__FETCHING, isFetching });
export let setCurrentUser = (user) => ({ type: SET__CURRENT__USER, user });
export let setUserSize = (size) => ({ type: SET__USER__SIZE, size });
export let setTrainingList = (program) => ({
  type: SET__TRAINING__LIST,
  program,
});
export let addRecordToList = (recordList) => ({
  type: SET__RECORDS__LIST,
  recordList,
});
export let getUsers = (users) => ({ type: GET__USERS, users });
export const getUsersFromAPI = () => {
  return (dispatch) => {
    setFetching(true);
    axios
      .get("https://training-program-40a94.firebaseio.com/users.json")
      .then((response) => {
        dispatch(getUsers(response.data))
        dispatch(setFetching(false))
      });
  };
};
export let addUser = (userName, users) => {
  return (dispatch) => {
    let user = {
      name: userName,
      records: ["рекорд"],
      program: [
        {
          title: "первая тренировка",
          data: new Date().toLocaleDateString(),
          body: "упражнения",
        },
      ],
      size: {
        вес: "0",
        грудь: "0",
        талия: "0",
        бедра: "0",
        бедро: "0",
        рука: "0",
      },
    };
    users.push(user);
    dispatch(setFetching(true));
    axios
      .put("https://training-program-40a94.firebaseio.com/users.json", users)
      .then((response) => {
        dispatch(getUsers(Object.values(response.data)));
        dispatch(setFetching(false));
      });
  };
};
export let removeUser = (users) => {
  return (dispatch) => {
    dispatch(setFetching(true));
    axios
      .put(`https://training-program-40a94.firebaseio.com/users.json`, users)
      .then((response) => {
        dispatch(getUsers(Object.values(response.data)));
        dispatch(setFetching(false));
      });
  };
};
export let addTraining = (trainingList, url) => {
  return (dispatch) => {
    dispatch(setFetching(true));
    axios
      .put(
        `https://training-program-40a94.firebaseio.com/users/${url}.json`,
        trainingList
      )
      .then((response) => {
        dispatch(setTrainingList(response.data));
        dispatch(setFetching(false));
      });
  };
};
export let addRecord = (recordsList, url) => {
  return (dispatch) => {
    dispatch(setFetching(true));
    axios
      .put(
        `https://training-program-40a94.firebaseio.com/users/${url}.json`,
        recordsList
      )
      .then((response) => {
        dispatch(addRecordToList(response.data));
        dispatch(setFetching(false));
      });
  };
};
export let addSize = (size, url) => {
  return (dispatch) => {
    dispatch(setFetching(true));
    axios
      .put(
        `https://training-program-40a94.firebaseio.com/users/${url}.json`,
        size
      )
      .then((response) => {
        dispatch(setUserSize(response.data));
        dispatch(setFetching(false));
      });
  };
};

export default usersReduser;
