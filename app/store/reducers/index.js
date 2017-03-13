import { combineReducers } from 'redux';

import settings from './settingsReducer';
import auth from './authReducer';
import leagues from './leaguesReducer';
import initApp from './appReducer';
import match from './matchReducer';
import dialog from './dialogReducer';
import teamMatches from './teamMatchesReducer';
import matches from './matchesReducer';
import teams from './teamReducer';
import league from './leagueReducer';
import loading from './loadingReducer';

export default combineReducers({
	initApp,
	settings,
	matches,
	auth,
	teamMatches,
	leagues,
	league,
	match,
	dialog,
	teams,
	loading
});
