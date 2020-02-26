class Request {

    get(url) {
      return fetch(url, {
        headers: {
          "Origin": "X-Requested-With",
          "Access-Control-Allow-Origin": "*"
    }
      })
      .then((res) => res.json());
    }

    delete(url) {
      return fetch(url, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        mode: 'no-cors'
      })
    }

    post(url, payload){
      return fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      })
    }

    patch(url, payload){
      return fetch(url, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      })
    }

}

export default Request;
