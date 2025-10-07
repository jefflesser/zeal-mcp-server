/**
 * Function to update a pending employee check.
 *
 * @param {Object} args - Arguments for updating the employee check.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeCheckID - The ID of the employee check to update.
 * @param {string} args.reportingPeriodID - The ID of the reporting period.
 * @param {string} [args.check_date="1954-11-26"] - The date of the check.
 * @param {boolean} [args.approval_required=true] - Indicates if approval is required.
 * @param {boolean} [args.approved=true] - Indicates if the check is approved.
 * @param {Object} [args.metadata={}] - Additional metadata for the check.
 * @param {Object} [args.disbursement={ method: "direct_deposit" }] - Disbursement method details.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ companyID, employeeCheckID, reportingPeriodID, check_date = "1954-11-26", approval_required = true, approved = true, metadata = {}, disbursement = { method: "direct_deposit" } }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL for the PATCH request
    const url = `${apiUrl}/employeeCheck`;

    // Prepare the request body
    const body = JSON.stringify({
      companyID,
      employeeCheckID,
      reportingPeriodID,
      check_date,
      approval_required,
      approved,
      metadata,
      disbursement
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
      method: 'PATCH',
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
    console.error('Error updating employee check:', error);
    return {
      error: `An error occurred while updating the employee check: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating employee checks.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_employee_check',
      description: 'Update a pending employee check.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employeeCheckID: {
            type: 'string',
            description: 'The ID of the employee check to update.'
          },
          reportingPeriodID: {
            type: 'string',
            description: 'The ID of the reporting period.'
          },
          check_date: {
            type: 'string',
            description: 'The date of the check.'
          },
          approval_required: {
            type: 'boolean',
            description: 'Indicates if approval is required.'
          },
          approved: {
            type: 'boolean',
            description: 'Indicates if the check is approved.'
          },
          metadata: {
            type: 'object',
            description: 'Additional metadata for the check.'
          },
          disbursement: {
            type: 'object',
            description: 'Disbursement method details.'
          }
        },
        required: ['companyID', 'employeeCheckID', 'reportingPeriodID']
      }
    }
  }
};

export { apiTool };