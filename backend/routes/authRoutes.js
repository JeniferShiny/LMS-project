const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

// 1. Import Controllers
const { 
    loginUser, 
    createUser, 
    getUsers, 
    updateUserStatus, 
    forgotPassword, 
    resetPassword 
} = require('../controllers/authController');

// 2. Import Middleware
const { protect, authorize } = require('../middleware/authMiddleware');


router.get('/seed-admin', async (req, res) => {
    try {
        const adminExists = await User.findOne({ email: 'admin@lms.com' });
        if (adminExists) return res.status(400).send('Admin already exists!');

        await User.create({
            name: 'System Administrator',
            email: 'admin@lms.com',
            password: 'password123', 
            role: 'admin',
            isActive: true
        });

        res.status(201).send('Admin created! Email: admin@lms.com, Pass: password123');
    } catch (error) {
        res.status(500).send('Error seeding admin: ' + error.message);
    }
});

/**
 * @section PUBLIC ROUTES
 */
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

/**
 * @section ADMIN PROTECTED ROUTES
 */

// Get all users - requires login and admin role
router.get('/users', protect, authorize('admin'), getUsers);

// Create new user - requires login and admin role
router.post('/users', protect, authorize('admin'), createUser);

// Toggle user status (Activate/Deactivate)
// This is likely the route causing your "next" error
router.put('/users/:id/status', protect, authorize('admin'), updateUserStatus);

module.exports = router;