/**
 * Function to create accrual policy usage for employees.
 *
 * @param {Object} args - Arguments for creating accrual policy usage.
 * @param {string} args.policyCode - The unique identifier for the accrual policy.
 * @param {string} args.companyID - The ID of the company.
 * @param {Array<Object>} args.employees - List of employees with their usage details.
 * @param {string} args.employees[].employeeID - The ID of the employee.
 * @param {string} args.employees[].start_date - The start date for the accrual usage.
 * @param {string} args.employees[].end_date - The end date for the accrual usage.
 * @param {number} args.employees[].amount - The amount of accrual usage.
 * @returns {Promise<Object>} - The result of the accrual policy usage creation.
 */
const executeFunction = async ({ policyCode, companyID, employees }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL
    const url = `${apiUrl}/accrualPolicy/${policyCode}/usage`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({
      companyID,
      employees
    });

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error creating accrual policy usage:', error);
    return {
      error: `An error occurred while creating accrual policy usage: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating accrual policy usage.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_accrual_policy_usage',
      description: 'Create accrual policy usage for employees.',
      parameters: {
        type: 'object',
        properties: {
          policyCode: {
            type: 'string',
            description: 'The unique identifier for the accrual policy.'
          },
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
                start_date: {
                  type: 'string',
                  description: 'The start date for the accrual usage.'
                },
                end_date: {
                  type: 'string',
                  description: 'The end date for the accrual usage.'
                },
                amount: {
                  type: 'number',
                  description: 'The amount of accrual usage.'
                }
              },
              required: ['employeeID', 'start_date', 'end_date', 'amount']
            },
            description: 'List of employees with their usage details.'
          }
        },
        required: ['policyCode', 'companyID', 'employees']
      }
    }
  }
};

export { apiTool };