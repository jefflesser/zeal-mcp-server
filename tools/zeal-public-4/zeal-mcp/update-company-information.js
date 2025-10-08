/**
 * Function to update company information in Zeal MCP.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.companyID - The ID of the company to update.
 * @param {string} args.first_name - The first name of the contact person.
 * @param {string} args.last_name - The last name of the contact person.
 * @param {string} args.email - The email address of the contact person.
 * @param {string} args.business_name - The name of the business.
 * @param {string} args.business_ein - The EIN of the business.
 * @param {string} args.mailing_address - The mailing address of the business.
 * @param {string} args.mailing_city - The mailing city of the business.
 * @param {string} args.mailing_state - The mailing state of the business.
 * @param {string} args.mailing_zip - The mailing zip code of the business.
 * @param {string} args.business_phone - The business phone number.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({
  companyID,
  first_name,
  last_name,
  email,
  business_name,
  business_ein,
  mailing_address,
  mailing_city,
  mailing_state,
  mailing_zip,
  business_phone
}) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  const requestBody = {
    companyID,
    first_name,
    last_name,
    email,
    business_name,
    business_ein,
    mailing_address,
    mailing_city,
    mailing_state,
    mailing_zip,
    business_phone
  };

  try {
    const response = await fetch(`${apiUrl}/companies`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating company information:', error);
    return {
      error: `An error occurred while updating company information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating company information in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_company_info',
      description: 'Update company information in Zeal MCP.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company to update.'
          },
          first_name: {
            type: 'string',
            description: 'The first name of the contact person.'
          },
          last_name: {
            type: 'string',
            description: 'The last name of the contact person.'
          },
          email: {
            type: 'string',
            description: 'The email address of the contact person.'
          },
          business_name: {
            type: 'string',
            description: 'The name of the business.'
          },
          business_ein: {
            type: 'string',
            description: 'The EIN of the business.'
          },
          mailing_address: {
            type: 'string',
            description: 'The mailing address of the business.'
          },
          mailing_city: {
            type: 'string',
            description: 'The mailing city of the business.'
          },
          mailing_state: {
            type: 'string',
            description: 'The mailing state of the business.'
          },
          mailing_zip: {
            type: 'string',
            description: 'The mailing zip code of the business.'
          },
          business_phone: {
            type: 'string',
            description: 'The business phone number.'
          }
        },
        required: ['companyID', 'first_name', 'last_name', 'email', 'business_name', 'business_ein', 'mailing_address', 'mailing_city', 'mailing_state', 'mailing_zip', 'business_phone']
      }
    }
  }
};

export { apiTool };