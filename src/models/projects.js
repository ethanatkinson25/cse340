import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT sp.project_id, sp.organization_id, sp.title, sp.description, sp.location, sp.date,
               o.name AS organization_name
          FROM public.service_project sp
          JOIN public.organization o ON sp.organization_id = o.organization_id
         ORDER BY sp.date;
    `;

    const result = await db.query(query);
    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          sp.project_id,
          sp.organization_id,
          sp.title,
          sp.description,
          sp.location,
          sp.date,
          o.name AS organization_name
        FROM public.service_project sp
        JOIN public.organization o ON sp.organization_id = o.organization_id
        WHERE sp.organization_id = $1
        ORDER BY sp.date;
      `;
      
      const query_params = [organizationId];
      const result = await db.query(query, query_params);

      return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT sp.project_id, sp.organization_id, sp.title, sp.description, sp.date, sp.location,
         o.name AS organization_name
      FROM public.service_project sp
      JOIN public.organization o ON sp.organization_id = o.organization_id
     WHERE sp.date >= CURRENT_DATE
     ORDER BY sp.date ASC
     LIMIT $1;
  `;

  const params = [number_of_projects];
  const result = await db.query(query, params);
  return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT sp.project_id, sp.organization_id, sp.title, sp.description, sp.date, sp.location,
               o.name AS organization_name
          FROM public.service_project sp
          JOIN public.organization o ON sp.organization_id = o.organization_id
         WHERE sp.project_id = $1;
    `;
 
    const result = await db.query(query, [id]);
    return result.rows[0];
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };
