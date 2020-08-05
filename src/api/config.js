import axios from 'axios'

// export const baseUrl = 'http://localhost:3000/snetease'
export const baseUrl = 'http://sharmin.top/snetease'

const axiosInstance = axios.create({
  baseURL: baseUrl
})

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, '网络错误')
  }
)

export {
  axiosInstance
}
