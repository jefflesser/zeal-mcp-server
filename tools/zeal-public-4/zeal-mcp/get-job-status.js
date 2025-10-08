/**
 * Function to get the status of a job from the Zeal API.
 *
 * @param {Object} args - Arguments for the job status request.
 * @param {string} args.job_id - The Job ID returned in the POST response for the report.
 * @param {string} args.companyID - The Zeal Company ID.
 * @returns {Promise<Object>} - The result of the job status request.
 */
const executeFunction = async ({ job_id, companyID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiUrl}/reports`);
    url.searchParams.append('job_id', job_id);
    url.searchParams.append('companyID', companyID);

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
    console.error('Error getting job status:', error);
    return {
      error: `An error occurred while getting job status: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting job status from the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_job_status',
      description: 'Get the status of a job from the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'The Job ID returned in the POST response for the report.'
          },
          companyID: {
            type: 'string',
            description: 'The Zeal Company ID.'
          }
        },
        required: ['job_id', 'companyID']
      }
    }
  }
};

export { apiTool };