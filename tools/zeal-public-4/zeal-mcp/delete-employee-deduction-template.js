/**
 * Function to delete an employee deduction template.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.deductionTemplateID - The ID of the deduction template to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ deductionTemplateID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL with the deductionTemplateID
    const url = `${apiUrl}/employee-deduction-templates/${deductionTemplateID}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error deleting employee deduction template:', error);
    return {
      error: `An error occurred while deleting the employee deduction template: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting an employee deduction template.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_employee_deduction_template',
      description: 'Delete an employee deduction template.',
      parameters: {
        type: 'object',
        properties: {
          deductionTemplateID: {
            type: 'string',
            description: 'The ID of the deduction template to delete.'
          }
        },
        required: ['deductionTemplateID']
      }
    }
  }
};

export { apiTool };