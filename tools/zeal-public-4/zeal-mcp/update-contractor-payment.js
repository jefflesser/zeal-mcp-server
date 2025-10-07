/**
 * Function to update contractor payment in Zeal MCP.
 *
 * @param {Object} args - Arguments for the contractor payment update.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.contractorPaymentID - The ID of the contractor payment to update.
 * @param {string} args.contractorID - The ID of the contractor.
 * @param {boolean} [args.approval_required=true] - Indicates if approval is required.
 * @param {boolean} [args.approved=false] - Indicates if the payment is approved.
 * @param {string} args.pay_date - The payment date.
 * @param {number} args.amount - The amount to be paid.
 * @param {Object} args.disbursement - The disbursement method.
 * @param {string} args.type - The type of payment.
 * @param {Object} args.metadata - Additional metadata for the payment.
 * @param {string} args.customerAccountID - The ID of the customer account.
 * @returns {Promise<Object>} - The result of the contractor payment update.
 */
const executeFunction = async ({ companyID, contractorPaymentID, contractorID, approval_required = true, approved = false, pay_date, amount, disbursement, type, metadata = {}, customerAccountID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const payload = {
    companyID,
    contractorPaymentID,
    contractorID,
    approval_required,
    approved,
    pay_date,
    amount,
    disbursement,
    type,
    metadata,
    customerAccountID
  };

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${apiUrl}/contractorPayment`, {
      method: 'PATCH',
      headers,
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
    console.error('Error updating contractor payment:', error);
    return {
      error: `An error occurred while updating contractor payment: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating contractor payment in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_contractor_payment',
      description: 'Update contractor payment in Zeal MCP.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          contractorPaymentID: {
            type: 'string',
            description: 'The ID of the contractor payment to update.'
          },
          contractorID: {
            type: 'string',
            description: 'The ID of the contractor.'
          },
          approval_required: {
            type: 'boolean',
            description: 'Indicates if approval is required.'
          },
          approved: {
            type: 'boolean',
            description: 'Indicates if the payment is approved.'
          },
          pay_date: {
            type: 'string',
            description: 'The payment date.'
          },
          amount: {
            type: 'number',
            description: 'The amount to be paid.'
          },
          disbursement: {
            type: 'object',
            description: 'The disbursement method.'
          },
          type: {
            type: 'string',
            description: 'The type of payment.'
          },
          metadata: {
            type: 'object',
            description: 'Additional metadata for the payment.'
          },
          customerAccountID: {
            type: 'string',
            description: 'The ID of the customer account.'
          }
        },
        required: ['companyID', 'contractorPaymentID', 'contractorID', 'pay_date', 'amount', 'disbursement', 'type', 'customerAccountID']
      }
    }
  }
};

export { apiTool };