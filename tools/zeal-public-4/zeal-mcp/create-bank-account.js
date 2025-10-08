/**
 * Function to create a bank account for a specified worker in Zeal.
 *
 * @param {Object} args - Arguments for creating a bank account.
 * @param {string} args.companyID - The ID of the company for which the bank account is being created.
 * @param {string} args.id - The ID of the bank account.
 * @param {string} args.institution_name - The name of the bank institution.
 * @param {string} args.account_number - The account number of the bank account.
 * @param {string} args.routing_number - The routing number of the bank account.
 * @param {string} args.type - The type of bank account (e.g., checking, savings).
 * @returns {Promise<Object>} - The result of the bank account creation.
 */
const executeFunction = async ({ companyID, id, institution_name, account_number, routing_number, type }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  const body = JSON.stringify({
    companyID,
    id,
    institution_name,
    account_number,
    routing_number,
    type
  });

  try {
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
    const response = await fetch(`${apiUrl}/bankaccount`, {
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
    console.error('Error creating bank account:', error);
    return {
      error: `An error occurred while creating the bank account: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a bank account in Zeal.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_bank_account',
      description: 'Create a bank account for a specified worker in Zeal.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the bank account is being created.'
          },
          id: {
            type: 'string',
            description: 'The ID of the bank account.'
          },
          institution_name: {
            type: 'string',
            description: 'The name of the bank institution.'
          },
          account_number: {
            type: 'string',
            description: 'The account number of the bank account.'
          },
          routing_number: {
            type: 'string',
            description: 'The routing number of the bank account.'
          },
          type: {
            type: 'string',
            description: 'The type of bank account (e.g., checking, savings).'
          }
        },
        required: ['companyID', 'id', 'institution_name', 'account_number', 'routing_number', 'type']
      }
    }
  }
};

export { apiTool };