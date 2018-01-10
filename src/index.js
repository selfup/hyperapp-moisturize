export default app => (initialState, initialActions, initialView, rootNode) => {
  const current = { view: initialView };
  const newView = (state, actions) => current.view(state, actions);

  const exposedActions = app(
      initialState,

      Object.assign(initialActions, {

        moisturizedActionCall: ({ action, data }) => (state) => {
          const dryAction = action(data);

          if (typeof dryAction === 'function') {
            return dryAction(state, exposedActions);
          }

          return dryAction;
        },

        updateApp: ({
          newState = {},
          newActions = {},
          newView = current.view,
        }) => {
          const newActionRefs = {};

          Object.keys(newActions).forEach((name) => {
            newActionRefs[name] = data => exposedActions.moisturizedActionCall({
              action: newActions[name],
              data,
            });

            newActionRefs[name].moisturizedOriginalName = name;
          });

          Object.assign(exposedActions, newActionRefs);
          Object.assign(current, { view: newView });

          return newState;
        },

      }),

      newView,
      rootNode,
    );

  return exposedActions;
};
