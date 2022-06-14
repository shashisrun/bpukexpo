import NetInfo from '@react-native-community/netinfo';
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import Data from '../data/Data';


const TASK_NAME = "REFRESH_DATA"

TaskManager.defineTask(TASK_NAME, async () => {
    const data = new Data;
    await data.downloadData();
    // console.log("Data Downloaded Background")
})

const RegisterBackgroundTask = async () => {
    try {
      await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 5, // seconds,
      })
    //   console.log("Task registered")
    } catch (err) {
    //   console.log("Task Register failed:", err)
    }
  }

  export default RegisterBackgroundTask;