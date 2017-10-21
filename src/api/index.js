import axios from 'axios'
import config from '../config'

var axiosInstance = axios.create({
  baseURL: config.serverURI
})

export default axiosInstance
