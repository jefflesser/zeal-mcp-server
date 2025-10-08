/**
 * Function to download a report from Zeal API.
 *
 * @param {Object} args - Arguments for the report download.
 * @param {string} args.job_id - The job ID returned in the POST response for the report.
 * @returns {Promise<Object>} - The result of the report download.
 */
const executeFunction = async ({ job_id }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL with the job_id query parameter
    const url = new URL(`${apiUrl}/reports/downloads`);
    url.searchParams.append('job_id', job_id);

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
    console.error('Error downloading report:', error);
    return {
      error: `An error occurred while downloading the report: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for downloading reports from Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_report_download',
      description: 'Download a report from Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'The job ID returned in the POST response for the report.'
          }
        },
        required: ['job_id']
      }
    }
  }
};

export { apiTool };