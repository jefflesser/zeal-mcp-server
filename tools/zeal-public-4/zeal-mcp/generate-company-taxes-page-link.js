/**
 * Function to generate an authenticated link for the Company Taxes Page.
 *
 * @param {Object} args - Arguments for generating the link.
 * @param {string} args.partnerID - The ID of the partner.
 * @param {string} args.companyID - The ID of the company.
 * @param {boolean} [args.showSidebar=true] - Whether to show the sidebar.
 * @returns {Promise<Object>} - The result of the link generation.
 */
const executeFunction = async ({ partnerID, companyID, showSidebar = true }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${apiUrl}/authLinks/taxes`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({
      partnerID,
      companyID,
      showSidebar
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
    console.error('Error generating Company Taxes Page link:', error);
    return {
      error: `An error occurred while generating the link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for generating Company Taxes Page link.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_company_taxes_link',
      description: 'Generate an authenticated link for the Company Taxes Page.',
      parameters: {
        type: 'object',
        properties: {
          partnerID: {
            type: 'string',
            description: 'The ID of the partner.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          showSidebar: {
            type: 'boolean',
            description: 'Whether to show the sidebar.'
          }
        },
        required: ['partnerID', 'companyID']
      }
    }
  }
};

export { apiTool };