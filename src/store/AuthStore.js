import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore } from "../../firebase.config";
import { Alert } from "react-native";

const { makeAutoObservable } = require("mobx");

class AuthStore {
  DB = fireStore;
  logged = false;
  draft = {
    logging: false,
  };
  user = {};
  constructor() {
    makeAutoObservable(this);
  }
  setUser = (val) => {
    this.user = val;
  };
  setLogged = (val) => {
    this.logged = val;
  };
  setLogging = (val) => {
    this.draft.logging = val;
  };
}
const authStore = new AuthStore();
export default authStore;
