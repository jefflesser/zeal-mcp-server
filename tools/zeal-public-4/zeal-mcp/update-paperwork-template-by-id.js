/**
 * Function to update a paperwork template by its ID.
 *
 * @param {Object} args - Arguments for updating the paperwork template.
 * @param {string} args.templateID - (Required) Unique identifier for the template to be updated.
 * @param {string} [args.form_name] - Updated name of the paperwork form.
 * @param {string} [args.description] - Updated description of the paperwork form.
 * @param {string} [args.paperwork_type='W4'] - Type of paperwork.
 * @param {string} [args.worker_type='Employee'] - Type of worker.
 * @param {string} [args.jurisdictions_filter='{"type":"all","jurisdictions":["string","string"]}'] - Filter for jurisdictions.
 * @param {string} [args.jurisdiction_type='WorkLocation'] - Type of jurisdiction.
 * @param {string} [args.effective_date] - Updated effective date for the template.
 * @param {string} [args.archive_date] - Updated archive date for the template.
 * @param {string} [args.status='Live'] - Status of the template.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ templateID, form_name, description, paperwork_type = 'W4', worker_type = 'Employee', jurisdictions_filter = '{"type":"all","jurisdictions":["string","string"]}', jurisdiction_type = 'WorkLocation', effective_date, archive_date, status = 'Live' }) => {
  const apiUrl = 'https://api.zeal.com';
  const token = process.env.ZEAL_PUBLIC_API_API_KEY;
  try {
    // Construct the URL with the template ID
    const url = `${apiUrl}/paperwork/templates/${templateID}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the form data
    const formData = new URLSearchParams();
    if (form_name) formData.append('form_name', form_name);
    if (description) formData.append('description', description);
    formData.append('paperwork_type', paperwork_type);
    formData.append('worker_type', worker_type);
    formData.append('jurisdictions_filter', jurisdictions_filter);
    formData.append('jurisdiction_type', jurisdiction_type);
    if (effective_date) formData.append('effective_date', effective_date);
    if (archive_date) formData.append('archive_date', archive_date);
    formData.append('status', status);

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: formData
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
    console.error('Error updating paperwork template:', error);
    return {
      error: `An error occurred while updating the paperwork template: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a paperwork template by ID.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_paperwork_template',
      description: 'Update a paperwork template by its ID.',
      parameters: {
        type: 'object',
        properties: {
          templateID: {
            type: 'string',
            description: '(Required) Unique identifier for the template to be updated.'
          },
          form_name: {
            type: 'string',
            description: 'Updated name of the paperwork form.'
          },
          description: {
            type: 'string',
            description: 'Updated description of the paperwork form.'
          },
          paperwork_type: {
            type: 'string',
            description: 'Type of paperwork.'
          },
          worker_type: {
            type: 'string',
            description: 'Type of worker.'
          },
          jurisdictions_filter: {
            type: 'string',
            description: 'Filter for jurisdictions.'
          },
          jurisdiction_type: {
            type: 'string',
            description: 'Type of jurisdiction.'
          },
          effective_date: {
            type: 'string',
            description: 'Updated effective date for the template.'
          },
          archive_date: {
            type: 'string',
            description: 'Updated archive date for the template.'
          },
          status: {
            type: 'string',
            description: 'Status of the template.'
          }
        },
        required: ['templateID']
      }
    }
  }
};

export { apiTool };