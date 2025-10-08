/**
 * Function to delete pending shifts from the Zeal API.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.companyID - The company ID of the employer (required).
 * @param {string} args.shiftID - The ID of the shift to be deleted (required).
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ companyID, shiftID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/shifts`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('shiftID', shiftID);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting pending shifts:', error);
    return {
      error: `An error occurred while deleting pending shifts: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting pending shifts from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_pending_shifts',
      description: 'Delete pending shifts from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the employer.'
          },
          shiftID: {
            type: 'string',
            description: 'The ID of the shift to be deleted.'
          }
        },
        required: ['companyID', 'shiftID']
      }
    }
  }
};

export { apiTool };