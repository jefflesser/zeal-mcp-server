/**
 * Function to generate employee tax parameter definitions.
 *
 * @param {Object} args - Arguments for the tax parameter generation.
 * @param {Array<string>} args.jurisdictions - An array of jurisdiction codes for which to retrieve tax parameters.
 * @returns {Promise<Object>} - The result of the tax parameter generation.
 */
const executeFunction = async ({ jurisdictions }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL for the API request
    const url = `${apiUrl}/employees/getTaxParameterDefinitions`;

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
    const body = JSON.stringify({ jurisdictions });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error generating employee tax parameter definitions:', error);
    return {
      error: `An error occurred while generating employee tax parameter definitions: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for generating employee tax parameter definitions.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_employee_tax_parameters',
      description: 'Generate employee tax parameter definitions based on jurisdictions.',
      parameters: {
        type: 'object',
        properties: {
          jurisdictions: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'An array of jurisdiction codes for which to retrieve tax parameters.'
          }
        },
        required: ['jurisdictions']
      }
    }
  }
};

export { apiTool };