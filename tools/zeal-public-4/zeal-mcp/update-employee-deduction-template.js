/**
 * Function to update an employee deduction template.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.deductionTemplateID - The ID of the deduction template to update.
 * @param {string} args.agency_address - The address of the agency.
 * @param {string} args.agency_name - The name of the agency.
 * @param {string} args.case_id - The case ID.
 * @param {string} args.custom_name - A custom name for the deduction.
 * @param {string} args.effective_start_date - The effective start date of the deduction.
 * @param {string} args.effective_end_date - The effective end date of the deduction.
 * @param {number} args.employee_contribution_amount - The employee contribution amount.
 * @param {number} args.employee_contribution_percentage - The employee contribution percentage.
 * @param {number} args.employer_contribution_amount - The employer contribution amount.
 * @param {number} args.employer_contribution_percentage - The employer contribution percentage.
 * @param {string} args.external_id - An external ID for the deduction.
 * @param {string} args.hsa_type - The type of HSA.
 * @param {string} args.order_number - The order number.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({
  deductionTemplateID,
  agency_address,
  agency_name,
  case_id,
  custom_name,
  effective_start_date,
  effective_end_date,
  employee_contribution_amount,
  employee_contribution_percentage,
  employer_contribution_amount,
  employer_contribution_percentage,
  external_id,
  hsa_type,
  order_number
}) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${apiUrl}/employee-deduction-templates/${deductionTemplateID}`;

    // Prepare the request body
    const body = JSON.stringify({
      agency_address,
      agency_name,
      case_id,
      custom_name,
      effective_start_date,
      effective_end_date,
      employee_contribution_amount,
      employee_contribution_percentage,
      employer_contribution_amount,
      employer_contribution_percentage,
      external_id,
      hsa_type,
      order_number
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

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
    console.error('Error updating employee deduction template:', error);
    return {
      error: `An error occurred while updating the employee deduction template: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating employee deduction templates.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_employee_deduction_template',
      description: 'Update an employee deduction template.',
      parameters: {
        type: 'object',
        properties: {
          deductionTemplateID: {
            type: 'string',
            description: 'The ID of the deduction template to update.'
          },
          agency_address: {
            type: 'string',
            description: 'The address of the agency.'
          },
          agency_name: {
            type: 'string',
            description: 'The name of the agency.'
          },
          case_id: {
            type: 'string',
            description: 'The case ID.'
          },
          custom_name: {
            type: 'string',
            description: 'A custom name for the deduction.'
          },
          effective_start_date: {
            type: 'string',
            description: 'The effective start date of the deduction.'
          },
          effective_end_date: {
            type: 'string',
            description: 'The effective end date of the deduction.'
          },
          employee_contribution_amount: {
            type: 'number',
            description: 'The employee contribution amount.'
          },
          employee_contribution_percentage: {
            type: 'number',
            description: 'The employee contribution percentage.'
          },
          employer_contribution_amount: {
            type: 'number',
            description: 'The employer contribution amount.'
          },
          employer_contribution_percentage: {
            type: 'number',
            description: 'The employer contribution percentage.'
          },
          external_id: {
            type: 'string',
            description: 'An external ID for the deduction.'
          },
          hsa_type: {
            type: 'string',
            description: 'The type of HSA.'
          },
          order_number: {
            type: 'string',
            description: 'The order number.'
          }
        },
        required: ['deductionTemplateID']
      }
    }
  }
};

export { apiTool };