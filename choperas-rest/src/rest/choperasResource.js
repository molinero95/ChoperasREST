export default class ChoperasResource {

    constructor(choperasRepository) {
        this.choperasRepository = choperasRepository;
    }

    getChoperas(request, response) {
        const choperas = this.choperasRepository.getChoperas();
        if (choperas.length === 0) {
            response.status(204);
        }
        response.status(200);
        response.json({ "data": choperas });
    }

}