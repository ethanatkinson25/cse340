CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- SELECT * FROM organization;

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title  VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

-- ============================================
-- BrightFuture Builders (organization_id = 1)
-- ============================================
INSERT INTO service_project (organization_id, title, description, location, date) VALUES
(1, 'Community Center Renovation',
 'Volunteers repair and repaint the interior of an aging neighborhood community center.',
 '142 Maple St, Springfield', '2026-03-15'),

(1, 'Affordable Housing Framing Day',
 'Help frame walls for a new affordable housing unit being built in partnership with Habitat for Humanity.',
 '78 Birchwood Ave, Lakeside', '2026-04-05'),

(1, 'Playground Equipment Install',
 'Assemble and install new playground equipment donated to an underserved elementary school.',
 'Roosevelt Elementary, Springfield', '2026-04-26'),

(1, 'Park Pathway Repair',
 'Repave and restore crumbling walkways throughout Riverside Park for safer community access.',
 'Riverside Park, Springfield', '2026-05-10'),

(1, 'School Mural Project',
 'Work with local artists and students to design and paint a large mural on the school gymnasium wall.',
 'Lincoln Middle School, Maplewood', '2026-06-07');

-- ============================================
-- GreenHarvest Growers (organization_id = 2)
-- ============================================
INSERT INTO service_project (organization_id, title, description, location, date) VALUES
(2, 'Spring Garden Planting Day',
 'Prepare beds and plant seasonal vegetables at the community garden for local families to tend and harvest.',
 'Eastside Community Garden, Springfield', '2026-03-22'),

(2, 'Composting Workshop',
 'Teach residents how to build and maintain a compost bin to reduce food waste and enrich garden soil.',
 'GreenHarvest Urban Farm, Lakeside', '2026-04-12'),

(2, 'Farmers Market Volunteer Day',
 'Help set up, run, and break down the weekly neighborhood farmers market supporting local growers.',
 'Downtown Farmers Market, Springfield', '2026-05-03'),

(2, 'School Garden Build',
 'Build raised garden beds at a local elementary school and teach students basic growing techniques.',
 'Sunnydale Elementary, Maplewood', '2026-05-17'),

(2, 'Harvest Food Drive',
 'Harvest surplus produce from community farms and distribute fresh vegetables to local food pantries.',
 'GreenHarvest Urban Farm, Lakeside', '2026-09-20');

-- ============================================
-- UnityServe Volunteers (organization_id = 3)
-- ============================================
INSERT INTO service_project (organization_id, title, description, location, date) VALUES
(3, 'Food Pantry Sort & Pack',
 'Sort donated goods and pack weekly food boxes for 200+ families at the county food bank.',
 'Springfield County Food Bank', '2026-03-29'),

(3, 'Homeless Shelter Deep Clean',
 'Thoroughly clean and organize dormitories, bathrooms, and common areas at the downtown shelter.',
 'Hope House Shelter, Downtown Springfield', '2026-04-19'),

(3, 'Senior Center Companion Visit',
 'Spend time with elderly residents at a local nursing home through conversation, games, and activities.',
 'Sunset Manor Nursing Home, Lakeside', '2026-05-03'),

(3, 'Back-to-School Supply Drive',
 'Collect and distribute backpacks filled with essential school supplies to 400 low-income students.',
 'UnityServe HQ, Springfield', '2026-07-26'),

(3, 'Winter Coat Giveaway',
 'Hand out donated coats, gloves, and scarves to unhoused individuals before the winter season.',
 'Central Park Pavilion, Springfield', '2026-11-08');

SELECT * FROM service_project;



CREATE TABLE category (
    category_id   SERIAL        PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL UNIQUE
);

