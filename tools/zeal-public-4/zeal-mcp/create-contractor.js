/**
 * Function to create a contractor in the Zeal MCP API.
 *
 * @param {Object} args - Arguments for creating a contractor.
 * @param {string} args.companyID - The ID of the company for which the contractor is being created.
 * @param {string} args.email - The email address of the contractor.
 * @param {string} args.working_state - The working state of the contractor.
 * @param {string} args.first_name - The first name of the contractor.
 * @param {string} args.last_name - The last name of the contractor.
 * @param {string} args.type - The type of the contractor (e.g., s_corporation).
 * @param {string} args.business_name - The business name of the contractor.
 * @param {string} args.ein - The EIN of the contractor.
 * @param {string} args.dob - The date of birth of the contractor.
 * @returns {Promise<Object>} - The result of the contractor creation.
 */
const executeFunction = async ({ companyID, email, working_state, first_name, last_name, type, business_name, ein, dob }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const contractorData = {
    companyID,
    new_contractors: [
      {
        email,
        working_state,
        first_name,
        last_name,
        type,
        business_name,
        ein,
        dob
      }
    ]
  };

  try {
    const response = await fetch(`${apiUrl}/contractors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(contractorData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating contractor:', error);
    return {
      error: `An error occurred while creating the contractor: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a contractor in the Zeal MCP API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_contractor',
      description: 'Create a contractor in the Zeal MCP API.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the contractor is being created.'
          },
          email: {
            type: 'string',
            description: 'The email address of the contractor.'
          },
          working_state: {
            type: 'string',
            description: 'The working state of the contractor.'
          },
          first_name: {
            type: 'string',
            description: 'The first name of the contractor.'
          },
          last_name: {
            type: 'string',
            description: 'The last name of the contractor.'
          },
          type: {
            type: 'string',
            description: 'The type of the contractor (e.g., s_corporation).'
          },
          business_name: {
            type: 'string',
            description: 'The business name of the contractor.'
          },
          ein: {
            type: 'string',
            description: 'The EIN of the contractor.'
          },
          dob: {
            type: 'string',
            description: 'The date of birth of the contractor.'
          }
        },
        required: ['companyID', 'email', 'working_state', 'first_name', 'last_name', 'type', 'ssn', 'dob']
      }
    }
  }
};

export { apiTool };