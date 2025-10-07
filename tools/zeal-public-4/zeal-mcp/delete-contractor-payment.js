/**
 * Function to delete a contractor payment.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.companyID - The ID of the company (required).
 * @param {string} args.contractorPaymentID - The ID of the contractor payment to delete (required).
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ companyID, contractorPaymentID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

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
      method: 'DELETE',
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
    console.error('Error deleting contractor payment:', error);
    return {
      error: `An error occurred while deleting contractor payment: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a contractor payment.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_contractor_payment',
      description: 'Delete a contractor payment.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          contractorPaymentID: {
            type: 'string',
            description: 'The ID of the contractor payment to delete.'
          }
        },
        required: ['companyID', 'contractorPaymentID']
      }
    }
  }
};

export { apiTool };