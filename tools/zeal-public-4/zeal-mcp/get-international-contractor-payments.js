/**
 * Function to get payments made to an international contractor.
 *
 * @param {Object} args - Arguments for the payment retrieval.
 * @param {string} args.companyID - The ID of the company (Required).
 * @param {string} args.intlContractorID - The ID of the International Contractor (Required).
 * @returns {Promise<Object>} - The result of the payment retrieval.
 */
const executeFunction = async ({ companyID, intlContractorID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/payment`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('intlContractorID', intlContractorID);

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
    console.error('Error retrieving payments:', error);
    return {
      error: `An error occurred while retrieving payments: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting international contractor payments.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_international_contractor_payments',
      description: 'Get payments made to an international contractor.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company (Required).'
          },
          intlContractorID: {
            type: 'string',
            description: 'The ID of the International Contractor (Required).'
          }
        },
        required: ['companyID', 'intlContractorID']
      }
    }
  }
};

export { apiTool };