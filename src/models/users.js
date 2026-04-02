import db from './db.js';
import bcrypt from 'bcrypt';

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const query_params = [name, email, passwordHash, default_role];
    
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT user_id, name, email, password_hash, role_id 
        FROM users 
        WHERE email = $1
    `;
    const query_params = [email];
    
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

/**
 * Authenticates a user by verifying their email and password.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Object|null} - The user object if authentication is successful, otherwise null.
 */
async function authenticateUser(email, password) {
    try {
        // Query the database for the user by email
        const query = `
            SELECT u.user_id, u.name, u.email, r.role_name
            FROM users u
            JOIN roles r ON u.role_id = r.role_id
            WHERE u.email = $1
        `;
        const result = await db.query(query, [email]);

        if (result.rows.length === 0) {
            // No user found with the given email
            return null;
        }

        const user = result.rows[0];

        // Compare the provided password with the stored hashed password
        const passwordQuery = 'SELECT password_hash FROM users WHERE user_id = $1';
        const passwordResult = await db.query(passwordQuery, [user.user_id]);
        const isPasswordValid = await bcrypt.compare(password, passwordResult.rows[0].password_hash);

        if (!isPasswordValid) {
            // Password does not match
            return null;
        }

        // Return the user object if authentication is successful
        return {
            id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role_name
        };
    } catch (error) {
        console.error('Error in authenticateUser:', error);
        throw error;
    }
}

const getAllUsers = async () => {
    const query = `
        SELECT u.user_id, u.name, u.email, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        ORDER BY u.name
    `;
    const result = await db.query(query);
    return result.rows;
};

export { createUser, findUserByEmail, verifyPassword, authenticateUser, getAllUsers };