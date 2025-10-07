/**
 * Function to update the accrual policy in Zeal MCP.
 *
 * @param {Object} args - Arguments for updating the accrual policy.
 * @param {string} args.companyID - The ID of the company.
 * @param {string} [args.policy_code="001"] - The policy code.
 * @param {string} [args.policy_type="pto"] - The type of the policy.
 * @param {string} [args.policy_name="Updated name"] - The name of the policy.
 * @param {string} [args.policy_effective_date="2023-03-01"] - The effective date of the policy.
 * @param {number} [args.accrual_rate_hours=10] - The accrual rate in hours.
 * @param {number} [args.accrual_period_hours=40] - The accrual period in hours.
 * @param {number} [args.immediate_balance=50] - The immediate balance.
 * @param {boolean} [args.include_doubletime=true] - Whether to include double time.
 * @param {boolean} [args.include_overtime=true] - Whether to include overtime.
 * @param {number} [args.accrual_waiting_period=0] - The accrual waiting period.
 * @param {number} [args.accrual_cap=50] - The accrual cap.
 * @param {number} [args.rollover_cap=90] - The rollover cap.
 * @param {string} [args.rollover_date="01-01"] - The rollover date.
 * @param {string} [args.policy_status="live"] - The status of the policy.
 * @returns {Promise<Object>} - The result of the policy update.
 */
const executeFunction = async ({
  companyID,
  policy_code = "001",
  policy_type = "pto",
  policy_name = "Updated name",
  policy_effective_date = "2023-03-01",
  accrual_rate_hours = 10,
  accrual_period_hours = 40,
  immediate_balance = 50,
  include_doubletime = true,
  include_overtime = true,
  accrual_waiting_period = 0,
  accrual_cap = 50,
  rollover_cap = 90,
  rollover_date = "01-01",
  policy_status = "live"
}) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;

  const body = {
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
    rollover_date,
    policy_status
  };

  try {
    const response = await fetch(`${apiUrl}/accrualPolicy`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating accrual policy:', error);
    return {
      error: `An error occurred while updating the accrual policy: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating the accrual policy in Zeal MCP.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_accrual_policy',
      description: 'Update the accrual policy in Zeal MCP.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company.'
          },
          policy_code: {
            type: 'string',
            description: 'The policy code.'
          },
          policy_type: {
            type: 'string',
            description: 'The type of the policy.'
          },
          policy_name: {
            type: 'string',
            description: 'The name of the policy.'
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
            description: 'The immediate balance.'
          },
          include_doubletime: {
            type: 'boolean',
            description: 'Whether to include double time.'
          },
          include_overtime: {
            type: 'boolean',
            description: 'Whether to include overtime.'
          },
          accrual_waiting_period: {
            type: 'integer',
            description: 'The accrual waiting period.'
          },
          accrual_cap: {
            type: 'integer',
            description: 'The accrual cap.'
          },
          rollover_cap: {
            type: 'integer',
            description: 'The rollover cap.'
          },
          rollover_date: {
            type: 'string',
            description: 'The rollover date.'
          },
          policy_status: {
            type: 'string',
            description: 'The status of the policy.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };