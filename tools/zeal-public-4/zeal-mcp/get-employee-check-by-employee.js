/**
 * Function to get employee check details by employee ID.
 *
 * @param {Object} args - Arguments for the employee check request.
 * @param {string} args.companyID - The ID of the company (required).
 * @param {string} args.employeeID - The ID of the employee (required).
 * @param {string} [args.status] - The status of the employee check (optional).
 * @param {string} args.reportingPeriodID - The ID of the reporting period (required).
 * @returns {Promise<Object>} - The result of the employee check request.
 */
const executeFunction = async ({ companyID, employeeID, status = '', reportingPeriodID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/employeeCheck`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('employeeID', employeeID);
    if (status) {
      url.searchParams.append('status', status);
    }
    url.searchParams.append('reportingPeriodID', reportingPeriodID);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
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
    console.error('Error fetching employee check:', error);
    return {
      error: `An error occurred while fetching employee check: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting employee check details.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_employee_check',
      description: 'Get employee check details by employee ID.',
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
          status: {
            type: 'string',
            description: 'The status of the employee check.'
          },
          reportingPeriodID: {
            type: 'string',
            description: 'The ID of the reporting period.'
          }
        },
        required: ['companyID', 'employeeID', 'reportingPeriodID']
      }
    }
  }
};

export { apiTool };