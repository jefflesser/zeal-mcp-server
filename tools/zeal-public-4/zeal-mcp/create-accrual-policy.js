/**
 * Function to create an accrual policy in Zeal MCP.
 *
 * @param {Object} args - Arguments for creating the accrual policy.
 * @param {string} args.companyID - The ID of the company for which the policy is being created.
 * @param {string} [args.policy_code="001"] - The code for the accrual policy.
 * @param {string} [args.policy_type="pto"] - The type of the accrual policy.
 * @param {string} [args.policy_name="test name"] - The name of the accrual policy.
 * @param {string} [args.policy_effective_date="2023-03-01"] - The effective date of the policy.
 * @param {number} [args.accrual_rate_hours=10] - The accrual rate in hours.
 * @param {number} [args.accrual_period_hours=40] - The accrual period in hours.
 * @param {number} [args.immediate_balance=0] - The immediate balance for the policy.
 * @param {boolean} [args.include_doubletime=true] - Whether to include double time in the policy.
 * @param {boolean} [args.include_overtime=true] - Whether to include overtime in the policy.
 * @param {number} [args.accrual_waiting_period=0] - The waiting period for accrual.
 * @param {number} [args.accrual_cap=40] - The cap for accrual.
 * @param {number} [args.rollover_cap=40] - The rollover cap for the policy.
 * @param {string} [args.rollover_date="01-01"] - The rollover date for the policy.
 * @returns {Promise<Object>} - The result of the accrual policy creation.
 */
const executeFunction = async ({
  companyID,
  policy_code = "001",
  policy_type = "pto",
  policy_name = "test name",
  policy_effective_date = "2023-03-01",
  accrual_rate_hours = 10,
  accrual_period_hours = 40,
  immediate_balance = 0,
  include_doubletime = true,
  include_overtime = true,
  accrual_waiting_period = 0,
  accrual_cap = 40,
  rollover_cap = 40,
  rollover_date = "01-01"
}) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  const body = JSON.stringify({
    companyID,
    policy_code,
    policy_type,
    policy_name,
    policy_effective_date,
    accrual_rate_hours,
    accrual_period_hours,
    immediate_balance,
    include_doubletime,
    include_overtime,
    accrual_waiting_period,
    accrual_cap,
    rollover_cap,
    rollover_date
  });

  try {
    const response = await fetch(`${apiUrl}/accrualPolicy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating accrual policy:', error);
    return {
      error: `An error occurred while creating the accrual policy: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating an accrual policy in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_accrual_policy',
      description: 'Create an accrual policy in Zeal MCP.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the policy is being created.'
          },
          policy_code: {
            type: 'string',
            description: 'The code for the accrual policy.'
          },
          policy_type: {
            type: 'string',
            description: 'The type of the accrual policy.'
          },
          policy_name: {
            type: 'string',
            description: 'The name of the accrual policy.'
          },
          policy_effective_date: {
            type: 'string',
            description: 'The effective date of the policy.'
          },
          accrual_rate_hours: {
            type: 'integer',
            description: 'The accrual rate in hours.'
          },
          accrual_period_hours: {
            type: 'integer',
            description: 'The accrual period in hours.'
          },
          immediate_balance: {
            type: 'integer',
            description: 'The immediate balance for the policy.'
          },
          include_doubletime: {
            type: 'boolean',
            description: 'Whether to include double time in the policy.'
          },
          include_overtime: {
            type: 'boolean',
            description: 'Whether to include overtime in the policy.'
          },
          accrual_waiting_period: {
            type: 'integer',
            description: 'The waiting period for accrual.'
          },
          accrual_cap: {
            type: 'integer',
            description: 'The cap for accrual.'
          },
          rollover_cap: {
            type: 'integer',
            description: 'The rollover cap for the policy.'
          },
          rollover_date: {
            type: 'string',
            description: 'The rollover date for the policy.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };