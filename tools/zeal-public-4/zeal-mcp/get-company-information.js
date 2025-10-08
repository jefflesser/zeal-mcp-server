/**
 * Function to get company information from Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The Company ID of the company to retrieve information for.
 * @returns {Promise<Object>} - The result of the company information request.
 */
const executeFunction = async ({ companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/companies`);
    url.searchParams.append('companyID', companyID);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

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
    console.error('Error getting company information:', error);
    return {
      error: `An error occurred while getting company information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting company information from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_company_information',
      description: 'Get information for a specific company under a partner.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The Company ID of the company to retrieve information for.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };