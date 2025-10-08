/**
 * Function to update a work location in Zeal.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.workLocationID - The ID of the work location to update.
 * @param {string} args.name - The name of the work location.
 * @param {string} args.work_site_id - The work site ID.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ companyID, workLocationID, name, work_site_id }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL for the PATCH request
    const url = `${apiUrl}/workLocations`;

    // Set up the request body
    const body = JSON.stringify({
      companyID,
      workLocationID,
      name,
      work_site_id
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
    console.error('Error updating work location:', error);
    return {
      error: `An error occurred while updating the work location: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a work location in Zeal.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_work_location',
      description: 'Update a work location in Zeal.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          workLocationID: {
            type: 'string',
            description: 'The ID of the work location to update.'
          },
          name: {
            type: 'string',
            description: 'The name of the work location.'
          },
          work_site_id: {
            type: 'string',
            description: 'The work site ID.'
          }
        },
        required: ['companyID', 'workLocationID', 'name', 'work_site_id']
      }
    }
  }
};

export { apiTool };