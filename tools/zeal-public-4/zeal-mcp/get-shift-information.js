/**
 * Function to get shift information from the Zeal API.
 *
 * @param {Object} args - Arguments for the shift information request.
 * @param {string} args.companyID - The company ID of the employer (required).
 * @param {string} args.shiftID - The shift ID of the shift (required).
 * @returns {Promise<Object>} - The result of the shift information request.
 */
const executeFunction = async ({ companyID, shiftID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/shifts`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('shiftID', shiftID);

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
    console.error('Error getting shift information:', error);
    return {
      error: `An error occurred while getting shift information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting shift information from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_shift_information',
      description: 'Get shift information from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the employer.'
          },
          shiftID: {
            type: 'string',
            description: 'The shift ID of the shift.'
          }
        },
        required: ['companyID', 'shiftID']
      }
    }
  }
};

export { apiTool };