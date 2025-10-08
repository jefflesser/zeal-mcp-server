/**
 * Function to create an international contractor payment record.
 *
 * @param {Object} args - Arguments for the payment creation.
 * @param {string} args.companyID - The ID of the company making the payment.
 * @param {string} args.intlContractorID - The ID of the international contractor receiving the payment.
 * @param {string} args.gross_amount - The gross amount to be paid.
 * @param {string} args.pay_date - The date of the payment.
 * @returns {Promise<Object>} - The result of the payment creation.
 */
const executeFunction = async ({ companyID, intlContractorID, gross_amount, pay_date }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL for the payment creation
    const url = `${apiUrl}/internationalContractors/payment`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Create the request body
    const body = JSON.stringify({
      companyID,
      intlContractorID,
      gross_amount,
      pay_date
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
    console.error('Error creating international contractor payment:', error);
    return {
      error: `An error occurred while creating the payment: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating an international contractor payment.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_international_contractor_payment',
      description: 'Create an international contractor payment record.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company making the payment.'
          },
          intlContractorID: {
            type: 'string',
            description: 'The ID of the international contractor receiving the payment.'
          },
          gross_amount: {
            type: 'string',
            description: 'The gross amount to be paid.'
          },
          pay_date: {
            type: 'string',
            description: 'The date of the payment.'
          }
        },
        required: ['companyID', 'intlContractorID', 'gross_amount', 'pay_date']
      }
    }
  }
};

export { apiTool };