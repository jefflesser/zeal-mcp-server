/**
 * Function to get the next available check or pay date from the Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The ID of the company (required).
 * @param {string} [args.speed] - The Zeal speed parameter (optional).
 * @param {string} [args.disbursement_method] - The Zeal disbursement method parameter (optional).
 * @returns {Promise<Object>} - The result of the API request.
 */
const executeFunction = async ({ companyID, speed = '', disbursement_method = '' }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/preview/availableDate`);
    url.searchParams.append('companyID', companyID);
    if (speed) url.searchParams.append('speed', speed);
    if (disbursement_method) url.searchParams.append('disbursement_method', disbursement_method);

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
    console.error('Error fetching available check/pay date:', error);
    return {
      error: `An error occurred while fetching the available check/pay date: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting the next available check or pay date from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_next_available_check_pay_date',
      description: 'Get the next available check or pay date from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company (required).'
          },
          speed: {
            type: 'string',
            description: 'The Zeal speed parameter (optional).'
          },
          disbursement_method: {
            type: 'string',
            description: 'The Zeal disbursement method parameter (optional).'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };