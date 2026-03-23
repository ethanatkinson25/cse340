import { showOrganizationDetailsPage } from './organizations.js';
import express from 'express';

import { showHomePage } from './index.js';
import { showOrganizationsPage } from './organizations.js';
import { showProjectsPage } from './projects.js';
import { showProjectDetailsPage } from './projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './categories.js';
import { ErrorPage } from './errors.js';
import { showNewOrganizationForm } from './organizations.js';
import { processNewOrganizationForm } from './organizations.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

// error-handling routes
router.get('/error', ErrorPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route to handle new organization form submission
router.post('/new-organization', processNewOrganizationForm);

export default router;