/**
 * Function to get employees under a specific company.
 *
 * @param {Object} args - Arguments for the employee retrieval.
 * @param {string} args.companyID - The company ID of the employer (required).
 * @param {string} [args.onboarded] - Filter by employee onboarded status.
 * @param {string} [args.employment_status] - Filter by employee employment status.
 * @param {string} [args.title] - Filter by employee title.
 * @param {string} [args.dob] - Filter by employee date of birth.
 * @param {string} [args.start_date] - Filter by employee start date.
 * @param {string} [args.email] - Filter by employee email.
 * @param {string} [args.phone_number] - Filter by employee phone number.
 * @param {string} [args.default_pay_schedule] - Filter by employee default pay schedule.
 * @param {string} [args.is_943] - Filter by whether employee is 943 status.
 * @param {string} [args.is_scheduleH] - Filter by whether employee is scheduleH status.
 * @param {string} [args.external_id] - Filter by employee external ID.
 * @param {string} [args.workLocationID] - Filter by employee work location ID.
 * @returns {Promise<Object>} - The result of the employee retrieval.
 */
const executeFunction = async ({ companyID, onboarded, employment_status, title, dob, start_date, email, phone_number, default_pay_schedule, is_943, is_scheduleH, external_id, workLocationID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/employees`);
    url.searchParams.append('companyID', companyID);
    if (onboarded) url.searchParams.append('onboarded', onboarded);
    if (employment_status) url.searchParams.append('employment_status', employment_status);
    if (title) url.searchParams.append('title', title);
    if (dob) url.searchParams.append('dob', dob);
    if (start_date) url.searchParams.append('start_date', start_date);
    if (email) url.searchParams.append('email', email);
    if (phone_number) url.searchParams.append('phone_number', phone_number);
    if (default_pay_schedule) url.searchParams.append('default_pay_schedule', default_pay_schedule);
    if (is_943) url.searchParams.append('is_943', is_943);
    if (is_scheduleH) url.searchParams.append('is_scheduleH', is_scheduleH);
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
    console.error('Error retrieving employees:', error);
    return {
      error: `An error occurred while retrieving employees: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting employees under a specific company.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_employees',
      description: 'Get employees under a specific company.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the employer.'
          },
          onboarded: {
            type: 'string',
            description: 'Filter by employee onboarded status.'
          },
          employment_status: {
            type: 'string',
            description: 'Filter by employee employment status.'
          },
          title: {
            type: 'string',
            description: 'Filter by employee title.'
          },
          dob: {
            type: 'string',
            description: 'Filter by employee date of birth.'
          },
          start_date: {
            type: 'string',
            description: 'Filter by employee start date.'
          },
          email: {
            type: 'string',
            description: 'Filter by employee email.'
          },
          phone_number: {
            type: 'string',
            description: 'Filter by employee phone number.'
          },
          default_pay_schedule: {
            type: 'string',
            description: 'Filter by employee default pay schedule.'
          },
          is_943: {
            type: 'string',
            description: 'Filter by whether employee is 943 status.'
          },
          is_scheduleH: {
            type: 'string',
            description: 'Filter by whether employee is scheduleH status.'
          },
          external_id: {
            type: 'string',
            description: 'Filter by employee external ID.'
          },
          workLocationID: {
            type: 'string',
            description: 'Filter by employee work location ID.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };