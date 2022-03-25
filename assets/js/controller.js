/**
 * Le contrôleur est la classe qui va faire le lien entre les vues et les données.
 */
class Controller {

    constructor(args) {
        this.args = args;
        //this.panier = [];
    }

    async showLogin() {
        let loginView = ViewFactory.getView("login");
        loginView.render();
    }


    async showLogged() {
        
        let username = this.args[0];
        //console.log('arg1 :'+email); 
        let password = this.args[1];
        //console.log('arg2 :'+password);
        try {
        let tokens = await Model.login(BASE_URL + "/login/", username, password);
        console.log('retour login bck :' +tokens.access);
        //this.showPosts(userLogged);

        if (tokens.refresh != undefined) {
            let refreshedToken = await Model.login(BASE_URL + "/refresh-token/", tokens.refresh, '');
            console.log('regenerated access token:' +refreshedToken.access);
            let user = {
                "username": username,
                "token": refreshedToken.access,
                "loggedFrom": new Date().getTime()
                }
            localStorage.setItem('user', JSON.stringify(user));
            //this.showCompetitionsList()
            this.showBLList()
            } else {
            this.showLogin()
            }
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
    }

    async showCompetitionsList() {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user.token);
        let token = user.token;
        try {
            let competitionsList = await Model.getCompetitions(BASE_URL + "/competitions/", token);
            console.log(competitionsList.results);

            let competitionsListView = ViewFactory.getView("competitionsListView");
            competitionsListView.addVariable("competitions", competitionsList.results);
            //console.log(competitionsList);
            competitionsListView.render();
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
    }

    async showBLList() {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user.token);
        let token = user.token;
        try {
            //let competitionsList = await Model.getCompetitions(BASE_URL + "/competitions/", token);
            let BLList = await Model.getBls(BASE_URL + "/wprod/bls/", token);
            console.log(BLList.results);

            let BLListView = ViewFactory.getView("BLListView");
            BLListView.addVariable("bls", BLList.results);
            //console.log(competitionsList);
            BLListView.render();
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
    }

    async showBL() {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user.token);
        console.log(this.args[0]);
        let token = user.token;
        try {
            //let competitionsList = await Model.getCompetitions(BASE_URL + "/competitions/", token);
            let BL = await Model.getBl(BASE_URL + "/wprod/bl/" + this.args[0], token);
            console.log(BL);

            //let BLListView = ViewFactory.getView("BLListView");
            //BLListView.addVariable("bls", BLList.results);
            
            //BLListView.render();
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
    }

    async showTest() {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user.token);
        let token = user.token;
        try {
            let competitionsList = await Model.getCompetitions(BASE_URL + "/competitions/", token);
            console.log(competitionsList.results);

            let TestView = ViewFactory.getView("TestView");
            //competitionsListView.addVariable("competitions", competitionsList.results);
            //console.log(competitionsList);
            TestView.render();
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
    }

    /**
     * Méthode qui gère la page des erreurs. 
     */
    showError(errorMessage) {
        let errorView = ViewFactory.getView("error");

        errorView.addVariable("errorMessage", errorMessage);
        errorView.render();
    }
    
}