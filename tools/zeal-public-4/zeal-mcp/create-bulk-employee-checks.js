/**
 * Function to create bulk employee checks in the Zeal API.
 *
 * @param {Object} args - Arguments for creating employee checks.
 * @param {string} args.companyID - The ID of the company.
 * @param {Array<Object>} args.employeeChecks - An array of employee check objects.
 * @returns {Promise<Object>} - The result of the bulk employee checks creation.
 */
const executeFunction = async ({ companyID, employeeChecks }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the request body
    const body = JSON.stringify({ companyID, employeeChecks });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(`${apiUrl}/employeeChecks`, {
      method: 'POST',
      headers,
      body,
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
    console.error('Error creating bulk employee checks:', error);
    return {
      error: `An error occurred while creating bulk employee checks: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating bulk employee checks in the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_bulk_employee_checks',
      description: 'Create a batch of employee checks in the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employeeChecks: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                employeeID: {
                  type: 'string',
                  description: 'The ID of the employee.'
                },
                reportingPeriodID: {
                  type: 'string',
                  description: 'The ID of the reporting period.'
                },
                check_date: {
                  type: 'string',
                  format: 'date',
                  description: 'The date of the check.'
                },
                approval_required: {
                  type: 'boolean',
                  description: 'Indicates if approval is required for the check.'
                },
                shifts: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      time: {
                        type: 'string',
                        format: 'date-time',
                        description: 'The time of the shift.'
                      },
                      hourly: {
                        type: 'object',
                        properties: {
                          hours: {
                            type: 'integer',
                            description: 'The number of hours worked.'
                          },
                          wage: {
                            type: 'number',
                            description: 'The hourly wage.'
                          },
                          custom_name: {
                            type: 'string',
                            description: 'A custom name for the shift.'
                          }
                        },
                        required: ['hours', 'wage', 'custom_name']
                      }
                    },
                    required: ['time', 'hourly']
                  }
                }
              },
              required: ['employeeID', 'reportingPeriodID', 'check_date', 'approval_required', 'shifts']
            },
            description: 'An array of employee check objects.'
          }
        },
        required: ['companyID', 'employeeChecks']
      }
    }
  }
};

export { apiTool };