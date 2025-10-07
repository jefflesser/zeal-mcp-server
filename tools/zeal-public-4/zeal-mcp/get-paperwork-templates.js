/**
 * Function to get paperwork templates from Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The ID of the company for which to get paperwork templates.
 * @param {string} args.worker_type - The type of worker (e.g., Employee).
 * @param {string} args.paperwork_type - The type of paperwork (e.g., W4).
 * @param {Array<string>} args.jurisdictions - List of jurisdictions to include.
 * @param {string} args.jurisdiction_type - The type of jurisdiction (e.g., WorkLocation).
 * @param {string} args.effective_date - The effective date for the paperwork.
 * @returns {Promise<Object>} - The result of the paperwork templates request.
 */
const executeFunction = async ({ companyID, worker_type, paperwork_type, jurisdictions, jurisdiction_type, effective_date }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const requestBody = {
    companyID,
    worker_type,
    paperwork_type,
    jurisdictions: {
      type: "include",
      jurisdictions
    },
    jurisdiction_type,
    effective_date
  };

  try {
    const response = await fetch(`${apiUrl}/paperwork/templates`, {
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
    console.error('Error getting paperwork templates:', error);
    return {
      error: `An error occurred while getting paperwork templates: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting paperwork templates from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_paperwork_templates',
      description: 'Get paperwork templates from Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which to get paperwork templates.'
          },
          worker_type: {
            type: 'string',
            description: 'The type of worker (e.g., Employee).'
          },
          paperwork_type: {
            type: 'string',
            description: 'The type of paperwork (e.g., W4).'
          },
          jurisdictions: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'List of jurisdictions to include.'
          },
          jurisdiction_type: {
            type: 'string',
            description: 'The type of jurisdiction (e.g., WorkLocation).'
          },
          effective_date: {
            type: 'string',
            description: 'The effective date for the paperwork.'
          }
        },
        required: ['companyID', 'worker_type', 'paperwork_type', 'jurisdictions', 'jurisdiction_type', 'effective_date']
      }
    }
  }
};

export { apiTool };