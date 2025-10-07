/**
 * Function to get contractors from the Zeal API.
 *
 * @param {Object} args - Arguments for the contractor retrieval.
 * @param {string} args.companyID - The company ID of the employer (required).
 * @param {boolean} [args.onboarded] - Filter by contractor onboarded status.
 * @param {string} [args.employment_status] - Filter by contractor employment status.
 * @param {string} [args.type] - Filter by contractor type (business, individual).
 * @param {string} [args.email] - Filter by contractor email.
 * @param {string} [args.external_id] - Filter by contractor external ID.
 * @returns {Promise<Object>} - The result of the contractor retrieval.
 */
const executeFunction = async ({ companyID, onboarded, employment_status, type, email, external_id }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/contractors`);
    url.searchParams.append('companyID', companyID);
    if (onboarded !== undefined) url.searchParams.append('onboarded', onboarded);
    if (employment_status) url.searchParams.append('employment_status', employment_status);
    if (type) url.searchParams.append('type', type);
    if (email) url.searchParams.append('email', email);
    if (external_id) url.searchParams.append('external_id', external_id);

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
    console.error('Error retrieving contractors:', error);
    return {
      error: `An error occurred while retrieving contractors: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving contractors from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_contractors',
      description: 'Retrieve contractors from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the employer.'
          },
          onboarded: {
            type: 'boolean',
            description: 'Filter by contractor onboarded status.'
          },
          employment_status: {
            type: 'string',
            description: 'Filter by contractor employment status.'
          },
          type: {
            type: 'string',
            description: 'Filter by contractor type (business, individual).'
          },
          email: {
            type: 'string',
            description: 'Filter by contractor email.'
          },
          external_id: {
            type: 'string',
            description: 'Filter by contractor external ID.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };