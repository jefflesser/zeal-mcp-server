/**
 * Function to set up payroll in the Zeal MCP API.
 *
 * @param {Object} args - Arguments for setting up payroll.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.firstCheckDate - The date of the first check.
 * @param {string} args.paySchedule - The pay schedule (e.g., "semimonthly").
 * @param {string} args.reportingPeriodID - The ID of the reporting period.
 * @returns {Promise<Object>} - The result of the payroll setup.
 */
const executeFunction = async ({ companyID, firstCheckDate, paySchedule, reportingPeriodID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  // Construct the request body
  const body = JSON.stringify({
    companyID,
    firstCheckDate,
    paySchedule,
    reportingPeriodID
  });

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
    const response = await fetch(`${apiUrl}/payroll/setup`, {
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
    console.error('Error setting up payroll:', error);
    return {
      error: `An error occurred while setting up payroll: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for setting up payroll in the Zeal MCP API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'setup_payroll',
      description: 'Set up payroll in the Zeal MCP API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          firstCheckDate: {
            type: 'string',
            description: 'The date of the first check.'
          },
          paySchedule: {
            type: 'string',
            description: 'The pay schedule (e.g., "semimonthly").'
          },
          reportingPeriodID: {
            type: 'string',
            description: 'The ID of the reporting period.'
          }
        },
        required: ['companyID', 'firstCheckDate', 'paySchedule', 'reportingPeriodID']
      }
    }
  }
};

export { apiTool };