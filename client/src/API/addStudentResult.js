const fetch = require('node-fetch');

const url = "https://server-mycap.herokuapp.com";

async function addStudentResult(id_prof, group_id, student_id, tipo, res) {

    const endpoint = "/studentResults";
    const newUrl = url + endpoint;

    //const date = Date();

    const data = {
        "id_prof": id_prof,
        "group_id": group_id,
        "student_id": student_id,
        "tipo": tipo,
        "res": res,
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
        return "error agregando resultado";
    })

    return response
};

export default addStudentResult;
