import {
  useConnectNodes, useLasso,
  useLegend, useRectangleSelect,
  useResize, useRewire, useSnapping
} from '../hooks';

export const Snapping = useSnapping();
export const ConnectNodes = useConnectNodes();
export const Lasso = useLasso();
export const Legend = useLegend();
export const RectangleSelect = useRectangleSelect();
export const Rewire = useRewire();
export const ReSize = useResize();