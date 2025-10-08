/**
 * Function to fetch Minimum Wage Rules for a specified Work Location.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.workLocationID - The ID of the Work Location (required).
 * @param {string} args.companyID - The ID of the Company (required).
 * @param {string} [args.effectiveDate] - The effective date of the minimum wage rules. Defaults to today's date if empty.
 * @returns {Promise<Object>} - The response containing Minimum Wage Rules.
 */
const executeFunction = async ({ workLocationID, companyID, effectiveDate }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/minimumWageRules`);
    url.searchParams.append('workLocationID', workLocationID);
    url.searchParams.append('companyID', companyID);
    if (effectiveDate) {
      url.searchParams.append('effectiveDate', effectiveDate);
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
    console.error('Error fetching Minimum Wage Rules:', error);
    return {
      error: `An error occurred while fetching Minimum Wage Rules: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for fetching Minimum Wage Rules.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_minimum_wage_rules',
      description: 'Fetch Minimum Wage Rules for a specified Work Location.',
      parameters: {
        type: 'object',
        properties: {
          workLocationID: {
            type: 'string',
            description: 'The ID of the Work Location.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the Company.'
          },
          effectiveDate: {
            type: 'string',
            description: 'The effective date of the minimum wage rules.'
          }
        },
        required: ['workLocationID', 'companyID']
      }
    }
  }
};

export { apiTool };