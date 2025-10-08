/**
 * Function to get attributes from the Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The ID of the company (required).
 * @param {string} [args.employeeID] - The ID of the employee (optional).
 * @param {string} [args.contractorID] - The ID of the contractor (optional).
 * @returns {Promise<Object>} - The response data from the API.
 */
const executeFunction = async ({ companyID, employeeID = '', contractorID = '' }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/attributes`);
    url.searchParams.append('companyID', companyID);
    if (employeeID) url.searchParams.append('employeeID', employeeID);
    if (contractorID) url.searchParams.append('contractorID', contractorID);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };

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
    console.error('Error getting attributes:', error);
    return {
      error: `An error occurred while getting attributes: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting attributes from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_attributes',
      description: 'Get attributes from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employeeID: {
            type: 'string',
            description: 'The ID of the employee.'
          },
          contractorID: {
            type: 'string',
            description: 'The ID of the contractor.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };