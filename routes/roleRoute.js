const express = require('express');
const router = express.Router();
const roleController = require('./../controllers/role');

router
    .route('/')
    .post(roleController.addRole)
    .get(roleController.getRoles)

router
    .route('/:id')
    .get(roleController.getRoleById)
    .put(roleController.updateRole)
    .delete(roleController.deletedRole);

module.exports = router;