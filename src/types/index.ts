export interface IGetRepositoryResponse {
  repository: IRepository;
}

export interface IRepository {
  id: string;
  name: string;
  nameWithOwner: string;
  issues: IIssues;
}

export interface IEdge<N> {
  cursor: string;
  node: N;
}

export interface IConnection<N> {
  nodes: N[];
  edges?: IEdge<unknown>[];
  pageInfo: IPageInfo;
  totalCount: number;
}

export type IIssues = IConnection<IIssueNode>;

export interface IIssueNode {
  id: string;
  title: string;
  body: string;
  labels: ILabels;
}

export type ILabels = IConnection<ILabelNode>;

export interface ILabelNode {
  id: string;
  name: string;
  color: string;
}

export interface IPageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
