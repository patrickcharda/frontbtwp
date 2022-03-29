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
/* 
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
    } */

    async showBLList() {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user.token);
        let token = user.token;
        try {
            let BLList = await Model.getBls(BASE_URL + "/wprod/bls/", token);
            console.log(BLList.results);

            let BLListView = ViewFactory.getView("BLListView");
            BLListView.addVariable("bls", BLList.results);
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
        console.log("option value : " +this.args[0]);
        let token = user.token;
        try {
            //si un bl est sélectionné ds la liste déroulante
            if (this.args[0] != "") {
                let BL = await Model.getBl(BASE_URL + "/wprod/bl/" + this.args[0], token);
                localStorage.setItem('BL', JSON.stringify(BL));
                console.log(BL.lignes.length);
                //s'il y a des lignes à afficher
                let lignes =[];
                if (BL.lignes.length > 0) {
                    
                    for (let i = 0; i < BL.lignes.length; i++) {
                        let ligne_id = BL.lignes[i];
                        ligne_id = ligne_id.slice(32, ligne_id.length);
                        console.log("ligne id : "+ ligne_id);
                        let BLI = await Model.getBli(BASE_URL + "/wprod/bli/" + ligne_id, token);
                        lignes.push(BLI);
                    }
                    console.log(lignes);
                    localStorage.setItem('lignes', JSON.stringify(lignes));
                }
                let BLView = ViewFactory.getView("BLView");
                BLView.addVariable("bl", BL);
                BLView.addVariable("lignes", lignes)
                BLView.render();
            }  
            if (this.args[2] != '' && typeof(this.args[2]) != 'undefined') {
                let divMsg = document.getElementById("bye");
                divMsg.innerHTML = this.args[2];
                this.args[2] = '';
                console.log(this.args[0]);
                let majDateBLModifie = await Model.patchBl(BASE_URL + "/wprod/bl/" +this.args[0], token);
            }
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
    }

    async showBLUpdated() {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user.token);
        console.log("blis :" +this.args[0]);
        console.log("bl :" +this.args[1]);
        let blis = this.args[0];
        let bl = this.args[1];
        let token = user.token;
        try {
            for (let bli of blis) {
                let ligne_id = bli.bli_num;
                //console.log(ligne_id);
                //console.log(bli.obs);
                //récupérer les cases à cocher pour bli_select
                //let are_selected = JSON.parse(localStorage.getItem('selected'));
                //console.log(Object.entries(are_selected));
                /* are_selected.forEach(function(item, index, array) {
                    console.log(item, index);
                  }); */
                //let pos = is_selected.indexOf(`chk${ligne_id}`);
                //console.log(pos);
                let bli_updated = await Model.patchBli(BASE_URL + "/wprod/bli/" + ligne_id, token, bli);
            }
            /* let BLUpdatedView = ViewFactory.getView("BLUpdatedView");
            BLUpdatedView.addVariable("bl", bl);
            BLUpdatedView.addVariable("lignes", blis)
            BLUpdatedView.render(); */
            this.args[0]= bl.bl_num;
            this.args[2] = "La mise à jour s'est bien déroulée";
            console.log(bl);
            this.showBL();        
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