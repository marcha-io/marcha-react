import type {
  EntryPoint,
  EntryPointComponent,
  JSResourceReference,
  PreloadProps,
} from 'react-relay';

// eslint-disable-next-line @typescript-eslint/ban-types
export function createEntryPoint<Root, EntryPointParams extends {} = {}>(
  // The param types can only be inferred if the shape of the entrypoint (i.e. root and getPreloadProps) is specified
  // within the function definition itself. Using EntryPoint, EntryPointComponent, or a custom EntryPointRepresentation
  // in place of this will cause Root to be inferred as an 'unknown' type.
  params: Root extends JSResourceReference<
    EntryPointComponent<
      infer PreloadedQueries,
      infer PreloadedEntryPoints,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      infer RuntimeProps,
      infer ExtraProps
    >
  >
    ? {
        root: Root;
        getPreloadProps: (
          entryPointParams: EntryPointParams
        ) => PreloadProps<
          EntryPointParams,
          PreloadedQueries,
          PreloadedEntryPoints,
          ExtraProps
        >;
      }
    : never
): Root extends JSResourceReference<
  EntryPointComponent<
    infer PreloadedQueries,
    infer PreloadedEntryPoints,
    infer RuntimeProps,
    infer ExtraProps
  >
>
  ? // An EntryPoint type must be returned here instead of typeof params, so that it can be inferred correctly throughout
    // other @types/react-relay usages when using entrypoints
    EntryPoint<
      EntryPointComponent<
        PreloadedQueries,
        PreloadedEntryPoints,
        RuntimeProps,
        ExtraProps
      >,
      EntryPointParams
    >
  : never {
  return params;
}
