/**
 * Function to create a labor allocation report.
 *
 * @param {Object} args - Arguments for the report creation.
 * @param {string} args.start_date - The start date for the report.
 * @param {string} args.end_date - The end date for the report.
 * @param {string} args.companyID - The ID of the company for which the report is generated.
 * @param {string} [args.media_type="csv"] - The media type of the report.
 * @param {boolean} [args.include_migrated=false] - Whether to include migrated data in the report.
 * @returns {Promise<Object>} - The result of the report creation.
 */
const executeFunction = async ({ start_date, end_date, companyID, media_type = 'csv', include_migrated = false }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the request body
    const body = JSON.stringify({
      start_date,
      end_date,
      companyID,
      media_type,
      include_migrated
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
    const response = await fetch(`${apiUrl}/reports/labor-allocation`, {
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
    console.error('Error creating labor allocation report:', error);
    return {
      error: `An error occurred while creating the report: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a labor allocation report.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_labor_allocation_report',
      description: 'Create a labor allocation report.',
      parameters: {
        type: 'object',
        properties: {
          start_date: {
            type: 'string',
            description: 'The start date for the report.'
          },
          end_date: {
            type: 'string',
            description: 'The end date for the report.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the report is generated.'
          },
          media_type: {
            type: 'string',
            description: 'The media type of the report.'
          },
          include_migrated: {
            type: 'boolean',
            description: 'Whether to include migrated data in the report.'
          }
        },
        required: ['start_date', 'end_date', 'companyID']
      }
    }
  }
};

export { apiTool };