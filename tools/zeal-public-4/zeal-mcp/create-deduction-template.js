/**
 * Function to create a deduction template in Zeal MCP.
 *
 * @param {Object} args - Arguments for creating the deduction template.
 * @param {string} args.companyID - The ID of the company for which the deduction template is created.
 * @param {string} [args.deduction_type="401k"] - The type of deduction.
 * @param {string} [args.custom_name="Zeal Testing 401k"] - The custom name for the deduction.
 * @param {Object} args.employee_contribution - The employee contribution details.
 * @param {string} args.employee_contribution.contribution_type - The type of employee contribution (e.g., dollars).
 * @param {number} args.employee_contribution.value - The value of the employee contribution.
 * @param {string} args.employee_contribution.override_type - The override type for the employee contribution.
 * @param {Object} args.employer_contribution - The employer contribution details.
 * @param {string} args.employer_contribution.contribution_type - The type of employer contribution (e.g., dollars).
 * @param {boolean} args.employer_contribution.matching - Whether the employer contribution is matching.
 * @param {number} args.employer_contribution.value - The value of the employer contribution.
 * @param {string} args.employer_contribution.override_type - The override type for the employer contribution.
 * @returns {Promise<Object>} - The result of the deduction template creation.
 */
const executeFunction = async ({ companyID, deduction_type = "401k", custom_name = "Zeal Testing 401k", employee_contribution, employer_contribution }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the request body
    const body = JSON.stringify({
      companyID,
      deduction_type,
      custom_name,
      employee_contribution,
      employer_contribution
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
    const response = await fetch(`${apiUrl}/deductionTemplate`, {
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
    console.error('Error creating deduction template:', error);
    return {
      error: `An error occurred while creating the deduction template: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a deduction template in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_deduction_template',
      description: 'Create a deduction template in Zeal MCP.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the deduction template is created.'
          },
          deduction_type: {
            type: 'string',
            description: 'The type of deduction.'
          },
          custom_name: {
            type: 'string',
            description: 'The custom name for the deduction.'
          },
          employee_contribution: {
            type: 'object',
            description: 'The employee contribution details.',
            properties: {
              contribution_type: {
                type: 'string',
                description: 'The type of employee contribution (e.g., dollars).'
              },
              value: {
                type: 'number',
                description: 'The value of the employee contribution.'
              },
              override_type: {
                type: 'string',
                description: 'The override type for the employee contribution.'
              }
            },
            required: ['contribution_type', 'value', 'override_type']
          },
          employer_contribution: {
            type: 'object',
            description: 'The employer contribution details.',
            properties: {
              contribution_type: {
                type: 'string',
                description: 'The type of employer contribution (e.g., dollars).'
              },
              matching: {
                type: 'boolean',
                description: 'Whether the employer contribution is matching.'
              },
              value: {
                type: 'number',
                description: 'The value of the employer contribution.'
              },
              override_type: {
                type: 'string',
                description: 'The override type for the employer contribution.'
              }
            },
            required: ['contribution_type', 'value', 'override_type']
          }
        },
        required: ['companyID', 'employee_contribution', 'employer_contribution']
      }
    }
  }
};

export { apiTool };