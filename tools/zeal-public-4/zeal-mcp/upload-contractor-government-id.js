/**
 * Function to upload a contractor's government ID to the Zeal API.
 *
 * @param {Object} args - Arguments for the upload.
 * @param {string} args.contractorID - The ID of the contractor.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} [args.id_type="passport"] - The type of ID being uploaded.
 * @param {string} args.id_base64 - The base64 encoded ID data.
 * @returns {Promise<Object>} - The result of the upload operation.
 */
const executeFunction = async ({ contractorID, companyID, id_type = 'passport', id_base64 }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the request body
    const body = JSON.stringify({
      contractorID,
      companyID,
      id_type,
      id_base64
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
    const response = await fetch(`${apiUrl}/contractors/id`, {
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
    console.error('Error uploading contractor government ID:', error);
    return {
      error: `An error occurred while uploading contractor government ID: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for uploading a contractor's government ID to the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'upload_contractor_id',
      description: 'Upload a contractor\'s government ID to the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          contractorID: {
            type: 'string',
            description: 'The ID of the contractor.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          id_type: {
            type: 'string',
            description: 'The type of ID being uploaded.'
          },
          id_base64: {
            type: 'string',
            description: 'The base64 encoded ID data.'
          }
        },
        required: ['contractorID', 'companyID', 'id_base64']
      }
    }
  }
};

export { apiTool };