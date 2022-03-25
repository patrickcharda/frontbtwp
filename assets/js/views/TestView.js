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



        let contenu = `<h1>Liste des publications</h1>`;

        
        /*for (let i = 0; i < allPosts.count; i++) {
            content += this.renderOneCompetition(competitionsList.results[i]);
        };*/
        
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


    /*renderOneCompetition(currentCompetition) {
        let competition = currentCompetition.url;
        let userId = currentPost.user_id
        let content = `
            <div>
                <span>${currentCompetition.url}</span>
            </div>`;
        return content;
    }*/

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