/**
 * Function to get international contractor information.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The company ID of the employer (required).
 * @param {string} [args.intlContractorID] - The ID of the International Contractor (optional).
 * @returns {Promise<Object>} - The result of the request for international contractor information.
 */
const executeFunction = async ({ companyID, intlContractorID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/internationalContractors`);
    url.searchParams.append('companyID', companyID);
    if (intlContractorID) {
      url.searchParams.append('intlContractorID', intlContractorID);
    }

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
    console.error('Error getting international contractor information:', error);
    return {
      error: `An error occurred while getting international contractor information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting international contractor information.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_international_contractor_info',
      description: 'Get international contractors for a company or a specific contractor.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the employer.'
          },
          intlContractorID: {
            type: 'string',
            description: 'The ID of the International Contractor.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };