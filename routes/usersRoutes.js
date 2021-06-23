const express = require('express');

const { signup, login } = require('../controllers/authController');
const { getAllUsers, updateUser, getUser, deleteUser } = require('../controllers/userController');
const checkAuth = require('../middleware/checkAuth');


const router = express.Router();


// router.get('/', getUsers);

router.post('/signup', signup);

router.post('/login', login);  

///PROTECTING ALL THE ROUTES
// router.use(checkAuth);

router
    .route('/')
    .get(getAllUsers)
router
    .route('/:id')
    .get(getUser)
    .patch(updateUser) 
    .delete(deleteUser);

   



module.exports = router;