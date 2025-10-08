/**
 * Function to retrieve an employee's tax withholding parameters.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.employeeID - The ID of the employee.
 * @param {string} args.companyID - The ID of the company.
 * @param {Array<string>} [args.jurisdictions=["CA", "US"]] - The jurisdictions for tax withholding.
 * @param {string} [args.effectiveDate="1948-04-04"] - The effective date for the tax parameters.
 * @returns {Promise<Object>} - The result of the tax parameter summary retrieval.
 */
const executeFunction = async ({ employeeID, companyID, jurisdictions = ["CA", "US"], effectiveDate = "1948-04-04" }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    const url = `${apiUrl}/employees/getTaxParameterSummary`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const body = JSON.stringify({
      employeeID,
      companyID,
      jurisdictions,
      effectiveDate
    });

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving employee tax parameter summary:', error);
    return {
      error: `An error occurred while retrieving employee tax parameter summary: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving employee tax parameter summary.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_employee_tax_parameter_summary',
      description: 'Retrieve a list of an employee\'s tax withholding parameters.',
      parameters: {
        type: 'object',
        properties: {
          employeeID: {
            type: 'string',
            description: 'The ID of the employee.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          jurisdictions: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The jurisdictions for tax withholding.'
          },
          effectiveDate: {
            type: 'string',
            description: 'The effective date for the tax parameters.'
          }
        },
        required: ['employeeID', 'companyID']
      }
    }
  }
};

export { apiTool };