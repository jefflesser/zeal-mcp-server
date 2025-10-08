/**
 * Function to get contractor payments from the Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The company ID of the employer.
 * @param {string} args.contractorID - The contractor ID of the contractor.
 * @param {string} [args.status] - Filter by status of contractor payment. Provide one of the following statuses: `pending`, `pre-processed`, `processed`.
 * @param {string} [args.paymentGroupID] - Filter by contractor payment group.
 * @param {string} [args.start_at] - The pagination cursor to start at.
 * @param {number} [args.limit=25] - Limit the amount of data returned.
 * @returns {Promise<Object>} - The result of the contractor payments request.
 */
const executeFunction = async ({ companyID, contractorID, status = '', paymentGroupID = '', start_at = '', limit = 25 }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/contractorPayment`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('contractorID', contractorID);
    if (status) url.searchParams.append('status', status);
    if (paymentGroupID) url.searchParams.append('paymentGroupID', paymentGroupID);
    if (start_at) url.searchParams.append('start_at', start_at);
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
    console.error('Error getting contractor payments:', error);
    return {
      error: `An error occurred while getting contractor payments: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting contractor payments from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_contractor_payments',
      description: 'Get contractor payments from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the employer.'
          },
          contractorID: {
            type: 'string',
            description: 'The contractor ID of the contractor.'
          },
          status: {
            type: 'string',
            description: 'Filter by status of contractor payment.'
          },
          paymentGroupID: {
            type: 'string',
            description: 'Filter by contractor payment group.'
          },
          start_at: {
            type: 'string',
            description: 'The pagination cursor to start at.'
          },
          limit: {
            type: 'integer',
            description: 'Limit the amount of data returned.'
          }
        },
        required: ['companyID', 'contractorID']
      }
    }
  }
};

export { apiTool };