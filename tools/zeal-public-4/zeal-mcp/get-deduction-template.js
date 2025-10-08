/**
 * Function to get a deduction template from the Zeal API.
 *
 * @param {Object} args - Arguments for the deduction template retrieval.
 * @param {string} args.companyID - The ID of the company (required).
 * @param {string} [args.deductionTemplateID] - The ID of the deduction template. If not provided, all deduction templates will be retrieved.
 * @returns {Promise<Object>} - The result of the deduction template retrieval.
 */
const executeFunction = async ({ companyID, deductionTemplateID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/deductionTemplate`);
    url.searchParams.append('companyID', companyID);
    if (deductionTemplateID) {
      url.searchParams.append('deductionTemplateID', deductionTemplateID);
    }

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
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
    console.error('Error retrieving deduction template:', error);
    return {
      error: `An error occurred while retrieving the deduction template: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving deduction templates from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_deduction_template',
      description: 'Get a deduction template from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company (required).'
          },
          deductionTemplateID: {
            type: 'string',
            description: 'The ID of the deduction template. If not provided, all deduction templates will be retrieved.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };