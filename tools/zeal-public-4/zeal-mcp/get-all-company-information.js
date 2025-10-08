/**
 * Function to get all company information under a partner.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.partnerID - The PartnerID of the Zeal Partner (required).
 * @returns {Promise<Object>} - The response containing company information.
 */
const executeFunction = async ({ partnerID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/companies`);
    url.searchParams.append('partnerID', partnerID);

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
    console.error('Error getting company information:', error);
    return {
      error: `An error occurred while getting company information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting all company information under a partner.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_all_company_information',
      description: 'Get information for all companies under a partner.',
      parameters: {
        type: 'object',
        properties: {
          partnerID: {
            type: 'string',
            description: 'The PartnerID of the Zeal Partner.'
          }
        },
        required: ['partnerID']
      }
    }
  }
};

export { apiTool };