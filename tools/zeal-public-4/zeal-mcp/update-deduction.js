/**
 * Function to update a deduction in the Zeal MCP API.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeCheckID - The ID of the employee check.
 * @param {string} args.deductionID - The ID of the deduction to update.
 * @param {Object} args.deduction - The deduction details to update.
 * @param {Object} args.deduction.employee_contribution - The employee contribution details.
 * @param {number} args.deduction.employee_contribution.value - The value of the employee contribution.
 * @param {string} args.deduction.employee_contribution.contribution_type - The type of employee contribution.
 * @param {Object} args.deduction.employer_contribution - The employer contribution details.
 * @param {number} args.deduction.employer_contribution.value - The value of the employer contribution.
 * @param {string} args.deduction.employer_contribution.contribution_type - The type of employer contribution.
 * @returns {Promise<Object>} - The result of the deduction update.
 */
const executeFunction = async ({ companyID, employeeCheckID, deductionID, deduction }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL for the PATCH request
    const url = `${apiUrl}/deductions`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Construct the body of the request
    const body = JSON.stringify({
      companyID,
      employeeCheckID,
      deductionID,
      deduction
    });

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error updating deduction:', error);
    return {
      error: `An error occurred while updating the deduction: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a deduction in the Zeal MCP API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_deduction',
      description: 'Update a deduction in the Zeal MCP API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employeeCheckID: {
            type: 'string',
            description: 'The ID of the employee check.'
          },
          deductionID: {
            type: 'string',
            description: 'The ID of the deduction to update.'
          },
          deduction: {
            type: 'object',
            properties: {
              employee_contribution: {
                type: 'object',
                properties: {
                  value: {
                    type: 'number',
                    description: 'The value of the employee contribution.'
                  },
                  contribution_type: {
                    type: 'string',
                    description: 'The type of employee contribution.'
                  }
                },
                required: ['value', 'contribution_type']
              },
              employer_contribution: {
                type: 'object',
                properties: {
                  value: {
                    type: 'number',
                    description: 'The value of the employer contribution.'
                  },
                  contribution_type: {
                    type: 'string',
                    description: 'The type of employer contribution.'
                  }
                },
                required: ['value', 'contribution_type']
              }
            },
            required: ['employee_contribution', 'employer_contribution']
          }
        },
        required: ['companyID', 'employeeCheckID', 'deductionID', 'deduction']
      }
    }
  }
};

export { apiTool };