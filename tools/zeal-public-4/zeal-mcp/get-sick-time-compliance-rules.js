/**
 * Function to get sick time compliance rules from the Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.state - (Required) State jurisdiction acronym.
 * @param {string} args.city - Name of the city.
 * @returns {Promise<Object>} - The response from the API containing compliance rules.
 */
const executeFunction = async ({ state, city }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/sickTimeCompliance`);
    url.searchParams.append('state', state);
    url.searchParams.append('city', city);

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
    console.error('Error fetching sick time compliance rules:', error);
    return {
      error: `An error occurred while fetching sick time compliance rules: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting sick time compliance rules from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_sick_time_compliance_rules',
      description: 'Get sick time compliance rules from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          state: {
            type: 'string',
            description: '(Required) State jurisdiction acronym.'
          },
          city: {
            type: 'string',
            description: 'Name of the city.'
          }
        },
        required: ['state']
      }
    }
  }
};

export { apiTool };