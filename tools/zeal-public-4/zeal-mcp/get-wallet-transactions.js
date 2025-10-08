/**
 * Function to get wallet transactions from Zeal API.
 *
 * @param {Object} args - Arguments for the wallet transactions request.
 * @param {string} args.companyID - The ID of the company (required).
 * @param {string} args.employeeID - The Zeal employee ID.
 * @param {string} args.contractorID - The Zeal contractor ID.
 * @param {string} args.walletTransactionID - The Wallet Transaction ID.
 * @returns {Promise<Object>} - The result of the wallet transactions request.
 */
const executeFunction = async ({ companyID, employeeID, contractorID, walletTransactionID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/wallet/transactions`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('employeeID', employeeID);
    url.searchParams.append('contractorID', contractorID);
    url.searchParams.append('walletTransactionID', walletTransactionID);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

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
    console.error('Error getting wallet transactions:', error);
    return {
      error: `An error occurred while getting wallet transactions: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting wallet transactions from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_wallet_transactions',
      description: 'Get wallet transactions from Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employeeID: {
            type: 'string',
            description: 'The Zeal employee ID.'
          },
          contractorID: {
            type: 'string',
            description: 'The Zeal contractor ID.'
          },
          walletTransactionID: {
            type: 'string',
            description: 'The Wallet Transaction ID.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };