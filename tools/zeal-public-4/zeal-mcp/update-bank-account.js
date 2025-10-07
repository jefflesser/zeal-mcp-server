/**
 * Function to update an existing bank account for a specified worker.
 *
 * @param {Object} args - Arguments for the bank account update.
 * @param {string} args.bankAccountID - The ID of the bank account to update.
 * @param {string} args.companyID - The ID of the company associated with the bank account.
 * @param {string} args.account_number - The account number of the bank account.
 * @param {string} args.type - The type of the bank account (e.g., checking, savings).
 * @param {string} args.routing_number - The routing number of the bank account.
 * @param {string} args.institution_name - The name of the financial institution.
 * @returns {Promise<Object>} - The result of the bank account update.
 */
const executeFunction = async ({ bankAccountID, companyID, account_number, type, routing_number, institution_name }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const requestBody = {
    bankAccountID,
    companyID,
    account_number,
    type,
    routing_number,
    institution_name
  };

  try {
    const response = await fetch(`${apiUrl}/bankaccount`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating bank account:', error);
    return {
      error: `An error occurred while updating the bank account: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a bank account.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_bank_account',
      description: 'Update an existing bank account for a specified worker.',
      parameters: {
        type: 'object',
        properties: {
          bankAccountID: {
            type: 'string',
            description: 'The ID of the bank account to update.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company associated with the bank account.'
          },
          account_number: {
            type: 'string',
            description: 'The account number of the bank account.'
          },
          type: {
            type: 'string',
            description: 'The type of the bank account (e.g., checking, savings).'
          },
          routing_number: {
            type: 'string',
            description: 'The routing number of the bank account.'
          },
          institution_name: {
            type: 'string',
            description: 'The name of the financial institution.'
          }
        },
        required: ['bankAccountID', 'companyID', 'account_number', 'type', 'routing_number', 'institution_name']
      }
    }
  }
};

export { apiTool };