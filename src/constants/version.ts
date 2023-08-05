export const packageVersion: string = process.env.npm_package_version ?? '0';
export const packageMajorVersion: string = (() => {
  const splitPackageVersion = packageVersion.split('.');
  return splitPackageVersion.length > 0 ? splitPackageVersion[0] : '0';
})();
