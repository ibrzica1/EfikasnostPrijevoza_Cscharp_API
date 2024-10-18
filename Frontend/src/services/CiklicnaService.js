import { HttpService } from "./HttpService";

async function getCiklicnaData(a, b) {
    return await HttpService.get(`/Metoda2`, { 
        params: { a: a, b: b } 
    })
    .then((response) => {
        return response.data;  
    })
    .catch((e) => {
        console.error(e);
        throw e;
    });
}

export default {
    getCiklicnaData
};

