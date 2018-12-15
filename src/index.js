const style = ({
  alias,
  and,
  not,
  hasDefaultMember,
  hasNamedMembers,
  hasNamespaceMember,
  hasNoMember,
  isNodeModule,
  isInstalledModule,
  hasOnlyDefaultMember,
  hasOnlyNamedMembers,
  hasOnlyNamespaceMember,
  dotSegmentCount,
  isAbsoluteModule,
  isRelativeModule,
  moduleName,
  name,
  naturally,
  unicode
}, file) => {
  const isTypeImport = imported => imported.type === 'import-type';

  const sortModuleNames = [
    (a, b) => 0 - dotSegmentCount(a, b),
    moduleName(naturally)
  ];

  const sortModules = moduleType => [
    // import * as bar from 'bar'
    {
      match: and(hasOnlyNamespaceMember, moduleType),
      sort: sortModuleNames
    },

    // import bar, * as baz from 'bar'
    {
      match: and(hasDefaultMember, hasNamespaceMember, moduleType),
      sort: sortModuleNames
    },

    // import bar from 'bar'
    {
      match: and(hasOnlyDefaultMember, moduleType),
      sort: sortModuleNames
    },

    // import bar, { baz } from 'bar'
    {
      match: and(hasDefaultMember, hasNamedMembers, moduleType),
      sort: sortModuleNames,
      sortNamedMembers: name(naturally)
    },

    // import { bar } from 'bar'
    {
      match: and(not(isTypeImport), hasOnlyNamedMembers, moduleType),
      sort: sortModuleNames,
      sortNamedMembers: name(naturally)
    },

    // import type { Bar, Baz } from 'bar'
    {
      match: and(isTypeImport, hasOnlyNamedMembers, moduleType),
      sort: sortModuleNames,
      sortNamedMembers: name(naturally)
    }
  ];

  const isResolved = imported =>
    imported.moduleName.startsWith('actions/')
    || imported.moduleName.startsWith('constants/')
    || imported.moduleName.startsWith('creators/')
    || imported.moduleName.startsWith('middleware/')
    || imported.moduleName.startsWith('reducers/')
    || imported.moduleName.startsWith('utilities/');

  const isResolvedComponent = imported => imported.moduleName.startsWith('components/');

  const isCssModule = imported => imported.moduleName.startsWith('./styles.module');

  return [
    {
      match: isNodeModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },

    { separator: true },

    {
      match: isInstalledModule(file),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },

    { separator: true },

    {
      match: isResolved,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },

    { separator: true },

    ...sortModules(and(isAbsoluteModule, not(isResolved), not(isResolvedComponent))),

    { separator: true },

    ...sortModules(and(isRelativeModule, not(isCssModule))),

    { separator: true },

    {
      match: isResolvedComponent,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },

    { separator: true },

    // import 'bar'
    {
      match: and(hasNoMember, isAbsoluteModule)
    },

    { separator: true },

    // import './bar'
    {
      match: and(hasNoMember, isRelativeModule)
    },

    { separator: true },

    // css modules
    {
      match: isCssModule,
    },

    { separator: true }
  ];
};

module.exports = style;
