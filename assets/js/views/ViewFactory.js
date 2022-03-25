class ViewFactory {

    constructor() {
        throw new TypeError("Erreur dans view Factory, merci d'utiliser la méthode 'getView'.");
    }

    static getView(viewName) {
        switch (viewName) {
            case "error":
                return new ErrorView();
            case "login":
                return new LoginView();
            case "BLListView":
                return new BLListView();
            case "competitionsListView":
                return new CompetitionsListView();
            case "testView":
                return new TestView();
            default:
                throw new TypeError(`La vue (${viewName} n'existe pas.`);
        }
    }

  
}