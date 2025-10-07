/**
 * Function to list employee deduction templates from Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeID - The ID of the employee.
 * @param {string} [args.limit="25"] - The number of deduction templates returned per page.
 * @param {string} [args.start_at] - The deductionTemplateID to start the paginated results on.
 * @param {string} [args.agency_address="123 Goverment ST, Washington D.C., 20001"] - The agency address.
 * @param {string} [args.agency_name="Child Support Agency of State"] - The agency name.
 * @param {string} [args.case_id="ID12345"] - The case ID.
 * @param {string} [args.custom_name="Jon Doe's 401K"] - The custom name for the deduction.
 * @param {string} [args.deduction_type="401k"] - The type of deduction.
 * @param {string} [args.effective_start_date="2024-01-01"] - The effective start date.
 * @param {string} [args.effective_end_date="2025-01-01"] - The effective end date.
 * @param {number} [args.employee_contribution_amount=73] - The employee contribution amount.
 * @param {number} [args.employee_contribution_percentage=25] - The employee contribution percentage.
 * @param {number} [args.employer_contribution_amount=250] - The employer contribution amount.
 * @param {number} [args.employer_contribution_percentage=10] - The employer contribution percentage.
 * @param {string} [args.external_id="temp_123"] - The external ID.
 * @param {string} [args.hsa_type="family"] - The HSA contribution type.
 * @param {string} [args.order_number="OR05"] - The order number.
 * @returns {Promise<Object>} - The response data containing the list of deduction templates.
 */
const executeFunction = async ({
  companyID,
  employeeID,
  limit = '25',
  start_at,
  agency_address = '123 Goverment ST, Washington D.C., 20001',
  agency_name = 'Child Support Agency of State',
  case_id = 'ID12345',
  custom_name = "Jon Doe's 401K",
  deduction_type = '401k',
  effective_start_date = '2024-01-01',
  effective_end_date = '2025-01-01',
  employee_contribution_amount = 73,
  employee_contribution_percentage = 25,
  employer_contribution_amount = 250,
  employer_contribution_percentage = 10,
  external_id = 'temp_123',
  hsa_type = 'family',
  order_number = 'OR05'
}) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/employee-deduction-templates`);
    url.searchParams.append('limit', limit);
    if (start_at) url.searchParams.append('start_at', start_at);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('employeeID', employeeID);
    url.searchParams.append('agency_address', agency_address);
    url.searchParams.append('agency_name', agency_name);
    url.searchParams.append('case_id', case_id);
    url.searchParams.append('custom_name', custom_name);
    url.searchParams.append('deduction_type', deduction_type);
    url.searchParams.append('effective_start_date', effective_start_date);
    url.searchParams.append('effective_end_date', effective_end_date);
    url.searchParams.append('employee_contribution_amount', employee_contribution_amount);
    url.searchParams.append('employee_contribution_percentage', employee_contribution_percentage);
    url.searchParams.append('employer_contribution_amount', employer_contribution_amount);
    url.searchParams.append('employer_contribution_percentage', employer_contribution_percentage);
    url.searchParams.append('external_id', external_id);
    url.searchParams.append('hsa_type', hsa_type);
    url.searchParams.append('order_number', order_number);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
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
    console.error('Error listing employee deduction templates:', error);
    return {
      error: `An error occurred while listing employee deduction templates: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing employee deduction templates from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_employee_deduction_templates',
      description: 'List employee deduction templates from Zeal API.',
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
          limit: {
            type: 'string',
            description: 'The number of deduction templates returned per page.'
          },
          start_at: {
            type: 'string',
            description: 'The deductionTemplateID to start the paginated results on.'
          },
          agency_address: {
            type: 'string',
            description: 'The agency address.'
          },
          agency_name: {
            type: 'string',
            description: 'The agency name.'
          },
          case_id: {
            type: 'string',
            description: 'The case ID.'
          },
          custom_name: {
            type: 'string',
            description: 'The custom name for the deduction.'
          },
          deduction_type: {
            type: 'string',
            description: 'The type of deduction.'
          },
          effective_start_date: {
            type: 'string',
            description: 'The effective start date.'
          },
          effective_end_date: {
            type: 'string',
            description: 'The effective end date.'
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
            description: 'The external ID.'
          },
          hsa_type: {
            type: 'string',
            description: 'The HSA contribution type.'
          },
          order_number: {
            type: 'string',
            description: 'The order number.'
          }
        },
        required: ['companyID', 'employeeID']
      }
    }
  }
};

export { apiTool };