const REQUEST_STATE_NAMES = new Set([
  'config_JSON',
  'metavechIP',
  'hafelSocks5Metavech',
  'hafelSocks5Klali',
  'cheshbonSocks5Sheli',
  'parsedSocks5Address',
  'hafelGibuiMetavech',
  'hafelMetavechIataGlobali',
  'hadpasatYomanNipui',
  'connClientIp',
  'connRejectReason',
  'connProxyWhitelist',
  '_globalEnv',
  '_globalCtx',
  'hagdarotReshet',
  'tetzurotNat64',
  'chiburMishtameshId',
  'sibatDchiyatChibur',
  'magbilMehirutMishtameshKBps',
  'reshimaLevanaSocks5',
  'misparChiyugTcpMakbili',
  'preloadChiyugMerotz',
]);

function isNonReferenceIdentifier(path) {
  const parent = path.parent && path.parent.node;
  if (!parent) return false;

  if (
    (parent.type === 'MemberExpression' ||
      parent.type === 'OptionalMemberExpression') &&
    path.name === 'property' &&
    !parent.computed
  ) {
    return true;
  }

  if (
    (parent.type === 'ObjectProperty' ||
      parent.type === 'Property' ||
      parent.type === 'ObjectMethod') &&
    path.name === 'key' &&
    !parent.computed
  ) {
    return true;
  }

  return (
    parent.type === 'LabeledStatement' ||
    parent.type === 'BreakStatement' ||
    parent.type === 'ContinueStatement' ||
    parent.type === 'ImportSpecifier' ||
    parent.type === 'ImportDefaultSpecifier' ||
    parent.type === 'ImportNamespaceSpecifier' ||
    parent.type === 'ExportSpecifier' ||
    parent.type === 'FunctionDeclaration' && path.name === 'id' ||
    parent.type === 'FunctionExpression' && path.name === 'id' ||
    parent.type === 'ClassDeclaration' && path.name === 'id' ||
    parent.type === 'ClassExpression' && path.name === 'id'
  );
}

module.exports = function transform(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.VariableDeclaration)
    .filter((path) => path.parent && path.parent.node.type === 'Program')
    .forEach((path) => {
      path.node.declarations = path.node.declarations.filter((declaration) => {
        return !(
          declaration.id &&
          declaration.id.type === 'Identifier' &&
          REQUEST_STATE_NAMES.has(declaration.id.name)
        );
      });
      if (path.node.declarations.length === 0) {
        j(path).remove();
      }
    });

  root
    .find(j.Identifier)
    .filter((path) => {
      return (
        REQUEST_STATE_NAMES.has(path.node.name) &&
        !isNonReferenceIdentifier(path)
      );
    })
    .replaceWith((path) => {
      const parent = path.parent && path.parent.node;
      if (
        parent &&
        (parent.type === 'ObjectProperty' || parent.type === 'Property') &&
        path.name === 'value' &&
        parent.shorthand
      ) {
        parent.shorthand = false;
      }
      return j.memberExpression(
        j.callExpression(j.identifier('novaState'), []),
        j.identifier(path.node.name)
      );
    });

  return root.toSource({ quote: 'single', reuseWhitespace: true });
};
