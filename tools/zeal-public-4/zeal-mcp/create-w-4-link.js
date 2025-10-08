/**
 * Function to create a W4 link for an employee.
 *
 * @param {Object} args - Arguments for creating the W4 link.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeID - The ID of the employee.
 * @param {string} [args.jurisdiction="CA"] - The jurisdiction for the W4 form.
 * @param {boolean} [args.send_to_worker=false] - Whether to send the link to the worker.
 * @returns {Promise<Object>} - The result of the W4 link creation.
 */
const executeFunction = async ({ companyID, employeeID, jurisdiction = 'CA', send_to_worker = false }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  
  const requestBody = {
    companyID,
    employeeID,
    jurisdiction,
    send_to_worker
  };

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${apiUrl}/employees/w4`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
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
    console.error('Error creating W4 link:', error);
    return {
      error: `An error occurred while creating the W4 link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a W4 link for an employee.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_w4_link',
      description: 'Create a W4 link for an employee.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employeeID: {
            type: 'string',
            description: 'The ID of the employee.'
          },
          jurisdiction: {
            type: 'string',
            description: 'The jurisdiction for the W4 form.'
          },
          send_to_worker: {
            type: 'boolean',
            description: 'Whether to send the link to the worker.'
          }
        },
        required: ['companyID', 'employeeID']
      }
    }
  }
};

export { apiTool };