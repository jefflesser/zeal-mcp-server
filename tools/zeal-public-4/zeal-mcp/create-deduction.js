/**
 * Function to create a deduction in the Zeal MCP API.
 *
 * @param {Object} args - Arguments for creating a deduction.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeCheckID - The ID of the employee check.
 * @param {number} args.employeeContribution - The employee contribution value.
 * @param {number} args.employerContribution - The employer contribution value.
 * @returns {Promise<Object>} - The result of the deduction creation.
 */
const executeFunction = async ({ companyID, employeeCheckID, employeeContribution, employerContribution }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const body = {
    companyID,
    employeeCheckID,
    deductionTemplateID: "61d12e74db7df700237de5d4",
    deduction: {
      employee_contribution: {
        value: employeeContribution
      },
      employer_contribution: {
        value: employerContribution
      }
    }
  };

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${apiUrl}/deductions`, {
      method: 'POST',
      headers,
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
    console.error('Error creating deduction:', error);
    return {
      error: `An error occurred while creating the deduction: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating deductions in the Zeal MCP API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_deduction',
      description: 'Create a deduction in the Zeal MCP API.',
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
          employeeContribution: {
            type: 'number',
            description: 'The employee contribution value.'
          },
          employerContribution: {
            type: 'number',
            description: 'The employer contribution value.'
          }
        },
        required: ['companyID', 'employeeCheckID', 'employeeContribution', 'employerContribution']
      }
    }
  }
};

export { apiTool };