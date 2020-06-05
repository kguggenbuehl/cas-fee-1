 export default class Cookie {
    setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    getCookie(cname) {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith(cname))
            .split('=')[1];
        return cookieValue;
    }
}