import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, name
          FROM public.category
         ORDER BY name;
    `;

    const result = await db.query(query);
    return result.rows;
}

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT category_id, name
          FROM public.category
         WHERE category_id = $1;
    `;

    const params = [categoryId];
    const result = await db.query(query, params);
    return result.rows[0]; // Return single category
}

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.name
          FROM public.category c
          JOIN public.project_category pc ON c.category_id = pc.category_id
         WHERE pc.project_id = $1
         ORDER BY c.name;
    `;

    const params = [projectId];
    const result = await db.query(query, params);
    return result.rows;
}

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT sp.project_id, sp.organization_id, sp.title, sp.description, sp.location, sp.date,
               o.name AS organization_name
          FROM public.service_project sp
          JOIN public.organization o ON sp.organization_id = o.organization_id
          JOIN public.project_category pc ON sp.project_id = pc.project_id
         WHERE pc.category_id = $1
         ORDER BY sp.date;
    `;

    const params = [categoryId];
    const result = await db.query(query, params);
    return result.rows;
}

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId }
