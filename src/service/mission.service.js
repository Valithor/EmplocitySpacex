import { gql } from '@apollo/client';

export const LaunchQuery = gql`         
query launch($launchId: ID!) {
          launch(id: $launchId) {
            details
            links {
              article_link
              presskit
              reddit_launch
              wikipedia
            }
            mission_name
            launch_success
            launch_date_local
          }
        }
      `;

export const LaunchesQuery = gql`
query launches($offset: Int!, $limit: Int!) {
    launches(offset: $offset, limit: $limit){
        mission_name
        id
        links {
          mission_patch_small
        }
        }
      }`;

