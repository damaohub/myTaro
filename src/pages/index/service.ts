import Request from '../../utils/request'

export const getDlt = () => {
  return Request({
    url:'dlt',
    method: 'GET',
  })
}