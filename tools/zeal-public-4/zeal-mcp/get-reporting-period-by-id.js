/**
 * Function to get the reporting period by ID from the Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The company ID of the employer (required).
 * @param {string} args.reportingPeriodID - The ID of the reporting period (required).
 * @returns {Promise<Object>} - The result of the reporting period request.
 */
const executeFunction = async ({ companyID, reportingPeriodID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/reportingPeriod`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('reportingPeriodID', reportingPeriodID);

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
    console.error('Error getting reporting period:', error);
    return {
      error: `An error occurred while getting the reporting period: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting reporting period by ID from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_reporting_period_by_id',
      description: 'Get the reporting period by ID from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the employer.'
          },
          reportingPeriodID: {
            type: 'string',
            description: 'The ID of the reporting period.'
          }
        },
        required: ['companyID', 'reportingPeriodID']
      }
    }
  }
};

export { apiTool };