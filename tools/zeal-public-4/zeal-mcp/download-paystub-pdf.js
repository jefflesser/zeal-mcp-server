/**
 * Function to download an employee's paystub in PDF format.
 *
 * @param {Object} args - Arguments for the paystub download.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.employeeCheckID - The ID of the employee check to download the paystub for.
 * @returns {Promise<Object>} - The result of the paystub download.
 */
const executeFunction = async ({ companyID, employeeCheckID }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${apiUrl}/paystub/company/${companyID}/check/${employeeCheckID}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers
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
    console.error('Error downloading paystub:', error);
    return {
      error: `An error occurred while downloading the paystub: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for downloading paystub PDF.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'download_paystub_pdf',
      description: 'Download an employee\'s paystub in PDF format.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          employeeCheckID: {
            type: 'string',
            description: 'The ID of the employee check to download the paystub for.'
          }
        },
        required: ['companyID', 'employeeCheckID']
      }
    }
  }
};

export { apiTool };