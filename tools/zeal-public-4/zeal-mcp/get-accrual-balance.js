/**
 * Function to get the accrual balance from Zeal API.
 *
 * @param {Object} args - Arguments for the accrual balance request.
 * @param {string} args.companyID - The ID of the company (required).
 * @param {string} [args.policy_code] - Filter by the unique code assigned to a policy.
 * @param {string} args.employeeID - Filter by the employee assigned to a policy (required).
 * @param {string} [args.policy_status] - Filter by status of the policy (accepts live or terminated).
 * @returns {Promise<Object>} - The result of the accrual balance request.
 */
const executeFunction = async ({ companyID, policy_code = '', employeeID, policy_status = '' }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/accrualBalance`);
    url.searchParams.append('companyID', companyID);
    if (policy_code) url.searchParams.append('policy_code', policy_code);
    url.searchParams.append('employeeID', employeeID);
    if (policy_status) url.searchParams.append('policy_status', policy_status);

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
    console.error('Error getting accrual balance:', error);
    return {
      error: `An error occurred while getting accrual balance: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting accrual balance from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_accrual_balance',
      description: 'Get the accrual balance from Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          policy_code: {
            type: 'string',
            description: 'Filter by the unique code assigned to a policy.'
          },
          employeeID: {
            type: 'string',
            description: 'Filter by the employee assigned to a policy.'
          },
          policy_status: {
            type: 'string',
            description: 'Filter by status of the policy (accepts live or terminated).'
          }
        },
        required: ['companyID', 'employeeID']
      }
    }
  }
};

export { apiTool };