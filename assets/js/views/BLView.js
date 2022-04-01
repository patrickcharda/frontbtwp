class BLView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID);
        this.listVariables=[];
    }

    async render() {

        this.cleanContainer();

        this.cleanDivAccount();

        //var user = JSON.parse(localStorage.getItem('user'));

        const bl = this.getVariable("bl");
        const blis = this.getVariable("lignes");
        //console.log(blis[0].pk);
        var contenu = `<div></div>`;
        contenu += `<div><h1>BL n° : ${bl.pk}</h1><br>
        <form id="blis_update" method="post" aria-label="Formulaire édition de ligne de BL">`;      
        for (let i = 0; i < blis.length; i++) {
            contenu += this.renderOneBli(blis[i]);
        };
        contenu += `
        <div class="form-valid">
            <button type="submit" class="btn-wprod" id="btnValid_blis" form='blis_update' aria-label="valider">
                Valider
            </button>
        </div>
        </form></div>
        <div></div>`
        
        this.display(contenu);

        this.formSubmit(blis, bl);

    } 

    formSubmit(blis, bl) {
        const form = document.getElementById('blis_update');
        //console.log("test id de formulaire : ", form.id);
        let testchk ='';
        let observ ='';
        let comment ='';
        let qte ='';
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            for (let bli of blis) {
                testchk = document.getElementById("chk"+bli.bli_num);
                console.log(testchk.id, testchk.value, testchk.checked);
                bli.chk= testchk.checked;
                observ = document.getElementById("txtobs"+bli.bli_num);
                //console.log(observ.value);
                bli.obs = observ.value;
                //console.log(bli.obs);
                comment = document.getElementById("txtcmt"+bli.bli_num);
                bli.cmt = comment.value;
                qte = document.getElementById("qte"+bli.bli_num);
                bli.qte = qte.value;
                console.log(bli.qte);
            }
            /* for (let bli of blis) {
                console.log(bli.bli_num, bli.chk);
            } */
            //console.log(txt_comment);
            //document.querySelector('#topbody').click();
            router.execute('showBLUpdated', blis, bl);
            
        })
    } 

    renderOneBli(currentBli) {
        //console.log(currentBli.url);
        let bli = currentBli;
        let content = `
        <strong><input id="chk${bli.bli_num}" type="checkbox" class="form-control" name="select"`;
        if (bli.bli_select) {
            content+=' checked';
        }
        content+=`/>

        &nbsp;${bli.bli_libel}</strong>
        <em><span class="bli_pdt">(${bli.bli_codeproduit})</span></em>&nbsp;<span class="bli_num">${bli.bli_num}</span><br>
        <div class="bli_row">
            <div>
                Qté (${bli.bli_unite}):
            </div>
            <div>
                <input type="text" id="qte${bli.bli_num}" maxlength="10" size="5" value="${bli.bli_qte}"> 
            </div>
        </div>

        <div class="bli_row">
            <div>
                Obs :
            </div>
            <div>
        <textarea id="txtobs${bli.bli_num}" name="observations" class="form-control" placeholder="Ajouter des observations ici." rows="1" maxlength="2000">`;
        if (bli.bli_observ === null) {
            content+= "";
        } 
        else {
            content+=`${bli.bli_observ}`;
        };
        
        content+=`</textarea>
            </div>
        </div>

        <div class="bli_row">
            <div>
                Cmt :
            </div>
            <div>
        <textarea id="txtcmt${bli.bli_num}" name="commentaires" class="form-control" placeholder="Ajouter des commentaires ici." rows="1" maxlength="2000">`;
        if (bli.bli_comment === null) {
            content+= "";
        } 
        else {
            content+=`${bli.bli_comment}`;
        };
        content+=`</textarea>
            </div>
        </div>

        <br>
        `;

        return content;
    }

    cleanContainer() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        //this.postEventsTab = [];
        //this.commentEventsTab = [];
    }


/*     renderOneCompetition(currentCompetition) {
        console.log(currentCompetition.url);
        let competition = currentCompetition;
        let content = `
            <div>
                <ul>
                <li><strong> Date de la compétition : </strong> ${competition.distance_achievement_date}</li>
                <li><strong> Nom du drone : </strong> ${competition.drone}</li>
                <li><strong> Pilote : </strong> ${competition.pilot}</li>
                <li><strong> Distance parcourue (en pieds) : </strong> ${competition.distance_in_feet}</li>
                <!--<a href='${competition.url}'>${competition.pk} ${competition.distance_achievement_date}</a>-->
            </div><br>`
        return content;
    } */

    display(content) {
        //console.log(content);
        this.container.innerHTML += content;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    cleanDivAccount() {
        const divAccount = document.getElementById(DIV_ACCOUNT_ID);
        while (divAccount.firstChild) {
            divAccount.removeChild(divAccount.firstChild);
        }
    }

    

    /*newDivAccount(user) {
        const divAccount = document.getElementById(DIV_ACCOUNT_ID);
        divAccount.setAttribute('class', 'divAccount');

        const navAccount = document.createElement('nav');

        const divMonCompte = document.createElement('div');
        divMonCompte.textContent = 'MON COMPTE';
        navAccount.setAttribute('class', 'navAccount');
        navAccount.appendChild(divMonCompte);
        divAccount.appendChild(navAccount);

        const ulMenuAccount = document.createElement('ul');
        divMonCompte.appendChild(ulMenuAccount);
        const liLogout = document.createElement('li');
        ulMenuAccount.appendChild(liLogout);
        const logout = document.createElement('a');
        logout.setAttribute('href','#');
        logout.textContent = 'Se déconnecter';
        liLogout.appendChild(logout);
        logout.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            localStorage.removeItem('user');
            router.execute('showLogin');
        });

        
        const liDelete = document.createElement('li');
        ulMenuAccount.appendChild(liDelete);
        const deleteAccount = document.createElement('a');
        deleteAccount.setAttribute('href','#');
        deleteAccount.textContent = 'Supprimer';
        liDelete.appendChild(deleteAccount);
        deleteAccount.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            router.execute('showDeleteUser', user);
        })

        if (user.role === 'admin') {

            const divAdmin = document.createElement('div');
            divAdmin.textContent = 'ADMIN';
            navAccount.appendChild(divAdmin);
            const ulAdmin = document.createElement('ul');
            const liAdmin = document.createElement('li');
            ulAdmin.appendChild(liAdmin);
            divAdmin.appendChild(ulAdmin);
            const users = document.createElement('a');
            users.setAttribute('href', '#');
            users.textContent = "Utilisateurs";
            liAdmin.appendChild(users);
            users.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                //console.log(user.token);
                router.execute('showUsers', user.token);
            })
        }
    }*/

}