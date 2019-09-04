import Request from '../../utils/request'

export const checkDlt = (data:{redArr:[], blueArr:[], term:string }) => {
  return Request({
    url:'checkdlt',
    method: 'POST',
    data
  })
}