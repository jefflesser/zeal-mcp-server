/**
 * Function to get the accrual policy from the Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - (Required) ID of the company.
 * @param {string} [args.policy_code] - Unique code assigned to a policy.
 * @param {string} [args.policy_status] - Status of the policy (accepts live or terminated).
 * @returns {Promise<Object>} - The result of the accrual policy request.
 */
const executeFunction = async ({ companyID, policy_code = '', policy_status = '' }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/accrualPolicy`);
    url.searchParams.append('companyID', companyID);
    if (policy_code) url.searchParams.append('policy_code', policy_code);
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
    console.error('Error getting accrual policy:', error);
    return {
      error: `An error occurred while getting the accrual policy: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting the accrual policy from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_accrual_policy',
      description: 'Get the accrual policy from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: '(Required) ID of the company.'
          },
          policy_code: {
            type: 'string',
            description: 'Unique code assigned to a policy.'
          },
          policy_status: {
            type: 'string',
            description: 'Status of the policy (accepts live or terminated).'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };