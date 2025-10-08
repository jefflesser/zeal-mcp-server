/**
 * Function to get employer check details by ID.
 *
 * @param {Object} args - Arguments for the employer check request.
 * @param {string} args.companyID - The Company ID of the employer.
 * @param {string} args.employerCheckID - The Employer Check ID.
 * @returns {Promise<Object>} - The result of the employer check request.
 */
const executeFunction = async ({ companyID, employerCheckID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/employerCheck`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('employerCheckID', employerCheckID);

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
    console.error('Error getting employer check:', error);
    return {
      error: `An error occurred while getting employer check: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting employer check details by ID.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_employer_check_by_id',
      description: 'Get employer check details by ID.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The Company ID of the employer.'
          },
          employerCheckID: {
            type: 'string',
            description: 'The Employer Check ID.'
          }
        },
        required: ['companyID', 'employerCheckID']
      }
    }
  }
};

export { apiTool };