/**
 * Function to create a Year to Date report.
 *
 * @param {Object} args - Arguments for the report creation.
 * @param {string} args.companyID - The ID of the company for which the report is generated.
 * @param {string} args.employeeID - The ID of the employee for whom the report is generated.
 * @param {string} [args.year="2023"] - The year for which the report is generated.
 * @returns {Promise<Object>} - The result of the report creation.
 */
const executeFunction = async ({ companyID, employeeID, year = '2023' }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL for the report creation
    const url = `${apiUrl}/reports/ytd`;

    // Prepare the request body
    const body = JSON.stringify({
      companyID,
      employeeID: [employeeID],
      year,
      media_type: 'json'
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
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
    console.error('Error creating Year to Date report:', error);
    return {
      error: `An error occurred while creating the report: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a Year to Date report.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_ytd_report',
      description: 'Create a Year to Date report.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the report is generated.'
          },
          employeeID: {
            type: 'string',
            description: 'The ID of the employee for whom the report is generated.'
          },
          year: {
            type: 'string',
            description: 'The year for which the report is generated.'
          }
        },
        required: ['companyID', 'employeeID']
      }
    }
  }
};

export { apiTool };