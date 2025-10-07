/**
 * Function to get the employee deduction template from Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.deductionTemplateID - The ID of the deduction template to retrieve.
 * @returns {Promise<Object>} - The result of the API call.
 */
const executeFunction = async ({ deductionTemplateID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with the deduction template ID
    const url = `${apiUrl}/employee-deduction-templates/${deductionTemplateID}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

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
    console.error('Error getting employee deduction template:', error);
    return {
      error: `An error occurred while getting the employee deduction template: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting employee deduction template from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_employee_deduction_template',
      description: 'Retrieve an employee deduction template from Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          deductionTemplateID: {
            type: 'string',
            description: 'The ID of the deduction template to retrieve.'
          }
        },
        required: ['deductionTemplateID']
      }
    }
  }
};

export { apiTool };