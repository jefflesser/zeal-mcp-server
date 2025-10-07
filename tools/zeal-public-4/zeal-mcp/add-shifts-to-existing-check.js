/**
 * Function to add shifts to an existing employee check in Zeal MCP.
 *
 * @param {Object} args - Arguments for adding shifts.
 * @param {Array} args.shifts - An array of shift objects to be added.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeCheckID - The ID of the employee check.
 * @returns {Promise<Object>} - The result of the API call to add shifts.
 */
const executeFunction = async ({ shifts, companyID, employeeCheckID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the request body
    const body = JSON.stringify({
      shifts,
      companyID,
      employeeCheckID
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
    const response = await fetch(`${apiUrl}/shifts`, {
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
    console.error('Error adding shifts:', error);
    return {
      error: `An error occurred while adding shifts: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for adding shifts to an existing employee check in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_shifts_to_check',
      description: 'Add shifts to an existing employee check in Zeal MCP.',
      parameters: {
        type: 'object',
        properties: {
          shifts: {
            type: 'array',
            description: 'An array of shift objects to be added.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employeeCheckID: {
            type: 'string',
            description: 'The ID of the employee check.'
          }
        },
        required: ['shifts', 'companyID', 'employeeCheckID']
      }
    }
  }
};

export { apiTool };