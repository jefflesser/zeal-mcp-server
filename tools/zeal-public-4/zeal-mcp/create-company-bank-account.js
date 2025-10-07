/**
 * Function to create a bank account for a specified company.
 *
 * @param {Object} args - Arguments for creating a bank account.
 * @param {string} args.account_number - The account number for the bank account.
 * @param {string} args.routing_number - The routing number for the bank account.
 * @param {string} args.companyID - The ID of the company for which the bank account is created.
 * @returns {Promise<Object>} - The result of the bank account creation.
 */
const executeFunction = async ({ account_number, routing_number, companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${apiUrl}/companies/bank`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({
      account_number,
      routing_number,
      companyID
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
    console.error('Error creating bank account:', error);
    return {
      error: `An error occurred while creating the bank account: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a bank account for a specified company.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_company_bank_account',
      description: 'Create a bank account for the specified company.',
      parameters: {
        type: 'object',
        properties: {
          account_number: {
            type: 'string',
            description: 'The account number for the bank account.'
          },
          routing_number: {
            type: 'string',
            description: 'The routing number for the bank account.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the bank account is created.'
          }
        },
        required: ['account_number', 'routing_number', 'companyID']
      }
    }
  }
};

export { apiTool };