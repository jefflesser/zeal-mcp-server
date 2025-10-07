/**
 * Function to generate an employee onboarding link in Zeal.
 *
 * @param {Object} args - Arguments for the onboarding link generation.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeID - The ID of the employee.
 * @param {boolean} [args.profile=false] - Whether to include the profile in the onboarding link.
 * @param {boolean} [args.employee_acct=false] - Whether to include employee account information.
 * @param {boolean} [args.i9_form=false] - Whether to include I-9 form information.
 * @param {boolean} [args.id_scan=false] - Whether to include ID scan information.
 * @param {boolean} [args.payment_method=true] - Whether to include payment method information.
 * @returns {Promise<Object>} - The result of the onboarding link generation.
 */
const executeFunction = async ({ companyID, employeeID, profile = false, employee_acct = false, i9_form = false, id_scan = false, payment_method = true }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the request body
    const body = JSON.stringify({
      profile,
      employee_acct,
      i9_form,
      id_scan,
      companyID,
      employeeID,
      payment_method
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${apiUrl}/employees/onboard`, {
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
    console.error('Error generating onboarding link:', error);
    return {
      error: `An error occurred while generating the onboarding link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for generating employee onboarding links in Zeal.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_employee_onboarding_link',
      description: 'Generates an expirable link to Zeal\'s employee payroll onboarding for a specified employee.',
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
          profile: {
            type: 'boolean',
            description: 'Whether to include the profile in the onboarding link.'
          },
          employee_acct: {
            type: 'boolean',
            description: 'Whether to include employee account information.'
          },
          i9_form: {
            type: 'boolean',
            description: 'Whether to include I-9 form information.'
          },
          id_scan: {
            type: 'boolean',
            description: 'Whether to include ID scan information.'
          },
          payment_method: {
            type: 'boolean',
            description: 'Whether to include payment method information.'
          }
        },
        required: ['companyID', 'employeeID']
      }
    }
  }
};

export { apiTool };