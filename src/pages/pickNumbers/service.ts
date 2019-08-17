import Request from '../../utils/request'

export const getData = () => {
  return Request({
    url:'test',
    method: 'GET', 
  })
}