/**
 * Function to create an employee deduction template.
 *
 * @param {Object} args - Arguments for creating the employee deduction template.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeID - The ID of the employee.
 * @param {string} args.custom_name - The custom name for the deduction.
 * @param {string} args.deduction_type - The type of deduction (e.g., 401k).
 * @param {string} args.effective_start_date - The start date for the deduction.
 * @param {string} args.agency_address - The address of the agency.
 * @param {string} args.agency_name - The name of the agency.
 * @param {string} args.case_id - The case ID associated with the deduction.
 * @param {string} args.effective_end_date - The end date for the deduction.
 * @param {number} args.employee_contribution_amount - The amount contributed by the employee.
 * @param {number} args.employee_contribution_percentage - The percentage contributed by the employee.
 * @param {number} args.employer_contribution_amount - The amount contributed by the employer.
 * @param {number} args.employer_contribution_percentage - The percentage contributed by the employer.
 * @param {string} args.external_id - An external identifier for the deduction.
 * @param {string} args.hsa_type - The type of HSA (Health Savings Account).
 * @param {string} args.order_number - The order number for the deduction.
 * @returns {Promise<Object>} - The result of the creation operation.
 */
const executeFunction = async ({
  companyID,
  employeeID,
  custom_name,
  deduction_type,
  effective_start_date,
  agency_address,
  agency_name,
  case_id,
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
  const token = process.env.ZEAL_API_KEY;

  const requestBody = {
    companyID,
    employeeID,
    custom_name,
    deduction_type,
    effective_start_date,
    agency_address,
    agency_name,
    case_id,
    effective_end_date,
    employee_contribution_amount,
    employee_contribution_percentage,
    employer_contribution_amount,
    employer_contribution_percentage,
    external_id,
    hsa_type,
    order_number
  };

  try {
    // Perform the fetch request
    const response = await fetch(`${apiUrl}/employee-deduction-templates`, {
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
    console.error('Error creating employee deduction template:', error);
    return {
      error: `An error occurred while creating the employee deduction template: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating an employee deduction template.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_employee_deduction_template',
      description: 'Create an employee deduction template.',
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
          custom_name: {
            type: 'string',
            description: 'The custom name for the deduction.'
          },
          deduction_type: {
            type: 'string',
            description: 'The type of deduction (e.g., 401k).'
          },
          effective_start_date: {
            type: 'string',
            description: 'The start date for the deduction.'
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
            description: 'The case ID associated with the deduction.'
          },
          effective_end_date: {
            type: 'string',
            description: 'The end date for the deduction.'
          },
          employee_contribution_amount: {
            type: 'number',
            description: 'The amount contributed by the employee.'
          },
          employee_contribution_percentage: {
            type: 'number',
            description: 'The percentage contributed by the employee.'
          },
          employer_contribution_amount: {
            type: 'number',
            description: 'The amount contributed by the employer.'
          },
          employer_contribution_percentage: {
            type: 'number',
            description: 'The percentage contributed by the employer.'
          },
          external_id: {
            type: 'string',
            description: 'An external identifier for the deduction.'
          },
          hsa_type: {
            type: 'string',
            description: 'The type of HSA (Health Savings Account).'
          },
          order_number: {
            type: 'string',
            description: 'The order number for the deduction.'
          }
        },
        required: ['companyID', 'employeeID', 'custom_name', 'deduction_type', 'effective_start_date', 'agency_address', 'agency_name', 'case_id', 'effective_end_date', 'employee_contribution_amount', 'employee_contribution_percentage', 'employer_contribution_amount', 'employer_contribution_percentage', 'external_id', 'hsa_type', 'order_number']
      }
    }
  }
};

export { apiTool };