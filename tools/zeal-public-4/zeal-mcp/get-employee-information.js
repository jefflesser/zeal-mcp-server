/**
 * Function to get employee information from Zeal API.
 *
 * @param {Object} args - Arguments for the employee information request.
 * @param {string} args.companyID - (Required) Company ID of employer.
 * @param {boolean} [args.onboarded=true] - Filter by Employee onboarded status.
 * @param {string} [args.employment_status] - Filter by Employee employment status.
 * @param {string} [args.title] - Filter by Employee title.
 * @param {string} [args.dob] - Filter by Employee date of birth.
 * @param {string} [args.start_date] - Filter by Employee start date.
 * @param {string} [args.email] - Filter by Employee email.
 * @param {string} [args.phone_number] - Filter by Employee phone number.
 * @param {string} [args.default_pay_schedule] - Filter by Employee default pay schedule.
 * @param {boolean} [args.is_943=true] - Filter by whether Employee is 943 status.
 * @param {boolean} [args.is_scheduleH=true] - Filter by whether Employee is scheduleH status.
 * @param {string} [args.external_id] - Filter by Employee external ID.
 * @param {string} [args.workLocationID] - Filter by Employee work location ID.
 * @returns {Promise<Object>} - The result of the employee information request.
 */
const executeFunction = async ({
  companyID,
  onboarded = true,
  employment_status,
  title,
  dob,
  start_date,
  email,
  phone_number,
  default_pay_schedule,
  is_943 = true,
  is_scheduleH = true,
  external_id,
  workLocationID
}) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/employees`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('onboarded', onboarded.toString());
    if (employment_status) url.searchParams.append('employment_status', employment_status);
    if (title) url.searchParams.append('title', title);
    if (dob) url.searchParams.append('dob', dob);
    if (start_date) url.searchParams.append('start_date', start_date);
    if (email) url.searchParams.append('email', email);
    if (phone_number) url.searchParams.append('phone_number', phone_number);
    if (default_pay_schedule) url.searchParams.append('default_pay_schedule', default_pay_schedule);
    url.searchParams.append('is_943', is_943.toString());
    url.searchParams.append('is_scheduleH', is_scheduleH.toString());
    if (external_id) url.searchParams.append('external_id', external_id);
    if (workLocationID) url.searchParams.append('workLocationID', workLocationID);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

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
    console.error('Error getting employee information:', error);
    return {
      error: `An error occurred while getting employee information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting employee information from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_employee_information',
      description: 'Get information for all employees under a company.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: '(Required) Company ID of employer.'
          },
          onboarded: {
            type: 'boolean',
            description: 'Filter by Employee onboarded status.'
          },
          employment_status: {
            type: 'string',
            description: 'Filter by Employee employment status.'
          },
          title: {
            type: 'string',
            description: 'Filter by Employee title.'
          },
          dob: {
            type: 'string',
            description: 'Filter by Employee date of birth.'
          },
          start_date: {
            type: 'string',
            description: 'Filter by Employee start date.'
          },
          email: {
            type: 'string',
            description: 'Filter by Employee email.'
          },
          phone_number: {
            type: 'string',
            description: 'Filter by Employee phone number.'
          },
          default_pay_schedule: {
            type: 'string',
            description: 'Filter by Employee default pay schedule.'
          },
          is_943: {
            type: 'boolean',
            description: 'Filter by whether Employee is 943 status.'
          },
          is_scheduleH: {
            type: 'boolean',
            description: 'Filter by whether Employee is scheduleH status.'
          },
          external_id: {
            type: 'string',
            description: 'Filter by Employee external ID.'
          },
          workLocationID: {
            type: 'string',
            description: 'Filter by Employee work location ID.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };