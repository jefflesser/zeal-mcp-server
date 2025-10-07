/**
 * Function to create a direct payment in the Zeal API.
 *
 * @param {Object} args - Arguments for the direct payment.
 * @param {string} args.companyID - The ID of the company making the payment.
 * @param {number} args.amount - The amount of the payment.
 * @param {string} args.employeeID - The ID of the employee receiving the payment.
 * @param {string} args.contractorID - The ID of the contractor receiving the payment.
 * @returns {Promise<Object>} - The result of the direct payment creation.
 */
const executeFunction = async ({ companyID, amount, employeeID, contractorID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const payload = {
    companyID,
    amount: amount.toString(),
    employeeID,
    contractorID
  };

  try {
    const response = await fetch(`${apiUrl}/directPayments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
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
    console.error('Error creating direct payment:', error);
    return {
      error: `An error occurred while creating the direct payment: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating direct payments in the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_direct_payment',
      description: 'Create a direct payment in the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company making the payment.'
          },
          amount: {
            type: 'number',
            description: 'The amount of the payment.'
          },
          employeeID: {
            type: 'string',
            description: 'The ID of the employee receiving the payment.'
          },
          contractorID: {
            type: 'string',
            description: 'The ID of the contractor receiving the payment.'
          }
        },
        required: ['companyID', 'amount', 'employeeID', 'contractorID']
      }
    }
  }
};

export { apiTool };