/**
 * Function to create a worker summary report.
 *
 * @param {Object} args - Arguments for the report creation.
 * @param {string} args.companyID - The ID of the company for which the report is generated.
 * @param {string} [args.worker_type="employee"] - The type of worker to include in the report.
 * @param {string} [args.media_type="csv"] - The format of the report (e.g., csv).
 * @param {boolean} [args.active_workers=true] - Whether to include only active workers in the report.
 * @returns {Promise<Object>} - The result of the report creation.
 */
const executeFunction = async ({ companyID, worker_type = 'employee', media_type = 'csv', active_workers = true }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_API_KEY;

  try {
    const url = `${apiUrl}/reports/worker-summary`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const body = JSON.stringify({
      companyID,
      worker_type,
      media_type,
      active_workers
    });

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating worker summary report:', error);
    return {
      error: `An error occurred while creating the worker summary report: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a worker summary report.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_worker_summary_report',
      description: 'Create a worker summary report.',
      parameters: {
        type: 'object',
        properties: {
          companyID: {
            type: 'string',
            description: 'The ID of the company for which the report is generated.'
          },
          worker_type: {
            type: 'string',
            description: 'The type of worker to include in the report.'
          },
          media_type: {
            type: 'string',
            description: 'The format of the report (e.g., csv).'
          },
          active_workers: {
            type: 'boolean',
            description: 'Whether to include only active workers in the report.'
          }
        },
        required: ['companyID']
      }
    }
  }
};

export { apiTool };