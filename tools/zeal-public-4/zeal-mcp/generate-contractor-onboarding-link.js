/**
 * Function to generate a secure onboarding link for a contractor.
 *
 * @param {Object} args - Arguments for the onboarding link generation.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.contractorID - The ID of the contractor.
 * @param {boolean} [args.scan_id=true] - Whether to include a scan ID.
 * @returns {Promise<Object>} - The result of the onboarding link generation.
 */
const executeFunction = async ({ companyID, contractorID, scan_id = true }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${apiUrl}/contractors/onboard`;

    // Set up the request body
    const body = JSON.stringify({
      companyID,
      contractorID,
      scan_id
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

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
    console.error('Error generating onboarding link:', error);
    return {
      error: `An error occurred while generating the onboarding link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for generating a contractor onboarding link.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_contractor_onboarding_link',
      description: 'Generate a secure onboarding link for a contractor.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          contractorID: {
            type: 'string',
            description: 'The ID of the contractor.'
          },
          scan_id: {
            type: 'boolean',
            description: 'Whether to include a scan ID.'
          }
        },
        required: ['companyID', 'contractorID']
      }
    }
  }
};

export { apiTool };