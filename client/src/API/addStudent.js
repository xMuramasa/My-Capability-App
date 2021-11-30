const fetch = require('node-fetch');

const url = "https://server-mycap.herokuapp.com";

async function addStudent(id_prof, group_id, student_name, height) {

    const endpoint = "/students";
    const newUrl = url + endpoint;

    const data = {
        "id_prof": id_prof,
        "group_id": group_id,
        "student_name": student_name,
        "height": height,
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

export default addStudent;
