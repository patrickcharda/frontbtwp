class Router {

     /* 
     * @param {string} page : le nom de la page visée. 
     * @param  {...any} args : la liste des arguments que l'on veut passer à cette page. 
     */
    async execute(page, ...args) {
        let controller = new Controller(args);

        try {
            switch (page) {
                case "showLogin":
                    await controller.showLogin();
                    break;

                case "showLogged":
                    await controller.showLogged();
                    break;

                case "showBLList":
                    await controller.showBLList();
                    break;
                
                case "showBL":
                    await controller.showBL();
                    break;
                
                case "showBLUpdated":
                    await controller.showBLUpdated();
                    break;
                
                /* case "showTest":
                    await controller.showTest();
                    break; */
                default:
                    controller.showError("Route inconnue : " + page);
            }
        } catch (error) {
            controller.showError(error);
        }
    }
}