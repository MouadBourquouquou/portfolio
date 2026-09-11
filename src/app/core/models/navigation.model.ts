export interface NavLink {
  label: string;
  route: string;
  /** Matches the route exactly (used for links that are not index routes). */
  exact?: boolean;
}
