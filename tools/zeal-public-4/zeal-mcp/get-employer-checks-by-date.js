/**
 * Function to get employer checks by date from the Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The company ID of the employer (required).
 * @param {string} [args.start] - The start date for the checks (optional).
 * @param {string} [args.end] - The end date for the checks (optional).
 * @returns {Promise<Object>} - The result of the employer checks request.
 */
const executeFunction = async ({ companyID, start, end }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/employerCheck`);
    url.searchParams.append('companyID', companyID);
    if (start) url.searchParams.append('start', start);
    if (end) url.searchParams.append('end', end);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
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
    console.error('Error getting employer checks:', error);
    return {
      error: `An error occurred while getting employer checks: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting employer checks by date from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_employer_checks_by_date',
      description: 'Get employer checks by date from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the employer.'
          },
          start: {
            type: 'string',
            description: 'The start date for the checks.'
          },
          end: {
            type: 'string',
            description: 'The end date for the checks.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };