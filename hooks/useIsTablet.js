import useWindowSize from './useWindowSize';

const DEFAULT_BREAKPOINT_MIN = 800;
const DEFAULT_BREAKPOINT_MAX = 1100;

const useIsMobile = (min, max) => {
  const windowSize = useWindowSize('width');

  return (
    windowSize > (min || DEFAULT_BREAKPOINT_MIN) && windowSize < (max || DEFAULT_BREAKPOINT_MAX)
  );
};

export default useIsMobile;
