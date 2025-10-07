/**
 * Function to create international contractors.
 *
 * @param {Object} args - Arguments for creating international contractors.
 * @param {string} args.companyID - The ID of the company for which contractors are being created.
 * @param {Array<Object>} args.new_international_contractors - An array of new international contractors to be created.
 * @param {string} args.new_international_contractors[].email - The email of the contractor.
 * @param {number} args.new_international_contractors[].tax_rate - The tax rate for the contractor.
 * @param {boolean} args.new_international_contractors[].onboarded - The onboarding status of the contractor.
 * @param {string} args.new_international_contractors[].employment_status - The employment status of the contractor.
 * @param {string} args.new_international_contractors[].start_date - The start date of the contractor.
 * @returns {Promise<Object>} - The result of the contractor creation.
 */
const executeFunction = async ({ companyID, new_international_contractors }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the request body
    const body = JSON.stringify({
      companyID,
      new_international_contractors
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
    const response = await fetch(`${apiUrl}/internationalContractors`, {
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
    console.error('Error creating international contractors:', error);
    return {
      error: `An error occurred while creating international contractors: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating international contractors.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_international_contractors',
      description: 'Create international contractors.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which contractors are being created.'
          },
          new_international_contractors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  description: 'The email of the contractor.'
                },
                tax_rate: {
                  type: 'number',
                  description: 'The tax rate for the contractor.'
                },
                onboarded: {
                  type: 'boolean',
                  description: 'The onboarding status of the contractor.'
                },
                employment_status: {
                  type: 'string',
                  description: 'The employment status of the contractor.'
                },
                start_date: {
                  type: 'string',
                  description: 'The start date of the contractor.'
                }
              },
              required: ['email', 'tax_rate', 'onboarded', 'employment_status', 'start_date']
            },
            description: 'An array of new international contractors to be created.'
          }
        },
        required: ['companyID', 'new_international_contractors']
      }
    }
  }
};

export { apiTool };