import { showOrganizationDetailsPage } from './organizations.js';
import express from 'express';

import { showHomePage } from './index.js';
import { showOrganizationsPage } from './organizations.js';
import { showProjectsPage } from './projects.js';
import { showProjectDetailsPage } from './projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './categories.js';
import { testErrorPage } from './errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

export default router;