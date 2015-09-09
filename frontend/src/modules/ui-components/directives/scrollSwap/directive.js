export default () => {
  return {
    restrict: 'A',
    link: ($scope, element, attributes) => {
      const el = element[0];
      element.on('wheel', event => {
        el.scrollLeft += event.deltaY;
        if (el.scrollLeft > 0 && (el.scrollLeft + el.clientWidth) < el.scrollWidth) event.preventDefault();
      });
    }
  };
};