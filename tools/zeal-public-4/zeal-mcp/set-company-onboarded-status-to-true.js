/**
 * Function to set the onboarded status of a company.
 *
 * @param {Object} args - Arguments for the onboard status.
 * @param {string} args.companyID - The ID of the company to set as onboarded.
 * @returns {Promise<Object>} - The result of the onboard status update.
 */
const executeFunction = async ({ companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the request URL
    const url = `${apiUrl}/companies/onboardCompany`;

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
    const body = JSON.stringify({ companyID });

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
    console.error('Error setting company onboarded status:', error);
    return {
      error: `An error occurred while setting company onboarded status: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for setting the onboarded status of a company.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'set_company_onboarded_status',
      description: 'Set the onboarded status of a company.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company to set as onboarded.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };