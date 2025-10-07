/**
 * Function to fetch Company Authorization Documents from Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.companyID - The company ID of the company (required).
 * @param {string} args.document_key - The type of the Authorization Document (required). Accepts 8655, 2848, or 'all' for all document types.
 * @returns {Promise<Object>} - The response from the API containing the authorization documents.
 */
const executeFunction = async ({ companyID, document_key }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/companies/authorization_documents`);
    url.searchParams.append('companyID', companyID);
    url.searchParams.append('document_key', document_key);

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
    console.error('Error fetching Company Authorization Documents:', error);
    return {
      error: `An error occurred while fetching Company Authorization Documents: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for fetching Company Authorization Documents from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_company_authorization_documents',
      description: 'Fetch and view Company Authorization Documents.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID of the company.'
          },
          document_key: {
            type: 'string',
            description: 'The type of the Authorization Document. Accepts 8655, 2848, or all for all document types.'
          }
        },
        required: ['companyID', 'document_key']
      }
    }
  }
};

export { apiTool };