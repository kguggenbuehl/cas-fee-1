import cookie from "../bl/cookie-service.js";

class Theme {
    constructor() {
        this.themeSwitcher = document.getElementById('theme-switch');
        this.cookieKey ='theme';
        this.cookie = cookie;
        this.theme = this.getThemeCookie(this.cookieKey) || 1;
        this.updateHtmlTheme(this.theme);
        this.addEventListeners();
    }
    addEventListeners(){
        this.themeSwitcher.addEventListener('click', function (event) {
            if(event.target.value) {
                const value = event.target.value;
                this.setTheme(value);
            }
        }.bind(this));
    }
    setTheme(themeValue){
        this.theme = themeValue;
        this.setThemeCookie(this.cookieKey, themeValue, 365);
        this.updateHtmlTheme();
    }
    updateHtmlTheme(){
        document.body.setAttribute('data-theme', this.theme);
        let activeBtn = document.querySelectorAll(`[value="${this.theme}"]`);
        activeBtn[0].checked = true;
    }
    getThemeCookie(cname){
        return this.cookie.getCookie(cname);
    }
    setThemeCookie(cname, cvalue, exdays){
        this.cookie.setCookie(cname, cvalue, exdays);
    }
}


const theme = new Theme();
export default theme;