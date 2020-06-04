const baseUrl = 'http://localhost:3000/';

const apiHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
}

//Otra forma de agregar headers
// const apiHeaders = new Headers();
// apiHeaders.append('Content-Type', 'application/json');
// apiHeaders.append('Accept', 'application/json');


const fetchParams = (method, data = '') => {
    const body = data ? { body: JSON.stringify(data) } : {}
    return {
        method: method,
        headers: apiHeaders,
        credentials: 'same-origin',
        ...body
    }
}

const api = {
    //Funciones CRUD
    //CREATE (To be continued...)
    createPlaces: async formData => {
        const dataResponse = await fetch(baseUrl + 'places', fetchParams('POST', formData));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },
    //READ
    getPlaces: async () => {
        const dataResponse = await fetch(baseUrl + 'places', fetchParams('GET'));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },
    //UPDATE
    updatePlaces: async (formData,id) => {
        const dataResponse = await fetch(baseUrl + 'place/' + id, fetchParams('PUT', formData));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },
    //DELETE
    deletePlaces: async id => {
        const dataResponse = await fetch(baseUrl + 'place/' + id, fetchParams('DELETE'));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },
}