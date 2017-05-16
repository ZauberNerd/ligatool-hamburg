import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class MatchStatsBar extends Component {

  render() {
    const height = this.props.small ? 12 : 20;
    const wins = [style.wins, {
      flex: (this.props.stats.wins / this.props.stats.matches),
      height
    }];
    const draws = [style.draws, {
      flex: (this.props.stats.draws / this.props.stats.matches),
      height
    }];
    const lost = [style.lost, {
      flex: (this.props.stats.lost / this.props.stats.matches),
      height
    }];
    return (
      <View style={style.barContainer}>
        <View style={wins}>
          { this.props.stats.wins > 0 && (
            <Text style={style.text}>{`${this.props.stats.wins}`}</Text>
          )}
        </View>
        <View style={draws}>
          { this.props.stats.draws > 0 && (
            <Text style={style.text}>{`${this.props.stats.draws}`}</Text>
          )}
        </View>
        <View style={lost}>
          { this.props.stats.lost > 0 && (
            <Text style={style.text}>{`${this.props.stats.lost}`}</Text>
          )}
        </View>
      </View>
    )
  }
}
const barHeight = 21;

const style = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    flex: 1
  },
  text: {
    color: '#fff',
    fontSize: 10
  },
  wins: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(136, 168, 37, .8)'
  },
  draws: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(237, 140, 42, .8)'
  },
  lost: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(207, 74, 48, .8)'
  }
});

export default MatchStatsBar;