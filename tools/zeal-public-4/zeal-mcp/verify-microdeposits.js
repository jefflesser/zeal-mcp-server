/**
 * Function to verify microdeposits for a customer account.
 *
 * @param {Object} args - Arguments for the verification.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.customerAccountID - The ID of the customer account.
 * @param {Array<string>} args.deposits - An array of deposit amounts to verify.
 * @returns {Promise<Object>} - The result of the microdeposit verification.
 */
const executeFunction = async ({ companyID, customerAccountID, deposits }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL with the customer account ID
    const url = `${apiUrl}/customer-accounts/${customerAccountID}/verify-micro-deposits`;

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
    console.error('Error verifying microdeposits:', error);
    return {
      error: `An error occurred while verifying microdeposits: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for verifying microdeposits for a customer account.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'verify_microdeposits',
      description: 'Verify microdeposits for a customer account.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          customerAccountID: {
            type: 'string',
            description: 'The ID of the customer account.'
          },
          deposits: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of deposit amounts to verify.'
          }
        },
        required: ['companyID', 'customerAccountID', 'deposits']
      }
    }
  }
};

export { apiTool };