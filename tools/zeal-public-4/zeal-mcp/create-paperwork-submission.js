/**
 * Function to create a paperwork submission in Zeal MCP.
 *
 * @param {Object} args - Arguments for the paperwork submission.
 * @param {string} args.templateID - The ID of the template to use for the submission.
 * @param {string} args.worker_type - The type of worker (e.g., Employee).
 * @param {string} args.companyID - The ID of the company.
 * @param {Object} args.fields - The fields to include in the submission.
 * @param {string} args.employeeID - The ID of the employee.
 * @param {string} args.contractorID - The ID of the contractor.
 * @returns {Promise<Object>} - The result of the paperwork submission creation.
 */
const executeFunction = async ({ templateID, worker_type, companyID, fields, employeeID, contractorID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${apiUrl}/paperwork/submissions`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Create the request body
    const body = JSON.stringify({
      templateID,
      worker_type,
      companyID,
      fields,
      employeeID,
      contractorID,
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
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
    console.error('Error creating paperwork submission:', error);
    return {
      error: `An error occurred while creating paperwork submission: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a paperwork submission in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_paperwork_submission',
      description: 'Create a paperwork submission in Zeal MCP.',
      parameters: {
        type: 'object',
        properties: {
          templateID: {
            type: 'string',
            description: 'The ID of the template to use for the submission.'
          },
          worker_type: {
            type: 'string',
            description: 'The type of worker (e.g., Employee).'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          fields: {
            type: 'object',
            description: 'The fields to include in the submission.'
          },
          employeeID: {
            type: 'string',
            description: 'The ID of the employee.'
          },
          contractorID: {
            type: 'string',
            description: 'The ID of the contractor.'
          }
        },
        required: ['templateID', 'worker_type', 'companyID', 'fields', 'employeeID']
      }
    }
  }
};

export { apiTool };