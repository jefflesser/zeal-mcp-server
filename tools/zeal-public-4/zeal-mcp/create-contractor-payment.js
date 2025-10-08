/**
 * Function to create a contractor payment in the Zeal API.
 *
 * @param {Object} args - Arguments for creating the contractor payment.
 * @param {string} args.contractorID - The ID of the contractor.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.pay_date - The payment date.
 * @param {number} args.amount - The payment amount.
 * @param {Object} [args.disbursement] - The disbursement method.
 * @param {Object} [args.metadata] - Additional metadata for the payment.
 * @returns {Promise<Object>} - The result of the contractor payment creation.
 */
const executeFunction = async ({ contractorID, companyID, pay_date, amount, disbursement = { method: "prepaid" }, metadata = { example: "example" } }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the request body
    const body = JSON.stringify({
      approval_required: false,
      contractorID,
      companyID,
      pay_date,
      amount,
      disbursement,
      metadata
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${apiUrl}/contractorPayment`, {
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
    console.error('Error creating contractor payment:', error);
    return {
      error: `An error occurred while creating the contractor payment: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating contractor payments in the Zeal API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_contractor_payment',
      description: 'Create a contractor payment in the Zeal API.',
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
          pay_date: {
            type: 'string',
            description: 'The payment date.'
          },
          amount: {
            type: 'number',
            description: 'The payment amount.'
          },
          disbursement: {
            type: 'object',
            description: 'The disbursement method.'
          },
          metadata: {
            type: 'object',
            description: 'Additional metadata for the payment.'
          }
        },
        required: ['contractorID', 'companyID', 'pay_date', 'amount']
      }
    }
  }
};

export { apiTool };