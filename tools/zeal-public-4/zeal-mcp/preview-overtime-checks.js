/**
 * Function to preview overtime checks.
 *
 * @param {Object} args - Arguments for the preview.
 * @param {string} args.companyID - The ID of the company.
 * @param {Array<string>} args.checks - An array of check strings.
 * @returns {Promise<Object>} - The result of the preview request.
 */
const executeFunction = async ({ companyID, checks }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  const payload = {
    companyID,
    checks
  };

  try {
    // Perform the fetch request
    const response = await fetch(`${apiUrl}/preview/checks/ot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
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
    console.error('Error previewing overtime checks:', error);
    return {
      error: `An error occurred while previewing overtime checks: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for previewing overtime checks.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'preview_overtime_checks',
      description: 'Preview overtime checks for a company.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          checks: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of check strings.'
          }
        },
        required: ['companyID', 'checks']
      }
    }
  }
};

export { apiTool };