/**
 * Function to create a custom payroll journal report.
 *
 * @param {Object} args - Arguments for the report creation.
 * @param {string} args.start_date - The start date for the report in MM-DD-YYYY format.
 * @param {string} args.end_date - The end date for the report in MM-DD-YYYY format.
 * @param {string} args.companyID - The ID of the company for which the report is generated.
 * @param {string} [args.media_type="pdf"] - The media type of the report.
 * @param {Object} [args.fields] - The fields to include in the report.
 * @returns {Promise<Object>} - The result of the report creation.
 */
const executeFunction = async ({ start_date, end_date, companyID, media_type = 'pdf', fields }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const body = {
    start_date,
    end_date,
    companyID,
    media_type,
    fields: fields || {
      employee_taxes: false,
      employer_taxes: false,
      deductions: false,
      net_pay: false,
      earnings: false,
      disbursement: false,
      gross_pay: false
    }
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
    const response = await fetch(`${apiUrl}/reports/custom-payroll-journal`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
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
    console.error('Error creating payroll journal report:', error);
    return {
      error: `An error occurred while creating the payroll journal report: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a custom payroll journal report.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_custom_payroll_journal_report',
      description: 'Create a custom payroll journal report.',
      parameters: {
        type: 'object',
        properties: {
          start_date: {
            type: 'string',
            description: 'The start date for the report in MM-DD-YYYY format.'
          },
          end_date: {
            type: 'string',
            description: 'The end date for the report in MM-DD-YYYY format.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the report is generated.'
          },
          media_type: {
            type: 'string',
            description: 'The media type of the report.'
          },
          fields: {
            type: 'object',
            description: 'The fields to include in the report.'
          }
        },
        required: ['start_date', 'end_date', 'companyID']
      }
    }
  }
};

export { apiTool };