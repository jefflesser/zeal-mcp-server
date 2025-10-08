/**
 * Function to get a card from the Zeal API.
 *
 * @param {Object} args - Arguments for the card retrieval.
 * @param {string} args.companyID - The ID of the company (required).
 * @param {string} args.employeeID - The Zeal employee ID (required).
 * @param {string} args.contractorID - The Zeal contractor ID (required).
 * @returns {Promise<Object>} - The result of the card retrieval.
 */
const executeFunction = async ({ companyID, employeeID, contractorID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/card`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('employeeID', employeeID);
    url.searchParams.append('contractorID', contractorID);

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
    console.error('Error retrieving card:', error);
    return {
      error: `An error occurred while retrieving the card: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a card from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_card',
      description: 'Retrieve a card from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employeeID: {
            type: 'string',
            description: 'The Zeal employee ID.'
          },
          contractorID: {
            type: 'string',
            description: 'The Zeal contractor ID.'
          }
        },
        required: ['companyID', 'employeeID', 'contractorID']
      }
    }
  }
};

export { apiTool };