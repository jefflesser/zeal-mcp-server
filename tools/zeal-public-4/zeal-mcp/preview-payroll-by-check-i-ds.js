/**
 * Function to preview payroll by check IDs.
 *
 * @param {Object} args - Arguments for the payroll preview.
 * @param {string} args.companyID - The ID of the company for which to preview payroll.
 * @param {Array<string>} args.checks - An array of check IDs to preview.
 * @returns {Promise<Object>} - The result of the payroll preview.
 */
const executeFunction = async ({ companyID, checks }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the request body
    const body = JSON.stringify({
      companyID,
      checks
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(`${apiUrl}/preview/checks`, {
      method: 'POST',
      headers,
      body
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
    console.error('Error previewing payroll:', error);
    return {
      error: `An error occurred while previewing payroll: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for previewing payroll by check IDs.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'preview_payroll_by_check_ids',
      description: 'Preview payroll by check IDs.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which to preview payroll.'
          },
          checks: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of check IDs to preview.'
          }
        },
        required: ['companyID', 'checks']
      }
    }
  }
};

export { apiTool };