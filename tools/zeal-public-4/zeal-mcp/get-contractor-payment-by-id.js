/**
 * Function to get contractor payment by ID from Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The company ID of the employer (required).
 * @param {string} args.contractorPaymentID - The payment ID of the contractor payment (required).
 * @returns {Promise<Object>} - The result of the contractor payment retrieval.
 */
const executeFunction = async ({ companyID, contractorPaymentID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/contractorPayment`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('contractorPaymentID', contractorPaymentID);

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
    console.error('Error retrieving contractor payment:', error);
    return {
      error: `An error occurred while retrieving contractor payment: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting contractor payment by ID from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_contractor_payment_by_id',
      description: 'Get contractor payment by ID from Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the employer.'
          },
          contractorPaymentID: {
            type: 'string',
            description: 'The payment ID of the contractor payment.'
          }
        },
        required: ['companyID', 'contractorPaymentID']
      }
    }
  }
};

export { apiTool };