const XS = {
  MediaQuery: "@media (min-width: 0)",
  Size: {
    Min: 0,
    Max: 575
  },
  ContainerMaxWidth: "100%"
};

const SM = {
  MediaQuery: "@media (min-width: 576px)",
  Size: {
    Min: 576,
    Max: 767
  },
  ContainerMaxWidth: "540px"
};

const MD = {
  MediaQuery: "@media (min-width: 768px)",
  Size: {
    Min: 768,
    Max: 991
  },
  ContainerMaxWidth: "720px"
};

const LG = {
  MediaQuery: "@media (min-width: 992px)",
  Size: {
    Min: 992,
    Max: 1199
  },
  ContainerMaxWidth: "960px"
};

const XL = {
  MediaQuery: "@media (min-width: 1200px)",
  Size: {
    Min: 1200,
    Max: 1439
  },
  ContainerMaxWidth: "1140px"
};

const MaxWidth = {
  XS: `(max-width: ${XS.Size.Max}px)`,
  SM: `(max-width: ${SM.Size.Max}px)`,
  MD: `(max-width: ${MD.Size.Max}px)`,
  LG: `(max-width: ${LG.Size.Max}px)`
};

const MinWidth = {
  XS: `(min-width: ${XS.Size.Max}px)`,
  SM: `(min-width: ${SM.Size.Max}px)`,
  MD: `(min-width: ${MD.Size.Max}px)`,
  LG: `(min-width: ${LG.Size.Max}px)`
};

const BreakpointMaxWidth = {
  XS: `@media only screen and ${MaxWidth.XS}`,
  SM: `@media only screen and ${MaxWidth.SM}`,
  MD: `@media only screen and ${MaxWidth.MD}`,
  LG: `@media only screen and ${MaxWidth.LG}`
};

const BreakpointExactWidth = {
  XS: `@media only screen and (max-width: ${XS.Size.Max}px)`,
  SM: `@media only screen and (min-width: ${SM.Size.Min}px) and (max-width: ${SM.Size.Max}px)`,
  MD: `@media only screen and (min-width: ${MD.Size.Min}px) and (max-width: ${MD.Size.Max}px)`,
  LG: `@media only screen and (min-width: ${LG.Size.Min}px) and (max-width: ${LG.Size.Max}px)`,
  XL: `@media only screen and (min-width: ${XL.Size.Min}px)`
};

export const MediaQuery = {
  MaxWidth,
  MinWidth,
  BreakpointMaxWidth,
  BreakpointExactWidth
};
