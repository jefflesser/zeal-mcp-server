/**
 * Function to update pending shifts in the Zeal API.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.companyID - The ID of the company.
 * @param {Array<Object>} args.shifts - An array of shift objects to update.
 * @param {string} args.shifts[].shiftID - The ID of the shift to update.
 * @param {Object} args.shifts[].reimbursement - The reimbursement details.
 * @param {number} args.shifts[].reimbursement.amount - The reimbursement amount.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ companyID, shifts }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    // Construct the URL for the PATCH request
    const url = `${apiUrl}/shifts`;

    // Prepare the request body
    const body = JSON.stringify({ companyID, shifts });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
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
    console.error('Error updating pending shifts:', error);
    return {
      error: `An error occurred while updating pending shifts: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating pending shifts in the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_pending_shifts',
      description: 'Update pending shifts in the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          shifts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                shiftID: {
                  type: 'string',
                  description: 'The ID of the shift to update.'
                },
                reimbursement: {
                  type: 'object',
                  properties: {
                    amount: {
                      type: 'number',
                      description: 'The reimbursement amount.'
                    }
                  },
                  required: ['amount']
                }
              },
              required: ['shiftID', 'reimbursement']
            },
            description: 'An array of shift objects to update.'
          }
        },
        required: ['companyID', 'shifts']
      }
    }
  }
};

export { apiTool };