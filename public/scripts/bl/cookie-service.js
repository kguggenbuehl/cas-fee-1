class CookieService {
    setCookie(cname, cvalue, exdays) {
        try {
            let expires = "";
            if (exdays) {
                let date = new Date();
                date.setTime(date.getTime()+(exdays*24*60*60*1000));
                expires = "; expires="+date.toUTCString();
            }
            document.cookie = cname+"="+cvalue+expires+"; path=/";
        }
        catch (e) {
            console.error(e);
        }
    }
    getCookie(cname) {
        const nameEQ = cname + "=";
        let ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
}

const cookie = new CookieService();
export default cookie;