/**
 * Function to get all reporting periods from Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The ID of the company (required).
 * @param {string} [args.pay_schedule] - The pay schedule (optional).
 * @returns {Promise<Object>} - The response from the API containing reporting periods.
 */
const executeFunction = async ({ companyID, pay_schedule = '' }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/reportingPeriod/`);
    url.searchParams.append('companyID', companyID);
    if (pay_schedule) {
      url.searchParams.append('pay_schedule', pay_schedule);
    }

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
    console.error('Error getting reporting periods:', error);
    return {
      error: `An error occurred while getting reporting periods: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting all reporting periods from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_all_reporting_periods',
      description: 'Get all reporting periods from Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          pay_schedule: {
            type: 'string',
            description: 'The pay schedule (optional).'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };