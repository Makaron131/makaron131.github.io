import { gql } from "graphql-request";
import { request } from "../utils/request";
import { REPOSITORY_NAME, REPOSITORY_OWNER } from "../utils/constants";
import { IGetRepositoryResponse } from "../types";

export async function getIssues(limit: number = 9, startCursor: string = "") {
  const query = gql`
    query {
      repository(name: "${REPOSITORY_NAME}", owner: "${REPOSITORY_OWNER}") {
        id
        name
        nameWithOwner
        issues(first: ${limit}, after: "${startCursor}") {
          nodes {
            ...IssueItem
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    }

    fragment IssueItem on Issue {
      id
      title
      body
      labels(first: 10) {
        nodes {
          ...LabelItem
        }
        totalCount
      }
    }

    fragment LabelItem on Label {
      id
      name
      color
    }
  `;

  return request<IGetRepositoryResponse>(query);
}
