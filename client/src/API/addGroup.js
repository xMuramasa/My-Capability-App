const fetch = require('node-fetch');

const url = "https://server-mycap.herokuapp.com";

async function addGroup(id_prof, group_name) {

    const endpoint = "/groups";
    const newUrl = url + endpoint;

    //const date = Date();

    const data = {
        "id_prof": id_prof,
        "group_name": group_name
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
        console.log(data)
        return data;
    })
    // On Failure
    .catch(function () {
        return "error agregando grupo";
    })

    // Return of the function
    //console.log("response:", response)
    return response
};

export default addGroup;
