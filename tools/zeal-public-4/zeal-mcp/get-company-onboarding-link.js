/**
 * Function to get the company onboarding link from Zeal.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.partnerID - The PartnerID of the Zeal Partner (required).
 * @param {string} [args.webhook_correlation_id] - Optional ID to include in the webhook payload.
 * @param {string} [args.companyID] - The company ID to generate a link for the current onboarding step.
 * @returns {Promise<Object>} - The response containing the onboarding link or an error message.
 */
const executeFunction = async ({ partnerID, webhook_correlation_id = '', companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/companies/onboard`);
    url.searchParams.append('partnerID', partnerID);
    url.searchParams.append('webhook_correlation_id', webhook_correlation_id);
    url.searchParams.append('companyID', companyID);

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
    console.error('Error getting company onboarding link:', error);
    return {
      error: `An error occurred while getting the company onboarding link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting the company onboarding link from Zeal.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_company_onboarding_link',
      description: 'Get a link to Zeal\'s web-based company onboarding.',
      parameters: {
        type: 'object',
        properties: {
          partnerID: {
            type: 'string',
            description: 'The PartnerID of the Zeal Partner.'
          },
          webhook_correlation_id: {
            type: 'string',
            description: 'Optional ID to include in the webhook payload.'
          },
          companyID: {
            type: 'string',
            description: 'The company ID to generate a link for the current onboarding step.'
          }
        },
        required: ['partnerID']
      }
    }
  }
};

export { apiTool };