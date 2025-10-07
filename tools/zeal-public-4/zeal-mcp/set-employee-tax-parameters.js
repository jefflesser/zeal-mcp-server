/**
 * Function to set employee tax parameters in the Zeal MCP API.
 *
 * @param {Object} args - Arguments for setting tax parameters.
 * @param {string} args.employeeID - The ID of the employee.
 * @param {string} args.companyID - The ID of the company.
 * @param {Array} args.federalParameters - The federal tax parameters.
 * @param {Array} args.stateParameters - The state tax parameters.
 * @returns {Promise<Object>} - The result of the tax parameters setting operation.
 */
const executeFunction = async ({ employeeID, companyID, federalParameters, stateParameters }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the request body
    const body = {
      employeeID,
      companyID,
      federalParameters,
      stateParameters
    };

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
    const response = await fetch(`${apiUrl}/employees/setTaxParameters`, {
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
    console.error('Error setting employee tax parameters:', error);
    return {
      error: `An error occurred while setting employee tax parameters: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for setting employee tax parameters in the Zeal MCP API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'set_employee_tax_parameters',
      description: 'Set an employee\'s tax withholding parameters.',
      parameters: {
        type: 'object',
        properties: {
          employeeID: {
            type: 'string',
            description: 'The ID of the employee.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          federalParameters: {
            type: 'array',
            description: 'The federal tax parameters.'
          },
          stateParameters: {
            type: 'array',
            description: 'The state tax parameters.'
          }
        },
        required: ['employeeID', 'companyID', 'federalParameters', 'stateParameters']
      }
    }
  }
};

export { apiTool };