/**
 * Function to generate an employee or contractor dashboard link.
 *
 * @param {Object} args - Arguments for generating the dashboard link.
 * @param {string} args.partnerID - The ID of the partner.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeID - The ID of the employee.
 * @returns {Promise<Object>} - The result of the dashboard link generation.
 */
const executeFunction = async ({ partnerID, companyID, employeeID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  try {
    // Construct the request body
    const body = JSON.stringify({
      partnerID,
      companyID,
      employeeID
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
    const response = await fetch(`${apiUrl}/`, {
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
    console.error('Error generating dashboard link:', error);
    return {
      error: `An error occurred while generating the dashboard link: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for generating employee or contractor dashboard link.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_dashboard_link',
      description: 'Generate an employee or contractor dashboard link.',
      parameters: {
        type: 'object',
        properties: {
          partnerID: {
            type: 'string',
            description: 'The ID of the partner.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employeeID: {
            type: 'string',
            description: 'The ID of the employee.'
          }
        },
        required: ['partnerID', 'companyID', 'employeeID']
      }
    }
  }
};

export { apiTool };