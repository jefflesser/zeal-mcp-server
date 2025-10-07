/**
 * Function to update contractor information in Zeal MCP.
 *
 * @param {Object} args - Arguments for the contractor update.
 * @param {string} args.contractorID - The ID of the contractor to update.
 * @param {string} args.companyID - The ID of the company associated with the contractor.
 * @param {string} args.type - The type of the contractor (e.g., partnership).
 * @param {string} args.first_name - The first name of the contractor.
 * @param {string} args.middle_name - The middle name of the contractor.
 * @param {string} args.last_name - The last name of the contractor.
 * @param {string} args.email - The email address of the contractor.
 * @param {string} args.ssn - The Social Security Number of the contractor.
 * @param {string} args.ein - The Employer Identification Number of the contractor.
 * @param {string} args.business_name - The business name of the contractor.
 * @param {string} args.address - The address of the contractor.
 * @param {string} args.city - The city of the contractor.
 * @param {string} args.state - The state of the contractor.
 * @param {string} args.zip - The ZIP code of the contractor.
 * @param {string} args.dob - The date of birth of the contractor.
 * @returns {Promise<Object>} - The result of the contractor update.
 */
const executeFunction = async ({
  contractorID,
  companyID,
  type,
  first_name,
  middle_name,
  last_name,
  email,
  ssn,
  ein,
  business_name,
  address,
  city,
  state,
  zip,
  dob
}) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const payload = {
    contractorID,
    companyID,
    type,
    first_name,
    middle_name,
    last_name,
    email,
    ssn,
    ein,
    business_name,
    address,
    city,
    state,
    zip,
    dob
  };

  try {
    // Perform the fetch request
    const response = await fetch(`${apiUrl}/contractors`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
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
    console.error('Error updating contractor information:', error);
    return {
      error: `An error occurred while updating contractor information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating contractor information in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_contractor_information',
      description: 'Update contractor information in Zeal MCP.',
      parameters: {
        type: 'object',
        properties: {
          contractorID: {
            type: 'string',
            description: 'The ID of the contractor to update.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company associated with the contractor.'
          },
          type: {
            type: 'string',
            description: 'The type of the contractor (e.g., partnership).'
          },
          first_name: {
            type: 'string',
            description: 'The first name of the contractor.'
          },
          middle_name: {
            type: 'string',
            description: 'The middle name of the contractor.'
          },
          last_name: {
            type: 'string',
            description: 'The last name of the contractor.'
          },
          email: {
            type: 'string',
            description: 'The email address of the contractor.'
          },
          ssn: {
            type: 'string',
            description: 'The Social Security Number of the contractor.'
          },
          ein: {
            type: 'string',
            description: 'The Employer Identification Number of the contractor.'
          },
          business_name: {
            type: 'string',
            description: 'The business name of the contractor.'
          },
          address: {
            type: 'string',
            description: 'The address of the contractor.'
          },
          city: {
            type: 'string',
            description: 'The city of the contractor.'
          },
          state: {
            type: 'string',
            description: 'The state of the contractor.'
          },
          zip: {
            type: 'string',
            description: 'The ZIP code of the contractor.'
          },
          dob: {
            type: 'string',
            description: 'The date of birth of the contractor.'
          }
        },
        required: ['contractorID', 'companyID', 'first_name', 'last_name', 'email']
      }
    }
  }
};

export { apiTool };