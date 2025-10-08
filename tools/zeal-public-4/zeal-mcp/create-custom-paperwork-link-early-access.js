/**
 * Function to create a custom paperwork link for an employee.
 *
 * @param {Object} args - Arguments for creating the paperwork link.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeID - The ID of the employee.
 * @param {Array<string>} args.formTemplateIDs - An array of form template IDs.
 * @param {boolean} [args.send_to_worker=false] - Whether to send the paperwork to the worker.
 * @returns {Promise<Object>} - The result of the paperwork link creation.
 */
const executeFunction = async ({ companyID, employeeID, formTemplateIDs, send_to_worker = false }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  const requestBody = {
    companyID,
    employeeID,
    formTemplateIDs,
    send_to_worker
  };

  try {
    // Perform the fetch request
    const response = await fetch(`${apiUrl}/employees/custom_paperwork`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
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
    console.error('Error creating custom paperwork link:', error);
    return {
      error: `An error occurred while creating the custom paperwork link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a custom paperwork link.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_custom_paperwork_link',
      description: 'Create a custom paperwork link for an employee.',
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
          formTemplateIDs: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of form template IDs.'
          },
          send_to_worker: {
            type: 'boolean',
            description: 'Whether to send the paperwork to the worker.'
          }
        },
        required: ['companyID', 'employeeID', 'formTemplateIDs']
      }
    }
  }
};

export { apiTool };