/**
 * Function to get bank account details by Employee or Contractor ID.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The company ID of the employer (required).
 * @param {string} args.id - The Employee ID or Contractor ID (required).
 * @returns {Promise<Object>} - The bank account details or an error message.
 */
const executeFunction = async ({ companyID, id }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/bankaccount`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('id', id);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
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
    console.error('Error getting bank account details:', error);
    return {
      error: `An error occurred while getting bank account details: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting bank account details by Employee or Contractor ID.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_bank_account_by_employee_contractor_id',
      description: 'Get bank account details by Employee or Contractor ID.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the employer.'
          },
          id: {
            type: 'string',
            description: 'The Employee ID or Contractor ID.'
          }
        },
        required: ['companyID', 'id']
      }
    }
  }
};

export { apiTool };