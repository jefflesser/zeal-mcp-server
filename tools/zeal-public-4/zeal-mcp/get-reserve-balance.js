/**
 * Function to get the reserve balance from Zeal API.
 *
 * @param {Object} args - Arguments for the reserve balance request.
 * @param {string} args.companyID - (Required) Zeal company ID.
 * @param {string} [args.account_type] - Type of reserve account. Can be: `reserve` or `direct_pay_reserve`.
 * @param {string} [args.start_at] - Optional start date for the balance request.
 * @param {number} [args.limit=25] - The number of results to return, defaults to 25.
 * @returns {Promise<Object>} - The result of the reserve balance request.
 */
const executeFunction = async ({ companyID, account_type, start_at, limit = 25 }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/provider-accounts/balances`);
    url.searchParams.append('companyID', companyID);
    if (account_type) url.searchParams.append('account_type', account_type);
    if (start_at) url.searchParams.append('start_at', start_at);
    url.searchParams.append('limit', limit.toString());

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
    console.error('Error getting reserve balance:', error);
    return {
      error: `An error occurred while getting the reserve balance: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting reserve balance from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_reserve_balance',
      description: 'Get the reserve balance from Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: '(Required) Zeal company ID.'
          },
          account_type: {
            type: 'string',
            enum: ['reserve', 'direct_pay_reserve'],
            description: 'Type of reserve account.'
          },
          start_at: {
            type: 'string',
            description: 'Optional start date for the balance request.'
          },
          limit: {
            type: 'integer',
            description: 'The number of results to return, defaults to 25.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };