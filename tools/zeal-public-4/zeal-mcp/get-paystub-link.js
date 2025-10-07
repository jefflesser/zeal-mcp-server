/**
 * Function to fetch an expirable link that displays an employee paystub.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The Company ID of the employer (required).
 * @param {string} args.employeeCheckID - The ID of the Employee Check (required).
 * @returns {Promise<Object>} - The response containing the paystub link or an error message.
 */
const executeFunction = async ({ companyID, employeeCheckID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/paystubLink`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('employeeCheckID', employeeCheckID);

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
    console.error('Error fetching paystub link:', error);
    return {
      error: `An error occurred while fetching the paystub link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for fetching paystub link from Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_paystub_link',
      description: 'Fetch an expirable link that displays an employee paystub.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The Company ID of the employer.'
          },
          employeeCheckID: {
            type: 'string',
            description: 'The ID of the Employee Check.'
          }
        },
        required: ['companyID', 'employeeCheckID']
      }
    }
  }
};

export { apiTool };