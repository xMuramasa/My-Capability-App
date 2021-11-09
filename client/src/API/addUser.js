const fetch = require('node-fetch');

const url = "https://server-mycap.herokuapp.com";

async function addUser(username, password, email) {

    const endpoint = "/user";
    const newUrl = url + endpoint;

    //const date = Date();

    const data = {
        "username": username,
        "password": password,
        "email": email
    }
    
    const response = await fetch(newUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function (resp) {
        return resp.json();
    })
    // On success
    .then(function (data) {
        return data;
    })
    // On Failure
    .catch(function () {
        return "error agregando usuario";
    })

    // Return of the function
    //console.log("response:", response)
    return response
};

export default addUser;
