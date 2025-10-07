/**
 * Function to create a quarter to date report.
 *
 * @param {Object} args - Arguments for creating the report.
 * @param {string} args.companyID - The ID of the company for which the report is generated.
 * @param {Array<string>} args.employeeID - An array of employee IDs for the report.
 * @param {string} args.quarter - The quarter for which the report is generated (e.g., "q1").
 * @returns {Promise<Object>} - The result of the report creation.
 */
const executeFunction = async ({ companyID, employeeID, quarter }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const requestBody = {
    companyID,
    employeeID: [employeeID],
    quarter,
    media_type: 'json'
  };

  try {
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
    const response = await fetch(`${apiUrl}/reports/qtd`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
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
    console.error('Error creating quarter to date report:', error);
    return {
      error: `An error occurred while creating the report: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a quarter to date report.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_quarter_to_date_report',
      description: 'Create a quarter to date report.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the report is generated.'
          },
          employeeID: {
            type: 'string',
            description: 'An array of employee IDs for the report.'
          },
          quarter: {
            type: 'string',
            description: 'The quarter for which the report is generated (e.g., "q1").'
          }
        },
        required: ['companyID', 'employeeID', 'quarter']
      }
    }
  }
};

export { apiTool };