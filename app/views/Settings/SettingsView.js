import React, { Component } from 'react';
import {
	View, Switch, Platform, ActionSheetIOS, ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import codePush from 'react-native-code-push';
import { ListItem, Text } from '../../components/base';
import { Container } from '../../components';
import { SETTINGS_NOTIFICATION } from '../routes';
import * as theme from '../../components/base/theme';

class SettingsView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pkg: null
		};
	}


	_logout() {
		this.props.logout();
	}

	_login() {
		this.props.showLogin(true);
	}

	componentDidMount() {
		codePush.getUpdateMetadata().then(pkg => {
			this.setState({ pkg: pkg });
		});
		if (this.props.leagues.data.length === 0) {
			this.props.getRankings();
		}
	}

	componentWillUnmount() {
		console.tron.log('SETTINGS VIEW WILL UNMOUNT');
        if (this.props.settings.changed) {
            console.tron.log('save group settings');
            this.props.saveNotifications();
        }
    }

	_toggleNotification(key, value) {
		console.tron.log(key + ' => ' + value);
		this.props.setNotification(key, value);
	}

	_renderCheckbox(text, value, key, disabled) {
			return (
				<ListItem 
					disabled={disabled}		
					onPress={Platform.OS === 'android' ? () => {
						this._toggleNotification(key, !value);
					} : null} >
					<Text>{ text }</Text>
					<View style={{flex: 1}} />
					<Switch value={value} disabled={disabled} onValueChange={(newValue) => this._toggleNotification(key, newValue)} />
				</ListItem>);
	}

	_toggleGroups() {
		if (this.props.navigator) {
			console.tron.log('open group view');
			this.props.navigator.push({
				state: SETTINGS_NOTIFICATION,
				title: 'Gruppen wählen'
			});
		}
	}

	_renderSectionNotification() {
		const notification = this.props.settings.notification;
		const disabled = !notification.on || !this.props.settings.fcm_token;
		return (
		<ListItem.Group>
			<ListItem.Header title='Benachrichtigungen' />	
			{ this._renderCheckbox('Benachrichtigungen', notification.on, 'on', !this.props.settings.fcm_token) }
			{ this._renderCheckbox('Live-Zwischenergebnis', notification.live, 'live', disabled) }
			{ this._renderCheckbox('Endstand', notification.ended, 'ended', disabled) }
			<ListItem last
				disabled={disabled || this.props.leagues.data.length === 0}
				onPress={this._toggleGroups.bind(this)}>
				<Text>Gruppen wählen</Text>
				<View style={{flex:1}} />
				{ this.props.leagues.loading && (<ActivityIndicator color={theme.secondaryTextColor} />)}
				{ !this.props.leagues.loading && (<ListItem.Icon name='caret-forward' right />) }
			</ListItem>
		</ListItem.Group>);
	}

	render() {
		const team = this.props.settings.team;
		return (
			<Container {...this.props}>	
				<ListItem.Group>
					<ListItem.Header title='Benutzerdaten' />
				{ team && (
					<View>
						<ListItem icon>
							{ !!team.image && (<ListItem.Image url={team.image} />)}
							{ !team.image && (<ListItem.Icon name='shirt' color={this.props.settings.color} />)}
							<Text>{ team.name }</Text>
						</ListItem>
						{ !this.props.auth.api_key && (
							<ListItem icon onPress={this._login.bind(this)}>
								<ListItem.Icon name='key' color={this.props.settings.color} />
									<Text>Zugangsdaten eingeben</Text>
							</ListItem>
						)}
						<ListItem last onPress={this._logout.bind(this)}>
							<ListItem.Icon name='log-out' color={this.props.settings.color} />
							<Text>Abmelden</Text>
						</ListItem>
					</View>
				)}
				{ !team && (
					<ListItem last onPress={this._login.bind(this)}>
						<ListItem.Icon name='log-in' color={this.props.settings.color} />
						<Text>Team wählen</Text>
					</ListItem>
				)}
				</ListItem.Group>
				
				{ this._renderSectionNotification() }

				<ListItem.Group>				
					<ListItem.Header title='Informationen' />
					{ Platform.OS === 'ios' && (
						<ListItem icon onPress={() => { ActionSheetIOS.showShareActionSheetWithOptions({ message: this.props.settings.fcm_token || 'Kein Token' }, () => {},() => {})}}>
							<ListItem.Icon name={this.props.settings.fcm_token ? 'notifications' : 'notifications-off'} />
							<Text>FCM Token</Text>
						</ListItem>
					)}
					<ListItem last onPress={Platform.OS === 'android' ? this._checkForUpdate.bind(this) : null}>
						<ListItem.Icon name='information-circle' color={this.props.settings.color} />
						<Text>App-Version { !!this.state.pkg ? `${this.state.pkg.appVersion} (${this.state.pkg.label})`: '0.9' }</Text>
					</ListItem>
					
				</ListItem.Group>
			</Container>
		);
	}
	_checkForUpdate() {
		console.tron.log('check for update');
		codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE });
	}
}

SettingsView.propTypes = {
	showLogin: React.PropTypes.func,
	logout: React.PropTypes.func,
	setNotification: React.PropTypes.func,
	saveNotifications: React.PropTypes.func,
	user: React.PropTypes.object,
	settings: React.PropTypes.object,
	leagues: React.PropTypes.object,
	navigator: React.PropTypes.object
};

export default connect((state) => ({
	settings: state.settings,
	dialog: state.dialog,
	leagues: state.leagues
}))(SettingsView);
