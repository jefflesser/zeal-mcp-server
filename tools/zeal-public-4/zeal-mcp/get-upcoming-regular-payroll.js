/**
 * Function to get the upcoming regular payroll information for a specified company.
 *
 * @param {Object} args - Arguments for the payroll request.
 * @param {string} args.companyID - The ID of the company for which to retrieve payroll information.
 * @returns {Promise<Object>} - The result of the payroll information request.
 */
const executeFunction = async ({ companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/payroll/regular`);
    url.searchParams.append('companyID', companyID);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
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
    console.error('Error fetching payroll information:', error);
    return {
      error: `An error occurred while fetching payroll information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting upcoming regular payroll information.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_upcoming_regular_payroll',
      description: 'Get the upcoming regularly scheduled payroll information for a company.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which to retrieve payroll information.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };