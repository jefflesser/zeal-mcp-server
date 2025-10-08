/**
 * Function to create a customer account in Zeal MCP.
 *
 * @param {Object} args - Arguments for creating a customer account.
 * @param {string} args.first_name - The first name of the business owner.
 * @param {string} args.last_name - The last name of the business owner.
 * @param {string} args.ssn - The social security number of the business owner.
 * @param {string} args.dob - The date of birth of the business owner.
 * @param {string} args.email - The email address of the business owner.
 * @param {string} args.title - The title of the business owner.
 * @param {number} args.ownership_percentage - The ownership percentage of the business owner.
 * @param {string} args.owner_type - The type of owner (e.g., authorized_signer).
 * @param {string} args.address - The address of the business owner.
 * @param {string} args.city - The city of the business owner.
 * @param {string} args.state - The state of the business owner.
 * @param {string} args.zip - The zip code of the business owner.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} args.code - The customer code.
 * @param {string} args.business_name - The name of the business.
 * @param {string} args.ein - The employer identification number.
 * @param {string} args.legal_structure - The legal structure of the business.
 * @param {string} args.phone - The phone number of the business.
 * @param {string} args.business_address - The business address.
 * @param {string} args.business_city - The business city.
 * @param {string} args.business_state - The business state.
 * @param {string} args.business_zip - The business zip code.
 * @returns {Promise<Object>} - The result of the customer account creation.
 */
const executeFunction = async ({
  first_name,
  last_name,
  ssn,
  dob,
  email,
  title,
  ownership_percentage,
  owner_type,
  address,
  city,
  state,
  zip,
  companyID,
  code,
  business_name,
  ein,
  legal_structure,
  phone,
  business_address,
  business_city,
  business_state,
  business_zip
}) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  const body = {
    business_owner: {
      first_name,
      last_name,
      ssn,
      dob,
      email,
      title,
      ownership_percentage,
      owner_type,
      address,
      city,
      state,
      zip
    },
    companyID,
    code,
    business_name,
    ein,
    legal_structure,
    phone,
    business_address,
    business_city,
    business_state,
    business_zip
  };

  try {
    // Perform the fetch request
    const response = await fetch(`${apiUrl}/customer-accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
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
    console.error('Error creating customer account:', error);
    return {
      error: `An error occurred while creating the customer account: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a customer account in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_customer_account',
      description: 'Create a customer account in Zeal MCP.',
      parameters: {
        type: 'object',
        properties: {
          first_name: {
            type: 'string',
            description: 'The first name of the business owner.'
          },
          last_name: {
            type: 'string',
            description: 'The last name of the business owner.'
          },
          ssn: {
            type: 'string',
            description: 'The social security number of the business owner.'
          },
          dob: {
            type: 'string',
            description: 'The date of birth of the business owner.'
          },
          email: {
            type: 'string',
            description: 'The email address of the business owner.'
          },
          title: {
            type: 'string',
            description: 'The title of the business owner.'
          },
          ownership_percentage: {
            type: 'number',
            description: 'The ownership percentage of the business owner.'
          },
          owner_type: {
            type: 'string',
            description: 'The type of owner (e.g., authorized_signer).'
          },
          address: {
            type: 'string',
            description: 'The address of the business owner.'
          },
          city: {
            type: 'string',
            description: 'The city of the business owner.'
          },
          state: {
            type: 'string',
            description: 'The state of the business owner.'
          },
          zip: {
            type: 'string',
            description: 'The zip code of the business owner.'
          },
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          code: {
            type: 'string',
            description: 'The customer code.'
          },
          business_name: {
            type: 'string',
            description: 'The name of the business.'
          },
          ein: {
            type: 'string',
            description: 'The employer identification number.'
          },
          legal_structure: {
            type: 'string',
            description: 'The legal structure of the business.'
          },
          phone: {
            type: 'string',
            description: 'The phone number of the business.'
          },
          business_address: {
            type: 'string',
            description: 'The business address.'
          },
          business_city: {
            type: 'string',
            description: 'The business city.'
          },
          business_state: {
            type: 'string',
            description: 'The business state.'
          },
          business_zip: {
            type: 'string',
            description: 'The business zip code.'
          }
        },
        required: ['first_name', 'last_name', 'ssn', 'dob', 'email', 'companyID', 'code', 'business_name']
      }
    }
  }
};

export { apiTool };