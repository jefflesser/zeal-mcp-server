/**
 * Function to create an ID scan link.
 *
 * @param {Object} args - Arguments for creating the ID scan link.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.contractorID - The ID of the contractor.
 * @param {Array<string>} args.documents - An array of document strings.
 * @param {boolean} [args.send_to_worker=false] - Flag to send the request to a worker.
 * @returns {Promise<Object>} - The response from the ID scan link creation.
 */
const executeFunction = async ({ companyID, contractorID, documents, send_to_worker = false }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the request body
    const body = JSON.stringify({
      companyID,
      contractorID,
      documents,
      send_to_worker
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
    const response = await fetch(`${apiUrl}/id_scan`, {
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
    console.error('Error creating ID scan link:', error);
    return {
      error: `An error occurred while creating the ID scan link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating an ID scan link.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_id_scan_link',
      description: 'Create an ID scan link.',
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
          documents: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of document strings.'
          },
          send_to_worker: {
            type: 'boolean',
            description: 'Flag to send the request to a worker.'
          }
        },
        required: ['companyID', 'contractorID', 'documents']
      }
    }
  }
};

export { apiTool };