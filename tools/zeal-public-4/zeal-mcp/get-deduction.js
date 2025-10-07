/**
 * Function to get a specific deduction from the Zeal API.
 *
 * @param {Object} args - Arguments for the deduction retrieval.
 * @param {string} args.deductionID - The ID of the deduction to be retrieved.
 * @param {string} args.companyID - The Company ID of the employer.
 * @param {string} args.employeeCheckID - The ID of the employee check.
 * @returns {Promise<Object>} - The result of the deduction retrieval.
 */
const executeFunction = async ({ deductionID, companyID, employeeCheckID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/deductions`);
    url.searchParams.append('deductionID', deductionID);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('employeeCheckID', employeeCheckID);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
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
    console.error('Error retrieving deduction:', error);
    return {
      error: `An error occurred while retrieving the deduction: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a specific deduction from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_deduction',
      description: 'Get a specific deduction from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          deductionID: {
            type: 'string',
            description: 'The ID of the deduction to be retrieved.'
          },
          companyID: {
            type: 'string',
            description: 'The Company ID of the employer.'
          },
          employeeCheckID: {
            type: 'string',
            description: 'The ID of the employee check.'
          }
        },
        required: ['deductionID', 'companyID', 'employeeCheckID']
      }
    }
  }
};

export { apiTool };