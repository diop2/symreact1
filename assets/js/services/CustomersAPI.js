import axios from "axios";

function findAll() {
    return axios
        .get("http://localhost:8000/api/customers/")
        .then(response => response.data["hydra:member"]);
};

function delet(id) {
    return axios
        .get("http://localhost:8000/api/customers/" + id)
        .then(response => response.data["hydra:member"]);
};
export default {
    findAll,
    delet
}