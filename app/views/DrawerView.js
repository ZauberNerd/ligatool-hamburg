import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import actions from '../store/actions';
import { Image, ListItem, Text } from '../components/base';
import * as theme from '../components/base/theme';
import { NavigationActions } from 'react-navigation';
import {
  LEAGUE,
  LEAGUES,
  LEAGUE_CUP,
  OVERVIEW,
  MY_TEAM,
  SETTINGS
} from './routes';

class NavigationView extends Component {

  componentWillMount() {
    if (this.props.leagues.length === 0) {
      this.props.getRankings();
    }
  }

  _handleRowPress(state) {
    const { navigate, closeDrawer } = this.props;
    if (!state.active) {
      if (state.state === LEAGUE) {
        navigate({
          routeName: LEAGUE,
          params: {
            id: state.leagueID,
            title: state.title
          }
        });
      } else if (state.state === LEAGUE_CUP) {
        navigate({
          routeName: LEAGUE_CUP,
          params: {
            id: state.leagueID,
            title: state.title,
            cup: true // why?
          }
        });
      } else {
        navigate({ routeName: state.state });
      }
    } else {
      closeDrawer();
    }
  }

  _renderItem(state, text, icon, idx) {
    const { navigation } = this.props;
    const color = this.props.settings.color;
    const active = state === this.props.activeItem;

    return (
      <ListItem
        active={active}
        onPress={() => {
          this._handleRowPress({ state: state, title: text, active });
        }}
        last
      >
        <ListItem.Icon
          color={theme.secondaryTextColor}
          name={icon}
        />
        <Text bold>{text}</Text>
      </ListItem>
    );
  }

  renderLeagues() {
    // const { navigation } = this.props;

    return this.props.leagues.map((league, idx) => {
      const active = league.cup
        ? `${LEAGUE_CUP}_${league.id}` === this.props.activeItem
        : `${LEAGUE}_${league.id}` === this.props.activeItem;
      return (
        <ListItem
          key={league.id}
          active={active}
          last
          onPress={() => {
            this._handleRowPress({
              leagueID: league.id,
              state: league.cup ? LEAGUE_CUP : LEAGUE,
              title: league.name,
              active
            });
          }}
        >
          <Text bold>
            {league.name}
          </Text>
        </ListItem>
      );
    });
  }

  render() {
    const width = DRAWER_WIDTH;
    const height = Math.floor(width * 0.625);
    const team = this.props.settings.team || null;
    const leagues = this.props.leagues;
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.imageContainer, { height, width }]}>
          <Image
            style={{ height, resizeMode: 'cover', width }}
            source={{ uri: team ? 'turm_bw' : 'turm' }}
          />
          {team &&
            <View style={[styles.teamContainer, { top: height - 66, width }]}>
              {team.image && <Image url={team.image} style={styles.teamLogo} />}
              <Text color="#fff" size={24} style={styles.teamName}>
                {team.name}
              </Text>
            </View>}
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.space} />
          {this._renderItem(OVERVIEW, 'Übersicht', 'football', 0)}
          {this._renderItem(
            MY_TEAM,
            team ? 'Mein Team' : 'Team wählen',
            team ? 'shirt' : 'log-in',
            1
          )}
          {this.renderSeparator()}
          {leagues.length > 0 && this.renderLeagues()}
          {this.renderSeparator()}
          {this._renderItem(SETTINGS, 'Einstellungen', 'settings', 2)}
          <View style={styles.space} />
        </ScrollView>
      </View>
    );
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden'
  },
  separator: {
    backgroundColor: '#eee',
    flex: 1,
    height: 1,
    marginVertical: 4
  },
  space: {
    flex: 1,
    height: 5
  },
  teamContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    position: 'absolute'
  },
  teamLogo: {
    height: 60,
    marginLeft: 8,
    width: 60
  },
  teamName: {
    flex: 1,
    marginLeft: 16
  }
});

export const DRAWER_WIDTH = Dimensions.get('window').width * .8;

export default connect(
  state => ({
    activeItem: state.drawer,
    loading: state.loading.nonBlocking,
    leagues: Object.values(state.leagues).sort((a, b) => a.name < b.name ? -1 : 1),
    settings: state.settings
  }),
  dispatch => ({
    getRankings: () => dispatch(actions.getRankings()),
    navigate: route => dispatch(NavigationActions.navigate(route)),
    closeDrawer: () =>
      dispatch(NavigationActions.navigate({ routeName: 'DrawerClose' }))
  })
)(NavigationView);
