/**
 * Function to delete a deduction from Zeal MCP.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeCheckID - The ID of the employee check.
 * @param {string} args.deductionID - The ID of the deduction to be deleted.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ companyID, employeeCheckID, deductionID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL for the DELETE request
    const url = `${apiUrl}/deductions`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Prepare the request body
    const body = JSON.stringify({
      companyID,
      employeeCheckID,
      deductionID,
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
      headers,
      body,
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
    console.error('Error deleting deduction:', error);
    return {
      error: `An error occurred while deleting the deduction: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a deduction from Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_deduction',
      description: 'Delete a deduction from Zeal MCP.',
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
            description: 'The ID of the deduction to be deleted.'
          }
        },
        required: ['companyID', 'employeeCheckID', 'deductionID']
      }
    }
  }
};

export { apiTool };