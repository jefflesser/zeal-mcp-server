/**
 * Function to set an employee's onboarded status to true.
 *
 * @param {Object} args - Arguments for the onboarded status update.
 * @param {string} args.employeeID - The ID of the employee to update.
 * @param {string} args.companyID - The ID of the company associated with the employee.
 * @returns {Promise<Object>} - The result of the onboarded status update.
 */
const executeFunction = async ({ employeeID, companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL for the API request
    const url = `${apiUrl}/employees/setOnboardedStatusToTrue`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({ employeeID, companyID });

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
    console.error('Error setting onboarded status:', error);
    return {
      error: `An error occurred while setting onboarded status: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for setting an employee's onboarded status to true.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'set_onboarded_status',
      description: 'Set an employee as onboarded.',
      parameters: {
        type: 'object',
        properties: {
          employeeID: {
            type: 'string',
            description: 'The ID of the employee to update.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company associated with the employee.'
          }
        },
        required: ['employeeID', 'companyID']
      }
    }
  }
};

export { apiTool };