/**
 * Function to update employee information in the Zeal API.
 *
 * @param {Object} args - Arguments for the employee update.
 * @param {string} args.employeeID - The ID of the employee to update.
 * @param {string} args.companyID - The ID of the company the employee belongs to.
 * @param {boolean} [args.onboarded=true] - Indicates if the employee is onboarded.
 * @param {string} [args.employment_status="live"] - The employment status of the employee.
 * @param {string} [args.first_name] - The first name of the employee.
 * @param {string} [args.last_name] - The last name of the employee.
 * @param {string} [args.email] - The email address of the employee.
 * @param {string} [args.dob] - The date of birth of the employee.
 * @param {string} [args.start_date] - The start date of employment.
 * @param {string} [args.title] - The job title of the employee.
 * @param {string} [args.working_state] - The state where the employee works.
 * @param {string} [args.workLocationID] - The ID of the work location.
 * @param {string} [args.address] - The address of the employee.
 * @param {string} [args.city] - The city where the employee resides.
 * @param {string} [args.state] - The state where the employee resides.
 * @param {string} [args.zip] - The zip code of the employee's address.
 * @param {string} [args.phone_number] - The phone number of the employee.
 * @param {string} [args.default_pay_schedule] - The default pay schedule for the employee.
 * @param {number} [args.default_wage] - The default wage for the employee.
 * @param {number} [args.default_ot_wage] - The default overtime wage for the employee.
 * @param {number} [args.default_dt_wage] - The default double time wage for the employee.
 * @param {string} [args.ssn] - The social security number of the employee.
 * @param {boolean} [args.is_943=true] - Indicates if the employee is 943.
 * @param {boolean} [args.is_scheduleH=false] - Indicates if the employee is schedule H.
 * @param {boolean} [args.is_salary=true] - Indicates if the employee is salaried.
 * @param {number} [args.salary] - The salary of the employee.
 * @param {string} [args.external_id] - An external ID associated with the employee.
 * @returns {Promise<Object>} - The result of the employee update.
 */
const executeFunction = async ({
  employeeID,
  companyID,
  onboarded = true,
  employment_status = "live",
  first_name,
  last_name,
  email,
  dob,
  start_date,
  title,
  working_state,
  workLocationID,
  address,
  city,
  state,
  zip,
  phone_number,
  default_pay_schedule,
  default_wage,
  default_ot_wage,
  default_dt_wage,
  ssn,
  is_943 = true,
  is_scheduleH = false,
  is_salary = true,
  salary,
  external_id
}) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  const payload = {
    employeeID,
    companyID,
    onboarded,
    employment_status,
    first_name,
    last_name,
    email,
    dob,
    start_date,
    title,
    working_state,
    workLocationID,
    address,
    city,
    state,
    zip,
    phone_number,
    default_pay_schedule,
    default_wage,
    default_ot_wage,
    default_dt_wage,
    ssn,
    is_943,
    is_scheduleH,
    is_salary,
    salary,
    external_id
  };

  try {
    const response = await fetch(`${apiUrl}/employees`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating employee information:', error);
    return {
      error: `An error occurred while updating employee information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating employee information in the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_employee_info',
      description: 'Update a specific employee record in the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          employeeID: {
            type: 'string',
            description: 'The ID of the employee to update.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company the employee belongs to.'
          },
          onboarded: {
            type: 'boolean',
            description: 'Indicates if the employee is onboarded.'
          },
          employment_status: {
            type: 'string',
            description: 'The employment status of the employee.'
          },
          first_name: {
            type: 'string',
            description: 'The first name of the employee.'
          },
          last_name: {
            type: 'string',
            description: 'The last name of the employee.'
          },
          email: {
            type: 'string',
            description: 'The email address of the employee.'
          },
          dob: {
            type: 'string',
            description: 'The date of birth of the employee.'
          },
          start_date: {
            type: 'string',
            description: 'The start date of employment.'
          },
          title: {
            type: 'string',
            description: 'The job title of the employee.'
          },
          working_state: {
            type: 'string',
            description: 'The state where the employee works.'
          },
          workLocationID: {
            type: 'string',
            description: 'The ID of the work location.'
          },
          address: {
            type: 'string',
            description: 'The address of the employee.'
          },
          city: {
            type: 'string',
            description: 'The city where the employee resides.'
          },
          state: {
            type: 'string',
            description: 'The state where the employee resides.'
          },
          zip: {
            type: 'string',
            description: 'The zip code of the employee\'s address.'
          },
          phone_number: {
            type: 'string',
            description: 'The phone number of the employee.'
          },
          default_pay_schedule: {
            type: 'string',
            description: 'The default pay schedule for the employee.'
          },
          default_wage: {
            type: 'number',
            description: 'The default wage for the employee.'
          },
          default_ot_wage: {
            type: 'number',
            description: 'The default overtime wage for the employee.'
          },
          default_dt_wage: {
            type: 'number',
            description: 'The default double time wage for the employee.'
          },
          ssn: {
            type: 'string',
            description: 'The social security number of the employee.'
          },
          is_943: {
            type: 'boolean',
            description: 'Indicates if the employee is 943.'
          },
          is_scheduleH: {
            type: 'boolean',
            description: 'Indicates if the employee is schedule H.'
          },
          is_salary: {
            type: 'boolean',
            description: 'Indicates if the employee is salaried.'
          },
          salary: {
            type: 'number',
            description: 'The salary of the employee.'
          },
          external_id: {
            type: 'string',
            description: 'An external ID associated with the employee.'
          }
        },
        required: ['employeeID', 'companyID']
      }
    }
  }
};

export { apiTool };