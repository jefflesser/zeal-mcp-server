/**
 * Function to update the accrual balance for employees.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.companyID - The ID of the company.
 * @param {Array<Object>} args.employees - The list of employees with their accrual balances.
 * @param {string} args.policy_code - The policy code for the accrual balance update.
 * @returns {Promise<Object>} - The result of the accrual balance update.
 */
const executeFunction = async ({ companyID, employees, policy_code }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the request body
    const body = JSON.stringify({
      companyID,
      policy_code,
      employees
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${apiUrl}/accrualBalance`, {
      method: 'PATCH',
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
    console.error('Error updating accrual balance:', error);
    return {
      error: `An error occurred while updating the accrual balance: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating accrual balance.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_accrual_balance',
      description: 'Update the accrual balance for employees.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employees: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                employeeID: {
                  type: 'string',
                  description: 'The ID of the employee.'
                },
                accrual_balance: {
                  type: 'integer',
                  description: 'The accrual balance for the employee.'
                }
              },
              required: ['employeeID', 'accrual_balance']
            },
            description: 'The list of employees with their accrual balances.'
          },
          policy_code: {
            type: 'string',
            description: 'The policy code for the accrual balance update.'
          }
        },
        required: ['companyID', 'employees', 'policy_code']
      }
    }
  }
};

export { apiTool };