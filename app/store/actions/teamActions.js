import {
  GET_TEAM,
  QUERY_MY_TEAM_MATCHES,
  QUERY_TEAM_MATCHES,
  SHOW_LOGIN
} from './types';
import store from '../index';
import api, { TEAMS, MATCHES } from '../../api';

// queryTeamMatches und getTeamMatches zu einer function machen?
export function queryTeamMatches(): Action {
  const team: Team = store.getState().settings.team;
  if (!!team && !!team.id) {
    return {
      payload: api.get(TEAMS, { id: team.id, route: MATCHES }),
      type: QUERY_MY_TEAM_MATCHES
    };
  } else {
    return {
      payload: true,
      type: SHOW_LOGIN
    };
  }
}

export function getTeam(id: number): Action {
  return {
    payload: api.get(TEAMS, { id }),
    type: GET_TEAM
  };
}

export function getTeamMatches(id: number): Action {
  return {
    payload: api.get(TEAMS, { id, route: MATCHES }),
    type: QUERY_TEAM_MATCHES
  };
}
