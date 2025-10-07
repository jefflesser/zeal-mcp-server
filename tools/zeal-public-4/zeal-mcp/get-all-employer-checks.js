/**
 * Function to get all employer checks from the Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The Company ID of the employer (required).
 * @returns {Promise<Object>} - The result of the employer checks retrieval.
 */
const executeFunction = async ({ companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/employerCheck`);
    url.searchParams.append('companyID', companyID);

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
    console.error('Error retrieving employer checks:', error);
    return {
      error: `An error occurred while retrieving employer checks: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting all employer checks from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_all_employer_checks',
      description: 'Get all employer checks from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The Company ID of the employer.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };