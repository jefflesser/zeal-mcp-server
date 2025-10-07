/**
 * Function to fetch tax and payroll documents for an employer/employee.
 *
 * @param {Object} args - Arguments for the document fetch.
 * @param {string} args.companyID - The company ID for which documents are to be fetched.
 * @param {string} [args.id=""] - Optional filter by the ID of the employee or contractor to get documents for the given worker.
 * @returns {Promise<Object>} - The result of the document fetch.
 */
const executeFunction = async ({ companyID, id = "" }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/documents`);
    url.searchParams.append('companyID', companyID);
    if (id) {
      url.searchParams.append('id', id);
    }

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
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
    console.error('Error fetching documents:', error);
    return {
      error: `An error occurred while fetching documents: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for fetching documents from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_documents',
      description: 'Fetch tax and payroll documents for an employer/employee.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The company ID for which documents are to be fetched.'
          },
          id: {
            type: 'string',
            description: 'Optional filter by the ID of the employee or contractor to get documents for the given worker.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };