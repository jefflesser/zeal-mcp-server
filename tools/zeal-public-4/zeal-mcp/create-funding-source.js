/**
 * Function to create a funding source for a customer account in Zeal MCP.
 *
 * @param {Object} args - Arguments for creating the funding source.
 * @param {string} args.id - The ID of the customer account (required).
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.customerAccountID - The ID of the customer account.
 * @param {string} args.account_number - The account number for the funding source.
 * @param {string} args.account_type - The type of account (e.g., checking, savings).
 * @param {string} args.routing_number - The routing number for the funding source.
 * @returns {Promise<Object>} - The result of the funding source creation.
 */
const executeFunction = async ({ id, companyID, customerAccountID, account_number, account_type, routing_number }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${apiUrl}/customer-accounts/${id}/funding-sources`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Create the request body
    const body = JSON.stringify({
      companyID,
      customerAccountID,
      account_number,
      account_type,
      routing_number
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
    console.error('Error creating funding source:', error);
    return {
      error: `An error occurred while creating the funding source: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a funding source in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_funding_source',
      description: 'Create a funding source for a customer account in Zeal MCP.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the customer account (required).'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          customerAccountID: {
            type: 'string',
            description: 'The ID of the customer account.'
          },
          account_number: {
            type: 'string',
            description: 'The account number for the funding source.'
          },
          account_type: {
            type: 'string',
            description: 'The type of account (e.g., checking, savings).'
          },
          routing_number: {
            type: 'string',
            description: 'The routing number for the funding source.'
          }
        },
        required: ['id']
      }
    }
  }
};

export { apiTool };