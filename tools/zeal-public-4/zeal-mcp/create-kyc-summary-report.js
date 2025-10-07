/**
 * Function to create a KYC summary report.
 *
 * @param {Object} args - Arguments for creating the KYC summary report.
 * @param {string} args.companyID - The ID of the company for which the report is generated.
 * @param {string} [args.employment_status="live"] - The employment status to filter the report.
 * @param {string} [args.kyc_status="all"] - The KYC status to filter the report.
 * @param {string} [args.media_type="csv"] - The media type of the report.
 * @returns {Promise<Object>} - The result of the KYC summary report creation.
 */
const executeFunction = async ({ companyID, employment_status = 'live', kyc_status = 'all', media_type = 'csv' }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the request body
    const body = JSON.stringify({
      companyID,
      employment_status,
      kyc_status,
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
    const response = await fetch(`${apiUrl}/kyc-summary`, {
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
    console.error('Error creating KYC summary report:', error);
    return {
      error: `An error occurred while creating the KYC summary report: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a KYC summary report.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_kyc_summary_report',
      description: 'Create a KYC summary report for flagged workers by company.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the report is generated.'
          },
          employment_status: {
            type: 'string',
            description: 'The employment status to filter the report.'
          },
          kyc_status: {
            type: 'string',
            description: 'The KYC status to filter the report.'
          },
          media_type: {
            type: 'string',
            description: 'The media type of the report.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };