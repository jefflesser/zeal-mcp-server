/**
 * Function to create a company within Zeal.
 *
 * @param {Object} args - Arguments for creating a company.
 * @param {string} args.partnerID - The partner ID associated with the company.
 * @param {string} args.first_name - The first name of the contact person.
 * @param {string} args.last_name - The last name of the contact person.
 * @param {string} args.email - The email address of the contact person.
 * @param {string} args.business_name - The name of the business.
 * @param {string} args.business_ein - The EIN of the business.
 * @param {string} args.business_address - The address of the business.
 * @param {string} args.business_city - The city where the business is located.
 * @param {string} args.business_state - The state where the business is located.
 * @param {string} args.business_zip - The zip code of the business.
 * @param {string} args.business_phone - The phone number of the business.
 * @param {string} args.mail_address - The mailing address.
 * @param {string} args.mail_city - The mailing city.
 * @param {string} args.mail_state - The mailing state.
 * @param {string} args.mail_zip - The mailing zip code.
 * @returns {Promise<Object>} - The result of the company creation.
 */
const executeFunction = async ({
  partnerID,
  first_name,
  last_name,
  email,
  business_name,
  business_ein,
  business_address,
  business_city,
  business_state,
  business_zip,
  business_phone,
  mail_address,
  mail_city,
  mail_state,
  mail_zip
}) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const requestBody = {
    partnerID,
    first_name,
    last_name,
    email,
    business_name,
    business_ein,
    business_address,
    business_city,
    business_state,
    business_zip,
    business_phone,
    mail_address,
    mail_city,
    mail_state,
    mail_zip
  };

  try {
    const response = await fetch(`${apiUrl}/companies`, {
      method: 'POST',
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
    console.error('Error creating company:', error);
    return {
      error: `An error occurred while creating the company: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a company within Zeal.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_company',
      description: 'Creates a company within Zeal.',
      parameters: {
        type: 'object',
        properties: {
          partnerID: {
            type: 'string',
            description: 'The partner ID associated with the company.'
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
          business_address: {
            type: 'string',
            description: 'The address of the business.'
          },
          business_city: {
            type: 'string',
            description: 'The city where the business is located.'
          },
          business_state: {
            type: 'string',
            description: 'The state where the business is located.'
          },
          business_zip: {
            type: 'string',
            description: 'The zip code of the business.'
          },
          business_phone: {
            type: 'string',
            description: 'The phone number of the business.'
          },
          mail_address: {
            type: 'string',
            description: 'The mailing address.'
          },
          mail_city: {
            type: 'string',
            description: 'The mailing city.'
          },
          mail_state: {
            type: 'string',
            description: 'The mailing state.'
          },
          mail_zip: {
            type: 'string',
            description: 'The mailing zip code.'
          }
        },
        required: ['partnerID', 'first_name', 'last_name', 'email', 'business_name', 'business_ein', 'business_address', 'business_city', 'business_state', 'business_zip', 'business_phone', 'mail_address', 'mail_city', 'mail_state', 'mail_zip']
      }
    }
  }
};

export { apiTool };