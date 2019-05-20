import auth0 from 'auth0-js';

export default class Auth {
    constructor(history) {
        this.history = history;
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
            responseType: "token id_token",
            scope: "openid profile email"
        });

        this.userProfile = null;
    }

    login = () => {
        this.auth0.authorize()
    }

    handleAuthentication = () => {
        //parses the hash from URL => get error and result object
        this.auth0.parseHash((err, authResult) => {
            if(authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                //Redirect the application
                this.history.push("/home")
            } else if (err) {
                alert(`Error: ${err.error}`);
            }
        });
    }

    setSession = (authResult) => {
        //Set the time access toke will expire . expiresIn is in second . Multiply by 1000 to convert into millisecond
        const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("expires_at", expiresAt);
    }

    isAuthenticated= () => {
        const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }

    logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");

        this.history.push("/");
        this.auth0.logout({
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            returnTo: "http://localhost:3000"
        });
    }

    getAccessToken = () => {
        const accessToken = localStorage.getItem("access_token");
        if(!accessToken) {
            throw new Error("Access Token not found");
        }

        return accessToken;
    }
    
    getProfile = cb => {
        if(this.userProfile) {
            return cb(this.userProfile);
        }
        
    }
}