const express = require('express');

const { signup, login } = require('../controllers/authController');
const { getAllUsers, updateUser, getUser, deleteUser } = require('../controllers/userController');
const checkAuth = require('../middleware/checkAuth');


const router = express.Router();


router.post('/signup', signup);

router.post('/login', login);  

///PROTECTED ROUTES
router.use(checkAuth);

router
    .route('/')
    .get(getAllUsers)
router
    .route('/:id')
    .get(getUser)
    .patch(updateUser) 
    .delete(deleteUser);

   



module.exports = router;