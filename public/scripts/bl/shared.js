export default function getDataFromQuery(key){
    const params = new URLSearchParams(window.location.search);
    return params.get(key) || false;
}