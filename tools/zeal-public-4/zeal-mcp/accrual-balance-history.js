/**
 * Function to retrieve accrual balance history for a specific company.
 *
 * @param {Object} args - Arguments for the accrual balance history request.
 * @param {string} args.companyID - The ID of the company for which to retrieve the accrual balance history.
 * @param {string} args.policyCode - The policy code for the accrual balance.
 * @param {Array<string>} args.employeeIDs - An array of employee IDs to filter the accrual balance history.
 * @param {string} args.endDate - The end date for the accrual balance history request.
 * @returns {Promise<Object>} - The result of the accrual balance history request.
 */
const executeFunction = async ({ companyID, policyCode, employeeIDs, endDate }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the request body
    const body = JSON.stringify({
      companyID,
      policyCode,
      employeeIDs,
      endDate
    });

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
    const response = await fetch(`${apiUrl}/accrualBalance/history`, {
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
    console.error('Error retrieving accrual balance history:', error);
    return {
      error: `An error occurred while retrieving accrual balance history: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving accrual balance history.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_accrual_balance_history',
      description: 'Retrieve accrual balance history for a specific company.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which to retrieve the accrual balance history.'
          },
          policyCode: {
            type: 'string',
            description: 'The policy code for the accrual balance.'
          },
          employeeIDs: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of employee IDs to filter the accrual balance history.'
          },
          endDate: {
            type: 'string',
            description: 'The end date for the accrual balance history request.'
          }
        },
        required: ['companyID', 'employeeIDs', 'endDate']
      }
    }
  }
};

export { apiTool };
