/**
 * Function to delete a pending employee check.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.companyID - The Company ID of the employer.
 * @param {string} args.employeeCheckID - The ID of the Employee Check to be deleted.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ companyID, employeeCheckID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/employeeCheck`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('employeeCheckID', employeeCheckID);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'text/plain'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const data = await response.text();
    return JSON.parse(data);
  } catch (error) {
    console.error('Error deleting employee check:', error);
    return {
      error: `An error occurred while deleting the employee check: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting an employee check.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_employee_check',
      description: 'Delete a pending employee check.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The Company ID of the employer.'
          },
          employeeCheckID: {
            type: 'string',
            description: 'The ID of the Employee Check to be deleted.'
          }
        },
        required: ['companyID', 'employeeCheckID']
      }
    }
  }
};

export { apiTool };