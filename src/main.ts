import { ApiExpress } from "./api/express/api.express";
import { ShelterController } from "./api/express/controllers/shelter.controller";

function main() {
    const api = ApiExpress.build();

    const controller = ShelterController.build();

    api.addGetRoute("/shelters", controller.list);
    api.addPostRoute("/shelter/create", controller.create);

    api.start(8000);
}

main();
