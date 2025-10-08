/**
 * Function to upload an employee's government ID to Zeal.
 *
 * @param {Object} args - Arguments for the upload.
 * @param {string} args.employeeID - The ID of the employee.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.id_type - The type of ID being uploaded (e.g., passport).
 * @param {string} args.id_base64 - The base64 encoded ID data.
 * @returns {Promise<Object>} - The result of the upload operation.
 */
const executeFunction = async ({ employeeID, companyID, id_type, id_base64 }) => {
  const baseUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the URL for the POST request
    const url = `${baseUrl}/employees/id`;

    // Set up the request body
    const body = JSON.stringify({
      employeeID,
      companyID,
      id_type,
      id_base64
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

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
    console.error('Error uploading employee government ID:', error);
    return {
      error: `An error occurred while uploading the ID: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for uploading an employee's government ID to Zeal.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'upload_employee_government_id',
      description: 'Upload an employee\'s government ID to Zeal.',
      parameters: {
        type: 'object',
        properties: {
          employeeID: {
            type: 'string',
            description: 'The ID of the employee.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          id_type: {
            type: 'string',
            description: 'The type of ID being uploaded (e.g., passport).'
          },
          id_base64: {
            type: 'string',
            description: 'The base64 encoded ID data.'
          }
        },
        required: ['employeeID', 'companyID', 'id_type', 'id_base64']
      }
    }
  }
};

export { apiTool };