module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.dependencies && pkg.dependencies['js-yaml']) {
        pkg.dependencies['js-yaml'] = '^4.1.2';
      }
      if (pkg.devDependencies && pkg.devDependencies['js-yaml']) {
        pkg.devDependencies['js-yaml'] = '^4.1.2';
      }
      return pkg;
    }
  }
};
