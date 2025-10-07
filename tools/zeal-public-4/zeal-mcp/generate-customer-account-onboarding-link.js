/**
 * Function to generate a customer account onboarding link.
 *
 * @param {Object} args - Arguments for generating the onboarding link.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.customerAccountID - The ID of the customer account.
 * @returns {Promise<Object>} - The result of the onboarding link generation.
 */
const executeFunction = async ({ companyID, customerAccountID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${apiUrl}/customer-accounts/onboard`;

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
      customerAccountID,
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
    console.error('Error generating customer account onboarding link:', error);
    return {
      error: `An error occurred while generating the onboarding link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for generating a customer account onboarding link.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_customer_account_onboarding_link',
      description: 'Generate a customer account onboarding link.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          customerAccountID: {
            type: 'string',
            description: 'The ID of the customer account.'
          }
        },
        required: ['companyID', 'customerAccountID']
      }
    }
  }
};

export { apiTool };