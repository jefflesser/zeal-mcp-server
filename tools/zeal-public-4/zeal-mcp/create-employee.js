/**
 * Function to create a new employee in the Zeal system.
 *
 * @param {Object} args - The employee data to be created.
 * @param {string} args.employeeID - The unique identifier for the employee.
 * @param {string} args.companyID - The ID of the company the employee belongs to.
 * @param {boolean} [args.onboarded=true] - Indicates if the employee is onboarded.
 * @param {string} [args.employment_status="live"] - The employment status of the employee.
 * @param {string} [args.first_name] - The first name of the employee.
 * @param {string} [args.last_name] - The last name of the employee.
 * @param {string} [args.email] - The email address of the employee.
 * @param {string} [args.dob] - The date of birth of the employee.
 * @param {string} [args.start_date] - The start date of the employee.
 * @param {string} [args.title] - The job title of the employee.
 * @param {string} [args.working_state] - The state where the employee works.
 * @param {string} [args.workLocationID] - The ID of the work location.
 * @param {string} [args.address] - The address of the employee.
 * @param {string} [args.city] - The city of the employee.
 * @param {string} [args.state] - The state of the employee.
 * @param {string} [args.zip] - The zip code of the employee.
 * @param {string} [args.phone_number] - The phone number of the employee.
 * @param {number} [args.default_wage] - The default wage of the employee.
 * @param {number} [args.salary] - The salary of the employee.
 * @returns {Promise<Object>} - The result of the employee creation.
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
  default_wage,
  salary
}) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  const employeeData = {
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
    default_wage,
    salary
  };

  try {
    const response = await fetch(`${apiUrl}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(employeeData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating employee:', error);
    return {
      error: `An error occurred while creating the employee: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating an employee in the Zeal system.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_employee',
      description: 'Create a new employee in the Zeal system.',
      parameters: {
        type: 'object',
        properties: {
          employeeID: {
            type: 'string',
            description: 'The unique identifier for the employee.'
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
            description: 'The start date of the employee.'
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
            description: 'The city of the employee.'
          },
          state: {
            type: 'string',
            description: 'The state of the employee.'
          },
          zip: {
            type: 'string',
            description: 'The zip code of the employee.'
          },
          phone_number: {
            type: 'string',
            description: 'The phone number of the employee.'
          },
          default_wage: {
            type: 'number',
            description: 'The default wage of the employee.'
          },
          salary: {
            type: 'number',
            description: 'The salary of the employee.'
          }
        },
        required: ['employeeID', 'companyID', 'first_name', 'last_name']
      }
    }
  }
};

export { apiTool };