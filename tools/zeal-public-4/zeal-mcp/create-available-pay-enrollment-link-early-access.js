/**
 * Function to create an available pay enrollment link for a contractor.
 *
 * @param {Object} args - Arguments for the enrollment link creation.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.contractorID - The ID of the contractor.
 * @returns {Promise<Object>} - The result of the enrollment link creation.
 */
const executeFunction = async ({ companyID, contractorID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${apiUrl}/contractors/available_pay`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({ companyID, contractorID });

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
    console.error('Error creating available pay enrollment link:', error);
    return {
      error: `An error occurred while creating the enrollment link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating an available pay enrollment link for a contractor.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_available_pay_enrollment_link',
      description: 'Create an available pay enrollment link for a contractor.',
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
          }
        },
        required: ['companyID', 'contractorID']
      }
    }
  }
};

export { apiTool };