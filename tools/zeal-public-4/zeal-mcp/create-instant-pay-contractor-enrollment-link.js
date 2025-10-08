/**
 * Function to create an instant pay contractor enrollment link.
 *
 * @param {Object} args - Arguments for creating the enrollment link.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.contractorID - The ID of the contractor.
 * @param {boolean} [args.send_to_worker=false] - Whether to send the link to the worker.
 * @returns {Promise<Object>} - The result of the enrollment link creation.
 */
const executeFunction = async ({ companyID, contractorID, send_to_worker = false }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${apiUrl}/contractors/instant-pay`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Create the request body
    const body = JSON.stringify({
      companyID,
      contractorID,
      send_to_worker
    });

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
    console.error('Error creating contractor enrollment link:', error);
    return {
      error: `An error occurred while creating the contractor enrollment link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating an instant pay contractor enrollment link.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_instant_pay_contractor_enrollment_link',
      description: 'Create an instant pay contractor enrollment link.',
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
          send_to_worker: {
            type: 'boolean',
            description: 'Whether to send the link to the worker.'
          }
        },
        required: ['companyID', 'contractorID']
      }
    }
  }
};

export { apiTool };