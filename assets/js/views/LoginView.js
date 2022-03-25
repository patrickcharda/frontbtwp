class LoginView extends AbstractView {

    constructor() {
        super();
        this.container = document.getElementById(CONTAINER_ID); 
    }

    render() {

        this.cleanContainer();

        this.cleanDivAccount();

        /*const divAccount = document.getElementById(DIV_ACCOUNT_ID);
        const signup = document.createElement('a');
        signup.setAttribute('href','#');
        signup.setAttribute('aria-label', 'page inscription');
        signup.textContent = "S'inscrire";
        divAccount.appendChild(signup);
        signup.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            //divAccount.removeChild(signup);
            router.execute('showSignup');
        });*/


        let contenu = `<div>&nbsp;</div>
        <form id="loginForm" aria-label="Formulaire de connexion" action="" method="post">
            <div class="form-group">
                <input type="text" id="userEmail" name="login" class="form-control" required placeholder="Identifiant" maxlength="40" minlength="5"/>
            </div>
            <div class="form-group">
                <input type="password" id="userPassword" class="form-control" required maxlength="16" minlength="7" placeholder="Mot de passe">
            </div>
            <div class="form-group">
                <input type="submit" id="btnNewUser" form='loginForm' aria-label="valider">
            </div>
        </form>
        <div>&nbsp;</div>`;
        
        let content = `<form id="loginForm" method="post" aria-label="Formulaire de connexion">
                <div class='formGroup'>
                    <label for="userEmail">
                        Nom d'utilisateur 
                    </label>
                    <input type="text" id="userEmail" required maxlength="50" minlenght="2" >
                </div>
                <div class="formGroup">
                    <label for="userPassword" placeholder="********">
                        Mot de passe
                    </label>
                    <input type="password" id="userPassword" required maxlength="16" minlength="7">
                </div>
                <div class="formGroup">
                    <button type="submit" id="btnNewUser" form='loginForm' aria-label="valider">
                        Valider
                    </button>
                </div>
            </form>`;
        
        this.display(contenu);

        this.formSubmit();
    }

    cleanDivAccount() {
        const divAccount = document.getElementById(DIV_ACCOUNT_ID);
        while (divAccount.firstChild) {
            divAccount.removeChild(divAccount.firstChild);
        }
    }

    display(content) {
        this.container.innerHTML += content;
    }

    formSubmit() {
        const form = document.getElementById('loginForm');
        console.log(form.id);
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const email = document.getElementById('userEmail');
            const password = document.getElementById('userPassword');
            router.execute('showLogged', email.value, password.value);
        })
    }
   

}