-- ============================================
-- JUNCTION TABLE (many-to-many)
-- A project can have many categories
-- A category can belong to many projects
-- ============================================
CREATE TABLE project_category (
    project_id    INT   NOT NULL,
    category_id   INT   NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

-- ============================================
-- SEED DATA: Categories
-- ============================================
INSERT INTO category (name) VALUES
('Construction & Renovation'),  -- category_id = 1
('Environment & Sustainability'), -- category_id = 2
('Education & Youth'),          -- category_id = 3
('Food Security'),              -- category_id = 4
('Homelessness & Housing'),     -- category_id = 5
('Seniors & Companionship');    -- category_id = 6

-- ============================================
-- SEED DATA: Project-Category Associations
-- project_ids 1-5:  BrightFuture Builders
-- project_ids 6-10: GreenHarvest Growers
-- project_ids 11-15: UnityServe Volunteers
-- ============================================

-- BrightFuture Builders projects
INSERT INTO project_category (project_id, category_id) VALUES
(1,  1),  -- Community Center Renovation      → Construction & Renovation
(1,  5),  -- Community Center Renovation      → Homelessness & Housing
(2,  1),  -- Affordable Housing Framing Day   → Construction & Renovation
(2,  5),  -- Affordable Housing Framing Day   → Homelessness & Housing
(3,  1),  -- Playground Equipment Install     → Construction & Renovation
(3,  3),  -- Playground Equipment Install     → Education & Youth
(4,  1),  -- Park Pathway Repair              → Construction & Renovation
(4,  2),  -- Park Pathway Repair              → Environment & Sustainability
(5,  3),  -- School Mural Project             → Education & Youth
(5,  1);  -- School Mural Project             → Construction & Renovation

-- GreenHarvest Growers projects
INSERT INTO project_category (project_id, category_id) VALUES
(6,  2),  -- Spring Garden Planting Day       → Environment & Sustainability
(6,  4),  -- Spring Garden Planting Day       → Food Security
(7,  2),  -- Composting Workshop              → Environment & Sustainability
(7,  3),  -- Composting Workshop              → Education & Youth
(8,  4),  -- Farmers Market Volunteer Day     → Food Security
(8,  2),  -- Farmers Market Volunteer Day     → Environment & Sustainability
(9,  3),  -- School Garden Build              → Education & Youth
(9,  2),  -- School Garden Build              → Environment & Sustainability
(10, 4),  -- Harvest Food Drive               → Food Security
(10, 2);  -- Harvest Food Drive               → Environment & Sustainability

-- UnityServe Volunteers projects
INSERT INTO project_category (project_id, category_id) VALUES
(11, 4),  -- Food Pantry Sort & Pack          → Food Security
(11, 5),  -- Food Pantry Sort & Pack          → Homelessness & Housing
(12, 5),  -- Homeless Shelter Deep Clean      → Homelessness & Housing
(12, 1),  -- Homeless Shelter Deep Clean      → Construction & Renovation
(13, 6),  -- Senior Center Companion Visit    → Seniors & Companionship
(14, 3),  -- Back-to-School Supply Drive      → Education & Youth
(14, 4),  -- Back-to-School Supply Drive      → Food Security
(15, 5),  -- Winter Coat Giveaway             → Homelessness & Housing
(15, 4);  -- Winter Coat Giveaway             → Food Security

SELECT * FROM category;
SELECT * FROM project_category;

SELECT p.title, c.name
FROM service_project p
JOIN project_category pc ON p.project_id = pc.project_id
JOIN category c ON pc.category_id = c.category_id
ORDER BY p.title;

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

-- Verify the data was inserted
SELECT * FROM roles;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert an admin user for testing
INSERT INTO users (name, email, password_hash, role_id) 
VALUES ('admin', 'admin@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2); -- password: password

-- Insert a test user
INSERT INTO users (name, email, password_hash, role_id) 
VALUES ('testuser', 'test@example.com', 'placeholder_hash', 1);

-- Join users and roles to see complete information
SELECT u.user_id, u.name, u.email, r.role_name, r.role_description
FROM users u
JOIN roles r ON u.role_id = r.role_id;

-- Delete the test user
-- DELETE FROM users WHERE email = 'test@example.com';

-- ============================================
-- PROJECT VOLUNTEER JUNCTION TABLE
-- A user can volunteer for multiple projects
-- A project can have multiple volunteers
-- ============================================
CREATE TABLE project_volunteer (
    volunteer_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    volunteer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, project_id),

    CONSTRAINT fk_volunteer_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_volunteer_project
        FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE
);

SELECT * FROM project_volunteer;