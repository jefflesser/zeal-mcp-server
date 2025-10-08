/**
 * Function to verify microdeposit values for a company bank account.
 *
 * @param {Object} args - Arguments for the verification.
 * @param {string} args.companyID - The ID of the company to verify.
 * @param {Array<string>} args.deposits - An array of deposit values to verify.
 * @returns {Promise<Object>} - The result of the microdeposit verification.
 */
const executeFunction = async ({ companyID, deposits }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${apiUrl}/companies/microdeposits/verify`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({
      companyID,
      deposits
    });

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error verifying microdeposit values:', error);
    return {
      error: `An error occurred while verifying microdeposit values: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for verifying microdeposit values for a company bank account.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'verify_microdeposit_values',
      description: 'Verify microdeposit values for a company bank account.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company to verify.'
          },
          deposits: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of deposit values to verify.'
          }
        },
        required: ['companyID', 'deposits']
      }
    }
  }
};

export { apiTool };