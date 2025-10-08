/**
 * Function to trigger micro-deposits to verify a company bank account.
 *
 * @param {Object} args - Arguments for the micro-deposit trigger.
 * @param {string} args.companyID - The ID of the company for which to trigger micro-deposits.
 * @returns {Promise<Object>} - The result of the micro-deposit trigger operation.
 */
const executeFunction = async ({ companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${apiUrl}/companies/microdeposits/trigger`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Prepare the request body
    const body = JSON.stringify({ companyID });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
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
    console.error('Error triggering micro-deposits:', error);
    return {
      error: `An error occurred while triggering micro-deposits: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for triggering micro-deposits.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'trigger_micro_deposits',
      description: 'Trigger micro-deposits to verify a company bank account.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which to trigger micro-deposits.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };