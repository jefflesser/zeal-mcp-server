/**
 * Function to transfer funds using the Zeal API.
 *
 * @param {Object} args - Arguments for the fund transfer.
 * @param {string} args.companyID - The ID of the company initiating the transfer.
 * @param {number} args.amount - The amount to be transferred.
 * @param {string} args.employeeID - The ID of the employee involved in the transfer.
 * @param {string} args.contractorID - The ID of the contractor involved in the transfer.
 * @param {string} args.connectionID - The ID of the connection for the transfer.
 * @returns {Promise<Object>} - The result of the fund transfer operation.
 */
const executeFunction = async ({ companyID, amount, employeeID, contractorID, connectionID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  const requestBody = {
    companyID,
    amount,
    employeeID,
    contractorID,
    connection: {
      connection_type: 'employee_check',
      connectionID
    }
  };

  try {
    // Perform the fetch request
    const response = await fetch(`${apiUrl}/wallet/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
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
    console.error('Error transferring funds:', error);
    return {
      error: `An error occurred while transferring funds: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for transferring funds using the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'transfer_funds',
      description: 'Transfer funds using the Zeal API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company initiating the transfer.'
          },
          amount: {
            type: 'number',
            description: 'The amount to be transferred.'
          },
          employeeID: {
            type: 'string',
            description: 'The ID of the employee involved in the transfer.'
          },
          contractorID: {
            type: 'string',
            description: 'The ID of the contractor involved in the transfer.'
          },
          connectionID: {
            type: 'string',
            description: 'The ID of the connection for the transfer.'
          }
        },
        required: ['companyID', 'amount', 'employeeID', 'contractorID', 'connectionID']
      }
    }
  }
};

export { apiTool };