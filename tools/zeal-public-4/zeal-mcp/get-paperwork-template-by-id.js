/**
 * Function to get a paperwork template by its ID from the Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.templateID - The unique identifier for the paperwork template (required).
 * @returns {Promise<Object>} - The response from the API containing the paperwork template details.
 */
const executeFunction = async ({ templateID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with the template ID
    const url = `${apiUrl}/paperwork/templates/${templateID}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error fetching paperwork template:', error);
    return {
      error: `An error occurred while fetching the paperwork template: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting a paperwork template by ID from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_paperwork_template_by_id',
      description: 'Get a paperwork template by its ID from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          templateID: {
            type: 'string',
            description: 'The unique identifier for the paperwork template.'
          }
        },
        required: ['templateID']
      }
    }
  }
};

export { apiTool };