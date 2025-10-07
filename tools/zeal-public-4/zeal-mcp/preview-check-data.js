/****
 * Function to preview check data in Zeal MCP.
 *
 * @param {Object} args - Arguments for the check data preview.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeID - The ID of the employee.
 * @param {string} args.reportingPeriodID - The ID of the reporting period.
 * @param {string} args.check_date - The date of the check.
 * @param {Array} args.shifts - An array of shift objects containing time, hours, and amount.
 * @param {Array} args.deductions - An array of deduction objects with deductionTemplateID, employee_contribution, and employer_contribution.
 * @returns {Promise<Object>} - The result of the check data preview.
 */
const executeFunction = async ({ companyID, employeeID, reportingPeriodID, check_date, shifts, deductions }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const body = {
    companyID,
    employeeID,
    reportingPeriodID,
    check_date,
    shifts,
    deductions
  };

  try {
    const response = await fetch(`${apiUrl}/preview/checkData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error previewing check data:', error);
    return {
      error: `An error occurred while previewing check data: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for previewing check data in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'preview_check_data',
      description: 'Preview check data in Zeal MCP.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
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
            description: 'The date of the check.'
          },
          shifts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                time: {
                  type: 'string',
                  description: 'The time of the shift.'
                },
                flat: {
                  type: 'object',
                  properties: {
                    hours: {
                      type: 'integer',
                      description: 'The number of hours worked.'
                    },
                    amount: {
                      type: 'number',
                      description: 'The amount earned for the shift.'
                    }
                  },
                  required: ['hours', 'amount']
                }
              },
              required: ['time', 'flat']
            },
            description: 'An array of shift objects.'
          },
          deductions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                deductionTemplateID: {
                  type: 'string',
                  description: 'The ID of the deduction template.'
                },
                employee_contribution: {
                  type: 'object',
                  properties: {
                    value: {
                      type: 'number',
                      description: 'The value of the employee contribution.'
                    },
                    contribution_type: {
                      type: 'string',
                      description: 'The type of contribution (e.g., dollars).'
                    }
                  },
                  required: ['value', 'contribution_type']
                },
                employer_contribution: {
                  type: 'object',
                  properties: {
                    override_type: {
                      type: 'string',
                      description: 'The type of override for the employer contribution.'
                    },
                    value: {
                      type: 'number',
                      description: 'The value of the employer contribution.'
                    }
                  },
                  required: ['value']
                }
              },
              required: ['deductionTemplateID', 'employee_contribution', 'employer_contribution']
            },
            description: 'An array of deduction objects.'
          }
        },
        required: ['companyID', 'employeeID', 'reportingPeriodID', 'check_date', 'shifts', 'deductions']
      }
    }
  }
};

export { apiTool };