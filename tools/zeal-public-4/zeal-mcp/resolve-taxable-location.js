/**
 * Function to create or get a taxable location in Zeal MCP.
 *
 * @param {Object} args - Arguments for the taxable location.
 * @param {string} args.street1 - The first line of the street address.
 * @param {string} [args.street2] - The second line of the street address (optional).
 * @param {string} args.city - The city of the taxable location.
 * @param {string} args.state - The state of the taxable location.
 * @param {string} args.zip - The ZIP code of the taxable location.
 * @returns {Promise<Object>} - The result of the taxable location request.
 */
const executeFunction = async ({ street1, street2, city, state, zip }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  const requestBody = {
    street1,
    street2,
    city,
    state,
    zip
  };

  try {
    const response = await fetch(`${apiUrl}/taxableLocations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error resolving taxable location:', error);
    return {
      error: `An error occurred while resolving taxable location: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for resolving taxable locations in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'resolve_taxable_location',
      description: 'Create or get a taxable location in Zeal MCP.',
      parameters: {
        type: 'object',
        properties: {
          street1: {
            type: 'string',
            description: 'The first line of the street address.'
          },
          street2: {
            type: 'string',
            description: 'The second line of the street address (optional).'
          },
          city: {
            type: 'string',
            description: 'The city of the taxable location.'
          },
          state: {
            type: 'string',
            description: 'The state of the taxable location.'
          },
          zip: {
            type: 'string',
            description: 'The ZIP code of the taxable location.'
          }
        },
        required: ['street1', 'city', 'state', 'zip']
      }
    }
  }
};

export { apiTool };