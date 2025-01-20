const router = require('express').Router();
const authentication = require('../middleware/authentication');
const restrictTo = require('../middleware/restrictTo');
const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require('../controller/projectController');

router
    .route('/')
    .post(authentication, restrictTo('1'), createProject)
    .get(authentication, restrictTo('1', '2'), getAllProjects);

router
    .route('/:id')
    .get(authentication, restrictTo('1', '2'), getProjectById)
    .patch(authentication, restrictTo('1'), updateProject)
    .delete(authentication, restrictTo('1'), deleteProject);

module.exports = router;   