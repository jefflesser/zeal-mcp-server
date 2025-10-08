/**
 * Function to create a deduction summary report.
 *
 * @param {Object} args - Arguments for creating the report.
 * @param {string} args.companyID - The ID of the company for which the report is generated.
 * @param {string} args.start_date - The start date for the report in YYYY-MM-DD format.
 * @param {string} args.end_date - The end date for the report in YYYY-MM-DD format.
 * @param {string} [args.media_type="csv"] - The media type for the report (default is "csv").
 * @returns {Promise<Object>} - The result of the report creation.
 */
const executeFunction = async ({ companyID, start_date, end_date, media_type = 'csv' }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${apiUrl}/reports/deductions-summary`;

    // Prepare the request body
    const body = JSON.stringify({
      companyID,
      media_type,
      start_date,
      end_date
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
    console.error('Error creating deduction summary report:', error);
    return {
      error: `An error occurred while creating the report: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a deduction summary report.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_deduction_summary_report',
      description: 'Create a deduction summary report.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the report is generated.'
          },
          start_date: {
            type: 'string',
            description: 'The start date for the report in YYYY-MM-DD format.'
          },
          end_date: {
            type: 'string',
            description: 'The end date for the report in YYYY-MM-DD format.'
          },
          media_type: {
            type: 'string',
            description: 'The media type for the report (default is "csv").'
          }
        },
        required: ['companyID', 'start_date', 'end_date']
      }
    }
  }
};

export { apiTool };