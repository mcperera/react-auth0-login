/*eslint no-restricted-globals: ["off", "location"]*/
import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';

const LOGIN_SUCCESS_PAGE = "/secret";
const LOGIN_FAILURE_PAGE = "/";

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'Your Auth0 Domain',
        clientID: 'Auth0 Client ID',
        redirectUri: 'http://localhost:3000/callback (current working URI) ',
        audience: 'https:// Your Auth0 Domain /userinfo',
        responseType: 'token id_token',
        scope: 'openid profile'
    });

      constructor(){
          this.login = this.login.bind(this);
          this.handleAuthentication = this.handleAuthentication.bind(this);
      }

      login(){
          this.auth0.authorize();
      }

      handleAuthentication(){
        this.auth0.parseHash((err, authResult) => {

            if (authResult && authResult.accessToken && authResult.idToken) {
                let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('expires_at', expiresAt);
                location.pathname = LOGIN_SUCCESS_PAGE;
            } else if (err) {
                location.pathname = LOGIN_FAILURE_PAGE;
            }
          });
      }

      isAuthenticated(){
            let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
            return new Date().getTime() < expiresAt;
      }

      logout(){
          localStorage.removeItem('access_token');
          localStorage.removeItem('id_token');
          localStorage.removeItem('expires_at');
          location.pathname = LOGIN_FAILURE_PAGE;
      }

      getProfile(){

          if(localStorage.getItem("id_token")){
              return jwtDecode(localStorage.getItem("id_token"));
          }
          else{
              return {};
          }
      }

}