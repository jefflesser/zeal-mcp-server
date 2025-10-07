/**
 * Function to create a paycard enrollment link for an employee.
 *
 * @param {Object} args - Arguments for the paycard enrollment link.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeID - The ID of the employee.
 * @returns {Promise<Object>} - The result of the paycard enrollment link creation.
 */
const executeFunction = async ({ companyID, employeeID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${apiUrl}/employees/paycard`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Prepare the request body
    const body = JSON.stringify({
      companyID,
      employeeID
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
    console.error('Error creating paycard enrollment link:', error);
    return {
      error: `An error occurred while creating the paycard enrollment link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a paycard enrollment link.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_paycard_enrollment_link',
      description: 'Create a paycard enrollment link for an employee.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employeeID: {
            type: 'string',
            description: 'The ID of the employee.'
          }
        },
        required: ['companyID', 'employeeID']
      }
    }
  }
};

export { apiTool };