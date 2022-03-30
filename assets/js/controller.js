/**
 * Le contrôleur est la classe qui va faire le lien entre les vues et les données.
 */
class Controller {

    constructor(args) {
        this.args = args;
    }

    async showLogin() {
        let loginView = ViewFactory.getView("login");
        loginView.render();
    }


    async showLogged() {
        
        let username = this.args[0]; 
        let password = this.args[1];
        try {
        let tokens = await Model.login(BASE_URL + "/login/", username, password);
        //console.log('retour login bck :' +tokens.access);

        if (tokens.refresh != undefined) {
            let refreshedToken = await Model.login(BASE_URL + "/refresh-token/", tokens.refresh, '');
            let user = {
                "username": username,
                "token": refreshedToken.access,
                "loggedFrom": new Date().getTime()
                }
            localStorage.setItem('user', JSON.stringify(user));
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

    async showBLList() {
        let user = JSON.parse(localStorage.getItem('user'));
        //console.log(user.token);
        let token = user.token;
        try {
            let BLList = await Model.getBls(BASE_URL + "/wprod/bls/", token);
            //console.log(BLList.results);

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
        //console.log(user.token);
        //console.log("option value : " +this.args[0]);
        let token = user.token;
        try {
            //si un bl est sélectionné ds la liste déroulante
            if (this.args[0] != "") {
                let BL = await Model.getBl(BASE_URL + "/wprod/bl/" + this.args[0], token);
                localStorage.setItem('BL', JSON.stringify(BL));
                //s'il y a des lignes à afficher :
                let lignes =[];
                if (BL.lignes.length > 0) {
                    for (let i = 0; i < BL.lignes.length; i++) {
                        let ligne_id = BL.lignes[i];
                        ligne_id = ligne_id.slice(32, ligne_id.length);
                        //console.log("ligne id : "+ ligne_id);
                        let BLI = await Model.getBli(BASE_URL + "/wprod/bli/" + ligne_id, token);
                        lignes.push(BLI);
                    }
                    //console.log(lignes);
                    //localStorage.setItem('lignes', JSON.stringify(lignes));
                }
                let BLView = ViewFactory.getView("BLView");
                BLView.addVariable("bl", BL);
                BLView.addVariable("lignes", lignes)
                BLView.render();
            } 
            // lors de la mise à jour d'un BL cette fonction est rappelée
            // si la mise à jour s'est bien déroulée, this.args[2] contient un message de réussite
            // ce message est affiché ds la div "bye"
            if (this.args[2] != '' && typeof(this.args[2]) != 'undefined') {
                this.args[2] = '';
                let divMsg = document.getElementById("bye");
                //console.log(this.args[0]); // contient désormais la référence du bl
                let dateMajBLModifie = new Date();
                //formater la date pr la persister
                let formatedDate = dateMajBLModifie.getFullYear()+"-"+(dateMajBLModifie.getMonth()+1)+"-"+dateMajBLModifie.getDate();
                formatedDate +="T"+dateMajBLModifie.getHours()+":"+dateMajBLModifie.getMinutes()+":"+dateMajBLModifie.getSeconds();
                let majDateBLModifie = await Model.patchBl(BASE_URL + "/wprod/bl/" +this.args[0], token, formatedDate);
                //formater la date pour l'afficher sur la page bl
                const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
                const months = ['Janv', 'Fevr', 'Mars', 'Avril', 'Mai', 'Juin', 'Juill', 'Août', 'Sept', 'Oct', 'Nov', 'Dec'];
                let dateMajBLToDisplay = "Mis à jour le "
                dateMajBLToDisplay+= days[dateMajBLModifie.getDay()]+" "+dateMajBLModifie.getDate()+" "+months[dateMajBLModifie.getMonth()];
                dateMajBLToDisplay +=" "+dateMajBLModifie.getFullYear();
                dateMajBLToDisplay +="<br>à "+dateMajBLModifie.getHours()+"h : "+dateMajBLModifie.getMinutes()+"m : "+dateMajBLModifie.getSeconds()+"s";
                divMsg.innerHTML = dateMajBLToDisplay;
            }
        }
        catch {
            let errorView = ViewFactory.getView("error");
            errorView.render();
        }
    }

    async showBLUpdated() {
        let user = JSON.parse(localStorage.getItem('user'));
        let blis = this.args[0]; // les lignes du bl
        let bl = this.args[1]; // l'id du bl
        let token = user.token;
        try {
            for (let bli of blis) {
                let ligne_id = bli.bli_num;
                let bli_updated = await Model.patchBli(BASE_URL + "/wprod/bli/" + ligne_id, token, bli);
            }
            /* let BLUpdatedView = ViewFactory.getView("BLUpdatedView");
            BLUpdatedView.addVariable("bl", bl);
            BLUpdatedView.addVariable("lignes", blis)
            BLUpdatedView.render(); */
            this.args[0]= bl.bl_num;
            this.args[2] = "La mise à jour s'est bien déroulée";
            this.showBL();        
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