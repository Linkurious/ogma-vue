import {
  useEdgeFilter,
  useEdgeGrouping,
  useNodeFilter,
  useNodeGrouping,
  useVirtualProperties,
  useGeoClustering,
  useNeighborGeneration,
  useNeighborMerging,
  useNodeCollapsing,
} from '../hooks';

export const EdgeFilter = useEdgeFilter();
export const EdgeGrouping = useEdgeGrouping();
export const NodeFilter = useNodeFilter();
export const NodeGrouping = useNodeGrouping();
export const VirtualProperties = useVirtualProperties();
export const GeoClustering = useGeoClustering();
export const NeighborGeneration = useNeighborGeneration();
export const NeighborMerging = useNeighborMerging();
export const NodeCollapsing = useNodeCollapsing();

