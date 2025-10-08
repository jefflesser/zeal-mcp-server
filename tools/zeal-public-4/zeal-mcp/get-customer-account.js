/**
 * Function to get customer account details from Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.customerAccountID - The ID of the customer account.
 * @param {string} args.companyID - The ID of the company.
 * @returns {Promise<Object>} - The response from the Zeal API.
 */
const executeFunction = async ({ customerAccountID, companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with path and query parameters
    const url = new URL(`${apiUrl}/customer-accounts/${customerAccountID}`);
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
    console.error('Error getting customer account:', error);
    return {
      error: `An error occurred while getting the customer account: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting customer account details from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_customer_account',
      description: 'Get customer account details from Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          customerAccountID: {
            type: 'string',
            description: 'The ID of the customer account.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          }
        },
        required: ['customerAccountID', 'companyID']
      }
    }
  }
};

export { apiTool };