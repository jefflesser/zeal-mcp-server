/**
 * Function to create a cash requirements report.
 *
 * @param {Object} args - Arguments for the report creation.
 * @param {string} args.companyID - The ID of the company for which the report is generated.
 * @param {string} args.check_date - The date for the cash requirements check.
 * @param {string} args.media_type - The format of the report (e.g., pdf).
 * @returns {Promise<Object>} - The result of the report creation.
 */
const executeFunction = async ({ companyID, check_date, media_type }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL for the report creation
    const url = `${apiUrl}/reports/cash-requirements`;

    // Set up the request body
    const body = JSON.stringify({
      companyID,
      check_date,
      media_type
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
    console.error('Error creating cash requirements report:', error);
    return {
      error: `An error occurred while creating the report: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating cash requirements reports.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_cash_requirements_report',
      description: 'Create a cash requirements report.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the report is generated.'
          },
          check_date: {
            type: 'string',
            description: 'The date for the cash requirements check.'
          },
          media_type: {
            type: 'string',
            description: 'The format of the report (e.g., pdf).'
          }
        },
        required: ['companyID', 'check_date', 'media_type']
      }
    }
  }
};

export { apiTool };