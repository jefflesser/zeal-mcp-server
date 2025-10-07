/**
 * Function to get the I9 status of an employee.
 *
 * @param {Object} args - Arguments for the I9 status request.
 * @param {string} args.companyID - The company ID of the employer.
 * @param {string} args.employeeID - The employee ID of the employee.
 * @returns {Promise<Object>} - The result of the I9 status request.
 */
const executeFunction = async ({ companyID, employeeID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/employees/getI9Status`);
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
    console.error('Error getting I9 status:', error);
    return {
      error: `An error occurred while getting I9 status: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting I9 status of an employee.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_i9_status',
      description: 'Get the status of an I9\'s completion.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the employer.'
          },
          employeeID: {
            type: 'string',
            description: 'The employee ID of the employee.'
          }
        },
        required: ['companyID', 'employeeID']
      }
    }
  }
};

export { apiTool };