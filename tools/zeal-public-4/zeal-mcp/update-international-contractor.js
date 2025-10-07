/**
 * Function to update an international contractor in the Zeal API.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.intlContractorID - The ID of the international contractor to update.
 * @param {string} args.email - The email of the international contractor.
 * @param {string} args.tax_rate - The tax rate for the international contractor.
 * @param {boolean} args.onboarded - The onboarding status of the contractor.
 * @param {string} args.start_date - The start date for the contractor.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ companyID, intlContractorID, email, tax_rate, onboarded, start_date }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const requestBody = {
    companyID,
    international_contractor: {
      intlContractorID,
      email,
      tax_rate,
      onboarded,
      start_date
    }
  };

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${apiUrl}/internationalContractors`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(requestBody)
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
    console.error('Error updating international contractor:', error);
    return {
      error: `An error occurred while updating the international contractor: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating an international contractor in the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_international_contractor',
      description: 'Update an international contractor in the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          intlContractorID: {
            type: 'string',
            description: 'The ID of the international contractor to update.'
          },
          email: {
            type: 'string',
            description: 'The email of the international contractor.'
          },
          tax_rate: {
            type: 'string',
            description: 'The tax rate for the international contractor.'
          },
          onboarded: {
            type: 'boolean',
            description: 'The onboarding status of the contractor.'
          },
          start_date: {
            type: 'string',
            description: 'The start date for the contractor.'
          }
        },
        required: ['companyID', 'intlContractorID', 'email', 'tax_rate', 'onboarded', 'start_date']
      }
    }
  }
};

export { apiTool };