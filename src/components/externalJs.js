

function ajaxx (type, route, data, auth){
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open(type, route)
    xhr.onload = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        Promise.reject(new Error('Something went wrong'))
      }
    }
    xhr.onerror = function () {
      Promise.reject(new Error('Something went wrong'))
    }
    if(auth == {}){
      auth="1";
    }
    xhr.setRequestHeader('Authorization', auth)
    xhr.send(JSON.stringify(data))
  })
}

export {ajaxx}