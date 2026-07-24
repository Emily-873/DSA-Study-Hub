module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.dependencies && pkg.dependencies['js-yaml']) {
        // console.log("Hooking dependencies for", pkg.name);
        pkg.dependencies['js-yaml'] = '^4.3.0';
      }
      if (pkg.devDependencies && pkg.devDependencies['js-yaml']) {
        pkg.devDependencies['js-yaml'] = '^4.3.0';
      }
      return pkg;
    }
  }
};
