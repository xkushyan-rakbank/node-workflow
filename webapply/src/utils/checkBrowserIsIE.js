export const checkBrowserIsIE = () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");

  return msie > 0 || !!ua.match(/Trident.*rv:11\./);
};
