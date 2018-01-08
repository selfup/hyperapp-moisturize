export default app => (initialState, initialActions, initialView, rootNode) => {
  const current = { view: initialView };
  const newView = (state, actions) => current.view(state, actions);

  const exposedActions = app(
      initialState,

      Object.assign(initialActions, {

        moisturizedActionCall: ({ action, data }) => (state) => {
          const result = action(data);

          return typeof result === 'function'
            ? result(state, exposedActions)
            : result;
        },

        updateApp: ({ state = {}, actions = {}, view = current.view }) => {
          const newActionRefs = {};

          Object.keys(actions).forEach((name) => {
            newActionRefs[name] = data => exposedActions.moisturizedActionCall({
              action: actions[name],
              data,
            });

            newActionRefs[name].moisturizedOriginalName = name;
          });

          Object.assign(exposedActions, newActionRefs);
          Object.assign(current, { view });

          return state;
        },
      }),

      newView,
      rootNode,
    );

  return exposedActions;
};
