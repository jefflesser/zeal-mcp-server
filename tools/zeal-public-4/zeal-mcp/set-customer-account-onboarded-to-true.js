/**
 * Function to set the customer account onboarded status to true.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.customerAccountID - The ID of the customer account.
 * @param {string} args.companyID - The ID of the company.
 * @returns {Promise<Object>} - The response from the API.
 */
const executeFunction = async ({ customerAccountID, companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with the customer account ID
    const url = `${apiUrl}/customer-accounts/${customerAccountID}/setOnboardedStatusToTrue`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({ companyID });

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
    console.error('Error setting customer account onboarded status:', error);
    return {
      error: `An error occurred while setting the customer account onboarded status: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for setting customer account onboarded status.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'set_customer_account_onboarded',
      description: 'Set the customer account onboarded status to true.',
      parameters: {
        type: 'object',
        properties: {
          customerAccountID: {
            type: 'string',
            description: 'The ID of the customer account.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          }
        },
        required: ['customerAccountID', 'companyID']
      }
    }
  }
};

export { apiTool };