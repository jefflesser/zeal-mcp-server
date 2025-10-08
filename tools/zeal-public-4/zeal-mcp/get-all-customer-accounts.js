/**
 * Function to get all customer accounts from Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The ID of the company for which to retrieve customer accounts.
 * @returns {Promise<Object>} - The response data containing customer accounts or an error message.
 */
const executeFunction = async ({ companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/customer-accounts`);
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
    console.error('Error fetching customer accounts:', error);
    return {
      error: `An error occurred while fetching customer accounts: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting all customer accounts from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_all_customer_accounts',
      description: 'Retrieve all customer accounts for a specified company from Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which to retrieve customer accounts.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };