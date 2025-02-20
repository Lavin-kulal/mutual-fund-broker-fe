export interface AuthCommonTypes {}
export interface AuthComponentTypes extends AuthCommonTypes {
  renderRoutes: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<any>
  > | null;
}
export interface AuthContainerTypes extends AuthCommonTypes {}
