/**
 * Function to update a customer account in the Zeal API.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.id - The ID of the customer account to update.
 * @param {string} args.companyID - The company ID associated with the customer account.
 * @param {string} args.code - The new code for the customer account.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ id, companyID, code }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL for the PATCH request
    const url = `${apiUrl}/customer-accounts/${id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Prepare the body of the request
    const body = JSON.stringify({
      companyID,
      code,
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
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
    console.error('Error updating customer account:', error);
    return {
      error: `An error occurred while updating the customer account: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a customer account in the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_customer_account',
      description: 'Update a customer account in the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the customer account to update.'
          },
          companyID: {
            type: 'string',
            description: 'The company ID associated with the customer account.'
          },
          code: {
            type: 'string',
            description: 'The new code for the customer account.'
          }
        },
        required: ['id', 'companyID', 'code']
      }
    }
  }
};

export { apiTool };