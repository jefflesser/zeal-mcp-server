/**
 * Function to get the reporting period by date range from the Zeal API.
 *
 * @param {Object} args - Arguments for the reporting period request.
 * @param {string} args.companyID - The company ID of the employer (required).
 * @param {string} [args.paySchedule] - The pay schedule (optional).
 * @param {string} [args.searchStart] - The start date for the search (optional).
 * @param {string} [args.searchEnd] - The end date for the search (optional).
 * @returns {Promise<Object>} - The result of the reporting period request.
 */
const executeFunction = async ({ companyID, paySchedule = '', searchStart = '', searchEnd = '' }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/reportingPeriod`);
    url.searchParams.append('companyID', companyID);
    if (paySchedule) url.searchParams.append('paySchedule', paySchedule);
    if (searchStart) url.searchParams.append('searchStart', searchStart);
    if (searchEnd) url.searchParams.append('searchEnd', searchEnd);

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
    console.error('Error getting reporting period:', error);
    return {
      error: `An error occurred while getting the reporting period: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting reporting period by date range from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_reporting_period_by_date_range',
      description: 'Get reporting period by date range from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the employer.'
          },
          paySchedule: {
            type: 'string',
            description: 'The pay schedule.'
          },
          searchStart: {
            type: 'string',
            description: 'The start date for the search.'
          },
          searchEnd: {
            type: 'string',
            description: 'The end date for the search.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };