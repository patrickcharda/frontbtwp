class CompetitionsListView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID);
        console.log('yo');
        this.listVariables=[];
    }

    async render() {

        this.cleanContainer();

        this.cleanDivAccount();

        //var user = JSON.parse(localStorage.getItem('user'));

        const competitions = this.getVariable("competitions");
        //console.log(competitions[0].url + ' count : ' + competitions.length);

        var contenu = `<div></div>`;
        contenu += `<div><h1>Liste des competitions</h1><br>`;
        
        for (let i = 0; i < competitions.length; i++) {
            contenu += this.renderOneCompetition(competitions[i]);
        };

        contenu += `</div>
        <div></div>`
        
        this.display(contenu);

        //this.addImagePreloadEvent();
        
        //this.addPostEvents(user);

        //this.addCommentEvents(user);

        //this.formSubmit(user); 

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

    cleanContainer() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        console.log('yo+'+this.container.innerHTML);
        //this.postEventsTab = [];
        //this.commentEventsTab = [];
    }


    renderOneCompetition(currentCompetition) {
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
    }

    display(content) {
        console.log(content);
        this.container.innerHTML += content;
    }

    cleanDivAccount() {
        const divAccount = document.getElementById(DIV_ACCOUNT_ID);
        while (divAccount.firstChild) {
            divAccount.removeChild(divAccount.firstChild);
        }
        console.log('yoyo+'+divAccount.innerHTML)
    }
}