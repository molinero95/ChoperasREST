export default class HearthBeatResource {

    getHealth(request, response) {
        response.status(200);
        response.json({ "status": "UP" });
    }

}
