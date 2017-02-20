import React, { Component } from 'react';
import { Navigator, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as View from './views';
import * as Route from './views/routes';
import { Row, Text, Icon } from './components';
import Touchable from './components/Touchable';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.resetTo.bind(this);
    }


    render() {
        return (
            <Navigator
                style={{flexDirection: 'column-reverse'}}
                ref={(navigator) => { this.navigator = navigator }}
                initialRoute={this.props.initialRoute}
                renderScene={this.renderScene.bind(this)}
                navigationBar={
                    <Navigator.NavigationBar routeMapper={{
                        LeftButton: this.renderLeftButton.bind(this),
                        RightButton: () => {},
                        Title: this.renderTitle.bind(this)
                    }}
                    style={{ position: 'relative', backgroundColor: this.props.color }} />
                }
            />
        );
    }


    resetTo(route) {        
        this.navigator.resetTo(route);
    }


    push(route) {
        this.navigator.push(route);
    }


    pop() {
        this.navigator.pop();
    }


    renderLeftButton(route, navigator, index, navState) {
        if (index > 0) {
            return (
                <Touchable style={{padding: 16}} onPress={this.pop.bind(this)}>
                    <Icon size={24} color='#fff' name='arrow-back' />
                </Touchable>
            );
        } else if (this.props.drawer) {
            return (
                <Touchable style={{padding: 16}} onPress={() => { 
                    this.props.drawer.openDrawer();
                }}>
                    <Icon size={24} color='#fff' name='menu' />
                </Touchable>
            );
        }
    }

    renderTitle(route, navigator, index, navState) {
        return (
            <Row style={{paddingVertical: 16}}>
                <Text color='#fff' bold size={18}>{route.title}</Text>
            </Row>
        );
    }

    renderScene(route, navigator) {
         if (!route.title) {
            route.title = titles[route.state];
        }
        switch (route.state) {
            case Route.OVERVIEW:
                return (<View.Overview {...this.props} navigator={this} id={route.id} vid={route.vid} />);
            case Route.LIVE_MATCH:
                return (<View.LiveMatch {...this.props} navigator={this} id={route.id} vid={route.vid} />);
            case Route.MY_TEAM:
                return (<View.MyTeam {...this.props} navigator={this} />);
            case Route.LEAGUES:
                return (<View.Leagues { ...this.props} navigator={this} />)
            case Route.MATCH:
                return (<View.Match {...this.props} navigator={this} id={route.id} vid={route.vid} />);
            case Route.RANKING:
                return (<View.Table {...this.props} navigator={this} leagueID={route.leagueID} />);
            case Route.TEAM:
                return (<View.Team {...this.props} navigator={this} team={route.team} />);
            case Route.PREVIEW:
                return (<View.PreviewMatch { ...this.props} navigator={this} home={route.home} away={route.away} />);
            case Route.SETTINGS:
                return (<View.Settings.SettingsView {...this.props} navigator={this} />);
            case Route.SETTINGS_NOTIFICATION:
                return (<View.Settings.SettingsNotificationView { ...this.props } navigator={this} />);
        }
    }

}


const titles = {};
titles[Route.OVERVIEW] = 'Übersicht';
titles[Route.LIVE_MATCH] = 'Begegnung';
titles[Route.MY_TEAM] = 'Mein Team';
titles[Route.MATCH] = 'Spiel eintragen';
titles[Route.LEAGUES] = 'Gruppen';
titles[Route.SETTINGS] = 'Einstellungen';
titles[Route.SETTINGS_NOTIFICATION] = 'Gruppen wählen';

Navigation.propTypes = {
    initialRoute: React.PropTypes.object
}


export default connect(state => ({
    color: state.settings.color
}))(Navigation);