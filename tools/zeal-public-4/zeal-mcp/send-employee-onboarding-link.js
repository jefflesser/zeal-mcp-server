/**
 * Function to send an employee onboarding link.
 *
 * @param {Object} args - Arguments for sending the onboarding link.
 * @param {string} args.companyID - The ID of the company.
 * @param {Array<Object>} args.employees - An array of employee objects to send onboarding links to.
 * @param {boolean} args.employees[].profile - Indicates if the employee profile is included.
 * @param {boolean} args.employees[].employee_acct - Indicates if the employee account is included.
 * @param {boolean} args.employees[].i9_form - Indicates if the I-9 form is included.
 * @param {boolean} args.employees[].id_scan - Indicates if the ID scan is included.
 * @param {boolean} args.employees[].paperwork - Indicates if the paperwork is included.
 * @param {string} args.employees[].employeeID - The ID of the employee.
 * @returns {Promise<Object>} - The result of the onboarding link request.
 */
const executeFunction = async ({ companyID, employees }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the request body
    const body = JSON.stringify({ companyID, employees });

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
    const response = await fetch(`${apiUrl}/sendLink`, {
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
    console.error('Error sending employee onboarding link:', error);
    return {
      error: `An error occurred while sending the onboarding link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for sending employee onboarding links.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_employee_onboarding_link',
      description: 'Send an employee onboarding link to the specified employee\'s email.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employees: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                profile: {
                  type: 'boolean',
                  description: 'Indicates if the employee profile is included.'
                },
                employee_acct: {
                  type: 'boolean',
                  description: 'Indicates if the employee account is included.'
                },
                i9_form: {
                  type: 'boolean',
                  description: 'Indicates if the I-9 form is included.'
                },
                id_scan: {
                  type: 'boolean',
                  description: 'Indicates if the ID scan is included.'
                },
                paperwork: {
                  type: 'boolean',
                  description: 'Indicates if the paperwork is included.'
                },
                employeeID: {
                  type: 'string',
                  description: 'The ID of the employee.'
                }
              },
              required: ['employeeID']
            },
            description: 'An array of employee objects to send onboarding links to.'
          }
        },
        required: ['companyID', 'employees']
      }
    }
  }
};

export { apiTool };