/**
 * Function to update an international contractor payment record.
 *
 * @param {Object} args - Arguments for the payment update.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.intlContractorID - The ID of the international contractor.
 * @param {string} args.intlContractorPaymentID - The ID of the international contractor payment.
 * @param {number} args.gross_amount - The gross amount to be paid.
 * @param {string} args.pay_date - The date of payment.
 * @returns {Promise<Object>} - The result of the payment update.
 */
const executeFunction = async ({ companyID, intlContractorID, intlContractorPaymentID, gross_amount, pay_date }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL for the payment update
    const url = `${apiUrl}/payment`;

    // Prepare the request body
    const body = JSON.stringify({
      companyID,
      intlContractorID,
      intlContractorPaymentID,
      gross_amount,
      pay_date
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
    console.error('Error updating international contractor payment:', error);
    return {
      error: `An error occurred while updating the payment: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating an international contractor payment.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_international_contractor_payment',
      description: 'Update an international contractor payment record.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          intlContractorID: {
            type: 'string',
            description: 'The ID of the international contractor.'
          },
          intlContractorPaymentID: {
            type: 'string',
            description: 'The ID of the international contractor payment.'
          },
          gross_amount: {
            type: 'number',
            description: 'The gross amount to be paid.'
          },
          pay_date: {
            type: 'string',
            description: 'The date of payment.'
          }
        },
        required: ['companyID', 'intlContractorID', 'intlContractorPaymentID', 'gross_amount', 'pay_date']
      }
    }
  }
};

export { apiTool };