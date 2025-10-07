/**
 * Function to get deduction template definitions from Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.deduction_type - The deduction type for which the template definition is required.
 * @returns {Promise<Object>} - The response from the API containing the deduction template definitions.
 */
const executeFunction = async ({ deduction_type }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/deductionTemplateDefinitions`);
    url.searchParams.append('deduction_type', deduction_type);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
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
    console.error('Error getting deduction template definitions:', error);
    return {
      error: `An error occurred while getting deduction template definitions: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting deduction template definitions from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_deduction_template_definitions',
      description: 'Get a definition for a deduction template.',
      parameters: {
        type: 'object',
        properties: {
          deduction_type: {
            type: 'string',
            description: '(Required) Deduction type for which Deduction Template Definition is required.'
          }
        },
        required: ['deduction_type']
      }
    }
  }
};

export { apiTool };