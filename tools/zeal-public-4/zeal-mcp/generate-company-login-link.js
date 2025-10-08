/**
 * Function to generate a company login link for Zeal.
 *
 * @param {Object} args - Arguments for generating the login link.
 * @param {string} args.partnerID - The partner ID for the company.
 * @param {string} args.companyID - The company ID for the login link.
 * @returns {Promise<Object>} - The result of the login link generation.
 */
const executeFunction = async ({ partnerID, companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${apiUrl}/getAuthLink`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({ partnerID, companyID });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
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
    console.error('Error generating company login link:', error);
    return {
      error: `An error occurred while generating the company login link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for generating a company login link for Zeal.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_company_login_link',
      description: 'Generates a link that automatically signs in an employer into their Zeal Company Dashboard.',
      parameters: {
        type: 'object',
        properties: {
          partnerID: {
            type: 'string',
            description: 'The partner ID for the company.'
          },
          companyID: {
            type: 'string',
            description: 'The company ID for the login link.'
          }
        },
        required: ['partnerID', 'companyID']
      }
    }
  }
};

export { apiTool };