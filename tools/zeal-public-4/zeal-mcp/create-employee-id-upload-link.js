/**
 * Function to create an employee ID upload link in Zeal MCP.
 *
 * @param {Object} args - Arguments for creating the upload link.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeID - The ID of the employee.
 * @param {Array<string>} args.document_type - The types of documents to upload.
 * @param {boolean} [args.send_to_worker=false] - Whether to send the link to the worker.
 * @returns {Promise<Object>} - The result of the upload link creation.
 */
const executeFunction = async ({ companyID, employeeID, document_type = ["passport", "social_security_card"], send_to_worker = false }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    const url = `${apiUrl}/employees/id_upload_link`;
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const body = JSON.stringify({
      companyID,
      employeeID,
      document_type,
      send_to_worker
    });

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating employee ID upload link:', error);
    return {
      error: `An error occurred while creating the upload link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating an employee ID upload link in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_employee_id_upload_link',
      description: 'Create an employee ID upload link in Zeal MCP.',
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
          document_type: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The types of documents to upload.'
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