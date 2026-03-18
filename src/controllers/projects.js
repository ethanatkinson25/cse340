// Import any needed model functions
import { getAllProjects } from '../models/projects.js';
import { getUpcomingProjects } from '../models/projects.js';
import { getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Service Projects';

    res.render('projects', { title, projects });
};  

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const title = projectDetails ? projectDetails.title : 'Project Details';

    res.render('project-details', { title, projectDetails });
};


// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };