/**
 * Function to trigger microdeposits for a customer account in Zeal MCP.
 *
 * @param {Object} args - Arguments for the microdeposits trigger.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.customerAccountID - The ID of the Customer Account (required).
 * @returns {Promise<Object>} - The response from the microdeposits trigger.
 */
const executeFunction = async ({ companyID, customerAccountID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with the customer account ID
    const url = `${apiUrl}/customer-accounts/${customerAccountID}/trigger-micro-deposits`;

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
    console.error('Error triggering microdeposits:', error);
    return {
      error: `An error occurred while triggering microdeposits: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for triggering microdeposits in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'trigger_microdeposits',
      description: 'Trigger microdeposits for a customer account in Zeal MCP.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          customerAccountID: {
            type: 'string',
            description: 'The ID of the Customer Account (required).'
          }
        },
        required: ['customerAccountID']
      }
    }
  }
};

export { apiTool };