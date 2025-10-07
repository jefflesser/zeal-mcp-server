/**
 * Function to sign company authorization documents.
 *
 * @param {Object} args - Arguments for signing the document.
 * @param {string} args.companyID - The ID of the company to sign documents for.
 * @param {string} args.document_key - The key of the document to be signed.
 * @param {string} args.signature - The signature for the document.
 * @returns {Promise<Object>} - The result of the document signing operation.
 */
const executeFunction = async ({ companyID, document_key, signature }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${apiUrl}/companies/authorization_documents`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Create the request body
    const body = JSON.stringify({
      companyID,
      document_key,
      signature
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
    console.error('Error signing company authorization documents:', error);
    return {
      error: `An error occurred while signing documents: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for signing company authorization documents.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'sign_company_authorization_documents',
      description: 'Sign authorization documents necessary to onboard a company.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company to sign documents for.'
          },
          document_key: {
            type: 'string',
            description: 'The key of the document to be signed.'
          },
          signature: {
            type: 'string',
            description: 'The signature for the document.'
          }
        },
        required: ['companyID', 'document_key', 'signature']
      }
    }
  }
};

export { apiTool };