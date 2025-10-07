/**
 * Function to create a payment summary report.
 *
 * @param {Object} args - Arguments for the report creation.
 * @param {string} args.pay_start_date - The start date for the payment period.
 * @param {string} args.pay_end_date - The end date for the payment period.
 * @param {string} args.companyID - The ID of the company for which the report is generated.
 * @param {string} [args.media_type="pdf"] - The format of the report (default is pdf).
 * @returns {Promise<Object>} - The result of the report creation.
 */
const executeFunction = async ({ pay_start_date, pay_end_date, companyID, media_type = 'pdf' }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${apiUrl}/reports/payment-summary`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({
      pay_start_date,
      pay_end_date,
      companyID,
      media_type
    });

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
    console.error('Error creating payment summary report:', error);
    return {
      error: `An error occurred while creating the payment summary report: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a payment summary report.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_payment_summary_report',
      description: 'Create a payment summary report.',
      parameters: {
        type: 'object',
        properties: {
          pay_start_date: {
            type: 'string',
            description: 'The start date for the payment period.'
          },
          pay_end_date: {
            type: 'string',
            description: 'The end date for the payment period.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the report is generated.'
          },
          media_type: {
            type: 'string',
            description: 'The format of the report.'
          }
        },
        required: ['pay_start_date', 'pay_end_date', 'companyID']
      }
    }
  }
};

export { apiTool };