/**
 * Function to fetch work locations by company and specific parameters.
 *
 * @param {Object} args - Arguments for fetching work locations.
 * @param {string} args.companyID - (Required) Company ID of the employer.
 * @param {string} [args.workLocationID] - Work Location ID of the object you're querying.
 * @param {string} [args.taxableLocationID] - Taxable Location ID of the object(s) you are querying.
 * @param {string} [args.state] - The array of US States (2 letter abbreviation) applicable to the objects that you are querying.
 * @param {string} [args.work_site_id] - ID assigned to the Work Location.
 * @returns {Promise<Object>} - The result of the work locations fetch.
 */
const executeFunction = async ({ companyID, workLocationID, taxableLocationID, state = '', work_site_id = '' }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/workLocations`);
    url.searchParams.append('companyID', companyID);
    if (workLocationID) url.searchParams.append('workLocationID', workLocationID);
    if (taxableLocationID) url.searchParams.append('taxableLocationID', taxableLocationID);
    if (state) url.searchParams.append('state', state);
    if (work_site_id) url.searchParams.append('work_site_id', work_site_id);

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
    console.error('Error fetching work locations:', error);
    return {
      error: `An error occurred while fetching work locations: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for fetching work locations.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_work_locations',
      description: 'Fetch work locations by company and specific parameters.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: '(Required) Company ID of the employer.'
          },
          workLocationID: {
            type: 'string',
            description: 'Work Location ID of the object you\'re querying.'
          },
          taxableLocationID: {
            type: 'string',
            description: 'Taxable Location ID of the object(s) you are querying.'
          },
          state: {
            type: 'string',
            description: 'The array of US States (2 letter abbreviation) applicable to the objects that you are querying.'
          },
          work_site_id: {
            type: 'string',
            description: 'ID assigned to the Work Location.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };