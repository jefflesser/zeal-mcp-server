/**
 * Function to get additional tax requirements for an employee.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The ID of the company (required).
 * @param {string} args.employeeID - The ID of the employee.
 * @returns {Promise<Object>} - The response data containing employee requirements.
 */
const executeFunction = async ({ companyID, employeeID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/employeeRequirements`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('employeeID', employeeID);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting employee requirements:', error);
    return {
      error: `An error occurred while getting employee requirements: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting employee requirements.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_employee_requirements',
      description: 'Get additional tax requirements for an employee.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employeeID: {
            type: 'string',
            description: 'The ID of the employee.'
          }
        },
        required: ['companyID', 'employeeID']
      }
    }
  }
};

export { apiTool };