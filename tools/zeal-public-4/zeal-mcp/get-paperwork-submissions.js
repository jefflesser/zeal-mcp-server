/**
 * Function to get paperwork submissions from Zeal API.
 *
 * @param {Object} args - Arguments for the submission request.
 * @param {string} args.companyID - The ID of the company.
 * @param {Array<string>} args.jurisdictions - The jurisdictions to include in the filter.
 * @param {Array<string>} args.employeeIDs - The employee IDs to include in the worker filter.
 * @returns {Promise<Object>} - The result of the paperwork submissions request.
 */
const executeFunction = async ({ companyID, jurisdictions, employeeIDs }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  const requestBody = {
    companyID,
    jurisdiction_filter: {
      type: 'include',
      jurisdictions
    },
    worker_filter: {
      type: 'include',
      employeeIDs
    }
  };

  try {
    const response = await fetch(`${apiUrl}/paperwork/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting paperwork submissions:', error);
    return {
      error: `An error occurred while getting paperwork submissions: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting paperwork submissions from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_paperwork_submissions',
      description: 'Get paperwork submissions from Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          jurisdictions: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The jurisdictions to include in the filter.'
          },
          employeeIDs: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The employee IDs to include in the worker filter.'
          }
        },
        required: ['companyID', 'jurisdictions', 'employeeIDs']
      }
    }
  }
};

export { apiTool };