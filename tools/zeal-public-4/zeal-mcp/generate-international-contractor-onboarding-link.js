/**
 * Function to generate a secure onboarding link for an international contractor.
 *
 * @param {Object} args - Arguments for the onboarding link generation.
 * @param {string} args.intlContractorID - The ID of the international contractor.
 * @param {string} args.companyID - The ID of the company.
 * @returns {Promise<Object>} - The result of the onboarding link generation.
 */
const executeFunction = async ({ intlContractorID, companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${apiUrl}/internationalContractors/onboard`;

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
      intlContractorID,
      companyID,
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
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
    console.error('Error generating onboarding link:', error);
    return {
      error: `An error occurred while generating the onboarding link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for generating onboarding links for international contractors.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_international_contractor_onboarding_link',
      description: 'Generate a secure onboarding link for an international contractor.',
      parameters: {
        type: 'object',
        properties: {
          intlContractorID: {
            type: 'string',
            description: 'The ID of the international contractor.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          }
        },
        required: ['intlContractorID', 'companyID']
      }
    }
  }
};

export { apiTool };