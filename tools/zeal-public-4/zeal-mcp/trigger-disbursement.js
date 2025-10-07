/**
 * Function to trigger a disbursement for an employee check.
 *
 * @param {Object} args - Arguments for the disbursement trigger.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeCheckID - The ID of the employee check.
 * @returns {Promise<Object>} - The result of the disbursement trigger.
 */
const executeFunction = async ({ companyID, employeeCheckID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${apiUrl}/employeeCheck/trigger`;

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
      employeeCheckID
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
    console.error('Error triggering disbursement:', error);
    return {
      error: `An error occurred while triggering disbursement: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for triggering disbursement on Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'trigger_disbursement',
      description: 'Trigger a disbursement for an employee check.',
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
          }
        },
        required: ['companyID', 'employeeCheckID']
      }
    }
  }
};

export { apiTool };