import AsyncStorage from "@react-native-async-storage/async-storage";

const getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
        console.log('Get all keys error: ', e)
    }
    return keys
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      console.log('Clear all keys error: ', e)
    }
    console.log('All keys cleared.')
  }

  const setObjectItem = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch(e) {
        cconsole.log('Error wthile saving object: ', e)
    }
  
    console.log('Properly saved: ', value)
  }

  const getObjectItem = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
        console.log('Error while getting object: ', e)
    }
    console.log('Object successfully readed')
  }

  const getStringValue = async (key) => {
    try {
      return await AsyncStorage.getItem(key)
    } catch(e) {
        console.log('Error while getting string: ', e)
    }
    console.log('String successfully readed')
  }

  export default {
    getAllKeys,
    clearAll,
    setObjectItem,
    getObjectItem,
    getStringValue,
  }