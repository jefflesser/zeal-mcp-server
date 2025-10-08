/**
 * Function to create a work location for a company within Zeal.
 *
 * @param {Object} args - Arguments for creating a work location.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.taxableLocationID - The ID of the taxable location.
 * @param {string} args.name - The name of the work location.
 * @param {string} args.zip - The zip code of the work location.
 * @param {string} args.work_site_id - The work site ID.
 * @returns {Promise<Object>} - The result of the work location creation.
 */
const executeFunction = async ({ companyID, taxableLocationID, name, zip, work_site_id }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL for the API request
    const url = `${apiUrl}/workLocations`;

    // Prepare the request body
    const body = JSON.stringify({
      companyID,
      taxableLocationID,
      name,
      zip,
      work_site_id
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error creating work location:', error);
    return {
      error: `An error occurred while creating the work location: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a work location within Zeal.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_work_location',
      description: 'Create a work location for a company within Zeal.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          taxableLocationID: {
            type: 'string',
            description: 'The ID of the taxable location.'
          },
          name: {
            type: 'string',
            description: 'The name of the work location.'
          },
          zip: {
            type: 'string',
            description: 'The zip code of the work location.'
          },
          work_site_id: {
            type: 'string',
            description: 'The work site ID.'
          }
        },
        required: ['companyID', 'taxableLocationID', 'name', 'zip', 'work_site_id']
      }
    }
  }
};

export { apiTool };