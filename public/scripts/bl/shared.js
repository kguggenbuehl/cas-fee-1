export default function getDataFromQuery(key){
    const params = new URLSearchParams(window.location.search);
    const value = params.get(key) || false;
    return value;
}