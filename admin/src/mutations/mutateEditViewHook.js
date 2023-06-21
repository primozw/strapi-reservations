import pluginId from './../pluginId';
/**
 * Checks if the field in the layout's row has the plugin field enabled, if so replace the given field with the field type of the plugin
 * @param {array} layouts - The layouts in the current content-type
 * @returns {array} - The updated layouts
 */
 const mutateLayouts = (layouts) => {
  return layouts.map((row) => {
    // console.log(row)
    const mutatedRow = row.reduce((acc, field) => {
      const hasEnabledPluginField = field.fieldSchema.pluginOptions && field.fieldSchema.pluginOptions[pluginId] && field.fieldSchema.pluginOptions[pluginId].enabled

      if (!hasEnabledPluginField) {
        return [...acc, field];
      }
      return [...acc, {
        ...field,
        fieldSchema: {
          ...field.fieldSchema,
          type: pluginId
        }
      }]
    }, []);
    return mutatedRow;
  });
};
/**
 * Behaviours triggered by the 'Admin/CM/pages/EditView/mutate-edit-view-layout' hook.
 */
const mutateEditViewHook = ({layout, query}) => {
  const mutateEditLayout = mutateLayouts(layout.contentType.layouts.edit);
  const modifiedLayouts = {
    ...layout.contentType.layouts,
    edit: mutateEditLayout,
  };
  return {
    layout: {
      ...layout,
      contentType: {
        ...layout.contentType,
        layouts: modifiedLayouts,
      }
    },
    query,
  };
};
export default mutateEditViewHook;