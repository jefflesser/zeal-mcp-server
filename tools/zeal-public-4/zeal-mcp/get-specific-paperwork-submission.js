/**
 * Function to get a specific paperwork submission from Zeal API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.submissionID - The ID of the paperwork submission to retrieve.
 * @returns {Promise<Object>} - The result of the paperwork submission retrieval.
 */
const executeFunction = async ({ submissionID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL with the submission ID
    const url = `${apiUrl}/paperwork/submissions/${submissionID}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error retrieving paperwork submission:', error);
    return {
      error: `An error occurred while retrieving paperwork submission: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting a specific paperwork submission from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_specific_paperwork_submission',
      description: 'Get a specific paperwork submission from Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          submissionID: {
            type: 'string',
            description: 'The ID of the paperwork submission to retrieve.'
          }
        },
        required: ['submissionID']
      }
    }
  }
};

export { apiTool };