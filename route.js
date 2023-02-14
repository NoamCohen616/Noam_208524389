const express = require("express");
const controller = require("./controller");
const router = express.Router();

router
    .route("/login")
    .post(controller.login);

router
    .route('/users')
    .get(controller.getUsers)
    .post(controller.register);

router
    .route('/nonAtomicObjects')
    .get(controller.getNonAtomicObjects)
    .post(controller.createNonAtomicObject)
    .put(controller.updateNonAtomicObject);

router
    .route('/spaces')
    .get(controller.getSpaces)
    .post(controller.createSpace);

router
    .route('/sharedSpaces')
    .get(controller.getSharedSpaces);

router
    .route('/nonAtomicInNonAtomic')
    .get(controller.getNonAtomicInNonAtomic)
    .post(controller.createNonAtomicInNonAtomic)
    .put(controller.updateNonAtomicInNonAtomic)

router
    .route('/atomicObjects')
    .get(controller.getAtomicObjects)
    .post(controller.createAtomicObject)
    .put(controller.updateAtomicObject);

router
    .route('/stockObjects')
    .get(controller.getStockObjects)
    .post(controller.createStockObject);

router
    .route('/alerts')
    .get(controller.getAlerts);

router
    .route('/sharingRequests')
    .get(controller.getSharingRequests);

router
    .route('/objectStatusUpdates')
    .get(controller.getObjectStatusUpdates);

module.exports = router;