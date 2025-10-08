/**
 * Function to set attribute values for a company.
 *
 * @param {Object} args - Arguments for setting attribute values.
 * @param {string} args.companyID - The ID of the company.
 * @param {Array<Object>} args.attributes - The attributes to set, each containing an attributeID and value.
 * @param {string} args.employeeID - The ID of the employee.
 * @param {string} [args.contractorID] - The ID of the contractor (optional).
 * @returns {Promise<Object>} - The result of the attribute setting operation.
 */
const executeFunction = async ({ companyID, attributes, employeeID, contractorID = '' }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;
  try {
    // Construct the request body
    const body = JSON.stringify({
      companyID,
      attributes,
      employeeID,
      contractorID
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${apiUrl}/attributes`, {
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
    console.error('Error setting attribute values:', error);
    return {
      error: `An error occurred while setting attribute values: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for setting attribute values for a company.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'set_attribute_value',
      description: 'Set attribute values for a company.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          attributes: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                attributeID: {
                  type: 'string',
                  description: 'The ID of the attribute.'
                },
                value: {
                  type: 'string',
                  description: 'The value to set for the attribute.'
                }
              },
              required: ['attributeID', 'value']
            },
            description: 'The attributes to set.'
          },
          employeeID: {
            type: 'string',
            description: 'The ID of the employee.'
          },
          contractorID: {
            type: 'string',
            description: 'The ID of the contractor (optional).'
          }
        },
        required: ['companyID', 'attributes', 'employeeID']
      }
    }
  }
};

export { apiTool };