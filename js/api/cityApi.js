import axiosClient from './axiosClient'

export function getAllCities(params) {
  const url = '/cities'
  return axiosClient.get(url, { params })
}

export function getCitiesById(id) {
  const url = `/cities/${id}`
  return axiosClient.get(url)
}

// const cityApi = {
//   getAll(params) {
//     const url = '/cities'
//     return axiosClient.get(url, { params })
//   },

//   getById(id) {
//     const url = `/cities/${id}`
//     return axiosClient.get(url)
//   },
//   add(data) {
//     const url = `/cities/${id}`
//     return axiosClient.post(url, data)
//   },
//   update(data) {
//     const url = `/cities/${data.id}`
//     return axiosClient.patch(url, data)
//   },
//   remove(data) {
//     const url = `/cities/${data.id}`
//     return axiosClient.patch(url)
//   },
// }

export default cityApi
