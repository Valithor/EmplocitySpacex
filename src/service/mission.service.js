import { gql } from '@apollo/client';

export const MissionQuery = gql`         
query mission($missionId: ID!) {
          mission(id: $missionId) {
            name
            twitter
            website
            wikipedia
            description
            manufacturers
          }
        }
      `;
export const MissionsQuery2 = gql`{
    missions {
        name
        id
      }
      }`;

export const MissionsQuery = gql`
query missions($offset: Int!, $limit: Int!) {
    missions(offset: $offset, limit: $limit){
        name
        id
        }
      }`;

