import * as MatchActions from './matchActions';
import * as LoginActions from './login';
import * as SettingsActions from './settingsActions';
import * as TeamActions from './teamActions';
import * as DialogActions from './dialogActions';
import * as LeagueActions from './leagueActions';
import * as AuthActions from './authActions';
import * as FCMActions from './fcmActions';
import * as PlayerActions from './playersActions';

const actions = Object.assign(
  {},
  MatchActions,
  LoginActions,
  SettingsActions,
  TeamActions,
  DialogActions,
  LeagueActions,
  AuthActions,
  FCMActions,
  PlayerActions
);

export default actions;
