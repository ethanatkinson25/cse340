import express from 'express';

import { showHomePage } from './index.js';
import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation,
    addVolunteerAction,
    removeVolunteerAction
} from './projects.js';
import { 
    showCategoriesPage, 
    showCategoryDetailsPage, 
    showAssignCategoriesForm, 
    processAssignCategoriesForm, 
    showNewCategoryForm, 
    processNewCategoryForm, 
    showEditCategoryForm, 
    processEditCategoryForm, 
    categoryValidation } from './categories.js';
import { ErrorPage } from './errors.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    organizationValidation,
    processEditOrganizationForm
} from './organizations.js';
import { showUserRegistrationForm, processUserRegistrationForm } from './users.js';
import { showLoginForm, processLoginForm, processLogout } from './users.js';
import { showDashboard, requireLogin, requireAdmin, showAllUsers } from './users.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Route for new category page (protected admin only)
router.get('/new-category', requireLogin, requireAdmin, showNewCategoryForm);

// Route to handle new category form submission (protected admin only)
router.post('/new-category', requireLogin, requireAdmin, categoryValidation, processNewCategoryForm);

// Route to display the edit category form (protected admin only)
router.get('/edit-category/:id', requireLogin, requireAdmin, showEditCategoryForm);

// Route to handle the edit category form submission (protected admin only)
router.post('/edit-category/:id', requireLogin, requireAdmin, categoryValidation, processEditCategoryForm);

// Route to display the edit organization form (protected admin only)
router.get('/edit-organization/:id', requireLogin, requireAdmin, showEditOrganizationForm);

// Route for new organization page (protected admin only)
router.get('/new-organization', requireLogin, requireAdmin, showNewOrganizationForm);

// error-handling routes
router.get('/error', ErrorPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route to handle new organization form submission (protected admin only)
router.post('/new-organization', requireLogin, requireAdmin, organizationValidation, processNewOrganizationForm);

// Route to handle the edit organization form submission (protected admin only)
router.post('/edit-organization/:id', requireLogin, requireAdmin, organizationValidation, processEditOrganizationForm);

// Route for new project page (protected admin only)
router.get('/new-project', requireLogin, requireAdmin, showNewProjectForm);

// Route to handle new project form submission (protected admin only)
router.post('/new-project', requireLogin, requireAdmin, projectValidation, processNewProjectForm);

// Route to display the edit project form (protected admin only)
router.get('/edit-project/:id', requireLogin, requireAdmin, showEditProjectForm);

// Route to handle the edit project form submission (protected admin only)
router.post('/edit-project/:id', requireLogin, requireAdmin, projectValidation, processEditProjectForm);

// Routes to handle the assign categories to project form (protected admin only)
router.get('/assign-categories/:projectId', requireLogin, requireAdmin, showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireLogin, requireAdmin, processAssignCategoriesForm);

// Routes for volunteering on projects (protected routes)
router.post('/volunteer/:projectId', requireLogin, addVolunteerAction);
router.post('/remove-volunteer/:projectId', requireLogin, removeVolunteerAction);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

// Users page route
router.get('/users', requireLogin, requireAdmin, showAllUsers);

export default router;