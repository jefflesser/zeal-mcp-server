/**
 * Function to get a bank account by ID from the Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The company ID of the employer (required).
 * @param {string} args.bankAccountID - The bank account ID (required).
 * @returns {Promise<Object>} - The response from the Zeal API containing bank account details.
 */
const executeFunction = async ({ companyID, bankAccountID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/bankaccount`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('bankAccountID', bankAccountID);

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
    console.error('Error getting bank account by ID:', error);
    return {
      error: `An error occurred while getting the bank account: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting a bank account by ID from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_bank_account_by_id',
      description: 'Get a bank account by ID from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the employer.'
          },
          bankAccountID: {
            type: 'string',
            description: 'The bank account ID.'
          }
        },
        required: ['companyID', 'bankAccountID']
      }
    }
  }
};

export { apiTool };