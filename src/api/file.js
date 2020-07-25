import axios from '@/libs/api.request'
import { MENU_API, FILE_API, UP_API, FILE_TYPE_API } from '../config/httpApi'

// 上传
export const fileUP = (data) => {
  return axios.request({
    method: 'post',
    url: UP_API.UP_FILE,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export const fileBase64Up = () => {

}

export const fileBase64Ups = () => {

}

export const fileTypeTrue = () => {

}

// 类型样式
export const fileGetList = () => {
  return axios.request({
    method: 'post',
    url: FILE_TYPE_API.GET_LIST,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const fileReadRecentList = () => {
  return axios.request({
    method: 'post',
    url: FILE_API.GET_USER_LIST,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
