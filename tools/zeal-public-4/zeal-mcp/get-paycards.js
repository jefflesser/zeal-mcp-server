/**
 * Function to get paycards from Zeal API.
 *
 * @param {Object} args - Arguments for the paycard retrieval.
 * @param {string} args.companyID - The Zeal company ID (required).
 * @param {string} args.employeeID - The Zeal employee ID.
 * @param {string} args.contractorID - The Zeal contractor ID.
 * @param {string} args.paycardID - The paycard ID.
 * @param {string} [args.start_at] - The start date for the paycard records.
 * @param {string} [args.end_at] - The end date for the paycard records.
 * @param {number} [args.limit=25] - The number of records to return (default is 25).
 * @returns {Promise<Object>} - The result of the paycard retrieval.
 */
const executeFunction = async ({ companyID, employeeID, contractorID, paycardID, start_at = '', end_at = '', limit = 25 }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/paycards`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('employeeID', employeeID);
    url.searchParams.append('contractorID', contractorID);
    url.searchParams.append('paycardID', paycardID);
    url.searchParams.append('start_at', start_at);
    url.searchParams.append('end_at', end_at);
    url.searchParams.append('limit', limit.toString());

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
    console.error('Error retrieving paycards:', error);
    return {
      error: `An error occurred while retrieving paycards: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving paycards from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_paycards',
      description: 'Retrieve paycards from Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The Zeal company ID.'
          },
          employeeID: {
            type: 'string',
            description: 'The Zeal employee ID.'
          },
          contractorID: {
            type: 'string',
            description: 'The Zeal contractor ID.'
          },
          paycardID: {
            type: 'string',
            description: 'The paycard ID.'
          },
          start_at: {
            type: 'string',
            description: 'The start date for the paycard records.'
          },
          end_at: {
            type: 'string',
            description: 'The end date for the paycard records.'
          },
          limit: {
            type: 'integer',
            description: 'The number of records to return.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };