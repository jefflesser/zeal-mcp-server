/**
 * Function to create an employee check in the Zeal MCP API.
 *
 * @param {Object} args - Arguments for creating the employee check.
 * @param {boolean} args.approval_required - Indicates if approval is required for the check.
 * @param {Object} args.disbursement - The disbursement method for the check.
 * @param {Array} args.shifts - The shifts associated with the employee check.
 * @param {string} args.reportingPeriodID - The ID of the reporting period.
 * @param {string} args.check_date - The date of the check.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeID - The ID of the employee.
 * @returns {Promise<Object>} - The result of the employee check creation.
 */
const executeFunction = async ({ approval_required, disbursement, shifts, reportingPeriodID, check_date, companyID, employeeID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const requestBody = {
    approval_required,
    disbursement,
    shifts,
    reportingPeriodID,
    check_date,
    companyID,
    employeeID
  };

  try {
    // Perform the fetch request
    const response = await fetch(`${apiUrl}/employeeCheck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
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
    console.error('Error creating employee check:', error);
    return {
      error: `An error occurred while creating the employee check: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating an employee check in the Zeal MCP API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_employee_check',
      description: 'Create a check for an employee in the Zeal MCP API.',
      parameters: {
        type: 'object',
        properties: {
          approval_required: {
            type: 'boolean',
            description: 'Indicates if approval is required for the check.'
          },
          disbursement: {
            type: 'object',
            description: 'The disbursement method for the check.'
          },
          shifts: {
            type: 'array',
            description: 'The shifts associated with the employee check.'
          },
          reportingPeriodID: {
            type: 'string',
            description: 'The ID of the reporting period.'
          },
          check_date: {
            type: 'string',
            description: 'The date of the check.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employeeID: {
            type: 'string',
            description: 'The ID of the employee.'
          }
        },
        required: ['approval_required', 'disbursement', 'shifts', 'reportingPeriodID', 'check_date', 'companyID', 'employeeID']
      }
    }
  }
};

export { apiTool };