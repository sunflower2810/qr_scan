import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { fireStore } from "../../firebase.config";
import { Alert } from "react-native";

const { makeAutoObservable } = require("mobx");

class ScheduleStore {
  DB = fireStore;
  schedules = [];
  constructor() {
    makeAutoObservable(this);
  }
  setSchedule = (val) => {
    this.schedules = val;
  };
  listenSchedule = async (teacherId) => {};
  checked = async (checkData) => {};
}
const scheduleStore = new ScheduleStore();
export default scheduleStore;
