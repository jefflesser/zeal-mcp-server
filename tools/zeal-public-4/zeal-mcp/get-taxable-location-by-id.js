/**
 * Function to get a taxable location by its ID.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.taxableLocationID - The ID of the existing Taxable Location Object.
 * @returns {Promise<Object>} - The result of the request to get the taxable location.
 */
const executeFunction = async ({ taxableLocationID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/taxableLocations`);
    url.searchParams.append('taxableLocationID', taxableLocationID);

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
    console.error('Error getting taxable location:', error);
    return {
      error: `An error occurred while getting the taxable location: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting a taxable location by ID.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_taxable_location_by_id',
      description: 'Get a taxable location by ID.',
      parameters: {
        type: 'object',
        properties: {
          taxableLocationID: {
            type: 'string',
            description: 'The ID of the existing Taxable Location Object.'
          }
        },
        required: ['taxableLocationID']
      }
    }
  }
};

export { apiTool };