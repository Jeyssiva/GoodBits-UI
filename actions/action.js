const WEBSERVICE_URL = 'http://localhost:8082/';

export const login = (userName, password) => {
    const data = {userName, password};
    return fetch(`${WEBSERVICE_URL}/users/login`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data),
    })
  .then(response => response.json())
  .then(data => console.log(data));
}