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

export const MissionsQuery = gql`{
    missions {
        name
        id
      }
      }`;

