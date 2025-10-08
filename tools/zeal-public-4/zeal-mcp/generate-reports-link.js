/**
 * Function to generate a reports link for an employer in Zeal.
 *
 * @param {Object} args - Arguments for generating the reports link.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.partnerID - The ID of the partner.
 * @returns {Promise<Object>} - The result of the reports link generation.
 */
const executeFunction = async ({ companyID, partnerID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${apiUrl}/authLinks/reports`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Prepare the request body
    const body = JSON.stringify({
      companyID,
      partnerID
    });

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
    console.error('Error generating reports link:', error);
    return {
      error: `An error occurred while generating the reports link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for generating reports link in Zeal.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_reports_link',
      description: 'Generates a link that signs in an employer to their Zeal Reports Dashboard.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          partnerID: {
            type: 'string',
            description: 'The ID of the partner.'
          }
        },
        required: ['companyID', 'partnerID']
      }
    }
  }
};

export { apiTool };