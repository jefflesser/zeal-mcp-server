/**
 * Function to get direct payments from the Zeal API.
 *
 * @param {Object} args - Arguments for the direct payments request.
 * @param {string} args.companyID - The Zeal Company ID (required).
 * @param {string} args.directPaymentID - The Direct Payment ID.
 * @param {string} args.contractorID - The Contractor ID.
 * @param {string} args.employeeID - The Employee ID.
 * @returns {Promise<Object>} - The result of the direct payments request.
 */
const executeFunction = async ({ companyID, directPaymentID, contractorID, employeeID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/directPayments`);
    url.searchParams.append('companyID', companyID);
    if (directPaymentID) url.searchParams.append('directPaymentID', directPaymentID);
    if (contractorID) url.searchParams.append('contractorID', contractorID);
    if (employeeID) url.searchParams.append('employeeID', employeeID);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
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
    console.error('Error getting direct payments:', error);
    return {
      error: `An error occurred while getting direct payments: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting direct payments from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_direct_payments',
      description: 'Get direct payments from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The Zeal Company ID (required).'
          },
          directPaymentID: {
            type: 'string',
            description: 'The Direct Payment ID.'
          },
          contractorID: {
            type: 'string',
            description: 'The Contractor ID.'
          },
          employeeID: {
            type: 'string',
            description: 'The Employee ID.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };