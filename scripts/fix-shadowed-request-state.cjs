const FUNCTION_STATE_MAP = {
  tikunChamClashMinuy: {
    config_JSON: 'configJSON',
    hagdarotReshet: 'networkSettings',
  },
  tikunChamSingboxMinuy: {
    config_JSON: 'configJSON',
    hagdarotReshet: 'networkSettings',
  },
  tikunChamSurgeMinuy: {
    config_JSON: 'configJSON',
  },
  rishumYomanBakasha: {
    config_JSON: 'configJSON',
  },
};

module.exports = function transform(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.find(j.FunctionDeclaration).forEach((functionPath) => {
    const name = functionPath.node.id && functionPath.node.id.name;
    const replacements = FUNCTION_STATE_MAP[name];
    if (!replacements) return;

    j(functionPath)
      .find(j.MemberExpression)
      .filter((path) => {
        const object = path.node.object;
        const property = path.node.property;
        return (
          !path.node.computed &&
          object &&
          object.type === 'CallExpression' &&
          object.callee &&
          object.callee.type === 'Identifier' &&
          object.callee.name === 'novaState' &&
          property &&
          property.type === 'Identifier' &&
          replacements[property.name]
        );
      })
      .replaceWith((path) => j.identifier(replacements[path.node.property.name]));
  });

  return root.toSource({ quote: 'single', reuseWhitespace: true });
};
