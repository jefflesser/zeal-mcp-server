/**
 * Function to add or remove employees to an accrual policy.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The ID of the company.
 * @param {Array<string>} args.add_employees - List of employee IDs to add to the policy.
 * @param {Array<string>} [args.remove_employees=[]] - List of employee IDs to remove from the policy.
 * @returns {Promise<Object>} - The response from the API.
 */
const executeFunction = async ({ companyID, add_employees, remove_employees = [] }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const body = {
    companyID,
    policy_code,
    add_employees,
    remove_employees
  };

  try {
    const response = await fetch(`${apiUrl}/accrualPolicyEmployees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
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
    console.error('Error adding/removing employees to accrual policy:', error);
    return {
      error: `An error occurred while processing the request: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for adding/removing employees to an accrual policy.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_remove_employees_accrual_policy',
      description: 'Add or remove employees to an accrual policy.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          add_employees: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'List of employee IDs to add to the policy.'
          },
          policy_code: {
            type: 'string',
            items: {
              type: 'string'
            },
            description: 'Unique policy code for the policy this employee is added to / removed from.'
          },
          remove_employees: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'List of employee IDs to remove from the policy.'
          }
        },
        required: ['companyID', 'add_employees', 'policy_code']
      }
    }
  }
};

export { apiTool };