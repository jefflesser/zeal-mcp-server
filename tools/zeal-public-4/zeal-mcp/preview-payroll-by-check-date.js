/**
 * Function to preview payroll by check date.
 *
 * @param {Object} args - Arguments for the payroll preview.
 * @param {string} args.companyID - The ID of the company for which to preview payroll.
 * @param {string} args.check_date - The check date for the payroll preview in ISO 8601 format.
 * @returns {Promise<Object>} - The result of the payroll preview.
 */
const executeFunction = async ({ companyID, check_date }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the request body
    const body = JSON.stringify({
      companyID,
      check_date
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
    const response = await fetch(`${apiUrl}/preview/checkDate`, {
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
    console.error('Error previewing payroll by check date:', error);
    return {
      error: `An error occurred while previewing payroll: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for previewing payroll by check date.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'preview_payroll_by_check_date',
      description: 'Preview payroll by check date.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which to preview payroll.'
          },
          check_date: {
            type: 'string',
            description: 'The check date for the payroll preview in ISO 8601 format.'
          }
        },
        required: ['companyID', 'check_date']
      }
    }
  }
};

export { apiTool };